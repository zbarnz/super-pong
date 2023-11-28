import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private entityManager: EntityManager) {}

  async findAll(): Promise<User[]> {
    return await this.entityManager.find(User);
  }

  async findOne(id: number): Promise<User | null> {
    return await this.entityManager.findOne(User, { where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.entityManager.delete(User, id);
  }

  async save(user: User): Promise<User> {
    return await this.entityManager.save(User, user);
  }
}
