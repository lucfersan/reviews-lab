import { injectable, inject } from 'tsyringe';
import { User } from '@prisma/client';

import { HttpException } from '@shared/errors/HttpException';
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository';
import { hash } from 'bcryptjs';

type Request = {
  name: string;
  email: string;
  password: string;
};

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new HttpException('User already exists.', 401);
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: await hash(password, 8),
    });

    return user;
  }
}
