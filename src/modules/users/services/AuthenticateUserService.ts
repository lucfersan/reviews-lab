import { jwtConfig } from '@config/auth';
import { User } from '@prisma/client';
import { HttpException } from '@shared/errors/HttpException';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository';

type Request = {
  email: string;
  password: string;
};

type Response = {
  user: User;
  token: string;
};

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new HttpException('User does not exist.', 404);
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException('Incorrect Password.', 401);
    }

    const { secret, expiresIn } = jwtConfig;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
