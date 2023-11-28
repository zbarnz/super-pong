import { Controller, Post } from '@nestjs/common/decorators';
import { UsersService } from './user.service';

import { User } from './user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async addUser(user: User): Promise<User> {
    return await this.userService.save(user);
  }
}
