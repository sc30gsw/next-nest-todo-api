import { Body, Controller, Inject, Patch } from '@nestjs/common'
import type { User } from '@prisma/client'

import type { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Patch('update')
  async updateUser(
    @Body() dto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.userService.updateUser(dto)
  }
}
