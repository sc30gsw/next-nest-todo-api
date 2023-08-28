import { ForbiddenException, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { User } from '@prisma/client'
import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt'

import { PrismaService } from '../prisma/prisma.service'
import type { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
    @Inject(ConfigService) private readonly config: ConfigService,
  ) {}

  async signUp(dto: AuthDto): Promise<User> {
    try {
      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(dto.password, salt)
      const newUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
        },
      })

      return newUser
    } catch (err: any) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002')
          throw new ForbiddenException('This email is already token')
      }

      throw err.message
    }
  }

  async login(dto: AuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      })

      if (!user) throw new ForbiddenException('Email or password incorrect')

      const isValid = await bcrypt.compare(dto.password, user.password)

      if (!isValid) throw new ForbiddenException('Email or password incorrect')

      return user
    } catch (err: any) {
      return err.message
    }
  }
}
