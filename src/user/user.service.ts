import { Inject, Injectable } from '@nestjs/common'
import type { User } from '@prisma/client'

import { PrismaService } from '../prisma/prisma.service'
import type { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async updateUser(dto: UpdateUserDto): Promise<Omit<User, 'hashedPassword'>> {
    const user = await this.prisma.user.update({
      where: {
        id: parseInt(dto.userId),
      },
      data: {
        name: dto.name,
      },
    })
    delete user.password
    return user
  }
}
