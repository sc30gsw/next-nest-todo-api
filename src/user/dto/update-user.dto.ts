import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
  @IsNotEmpty()
  userId: string

  @IsString()
  @IsOptional()
  name?: string
}
