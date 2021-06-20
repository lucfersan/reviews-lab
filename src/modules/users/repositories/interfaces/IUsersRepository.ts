import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';
import { User } from '@prisma/client';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: CreateUserDTO): Promise<User>;
}
