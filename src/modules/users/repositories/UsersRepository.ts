import { prisma } from '@shared/infra/prisma/client';
import { User } from '@prisma/client';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { IUsersRepository } from './interfaces/IUsersRepository';

export class UsersRepository implements IUsersRepository {
  public async create(data: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({ data });
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }
}
