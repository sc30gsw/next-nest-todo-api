import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateTaskDto {
  @IsNotEmpty()
  userId: string

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsOptional()
  description?: string
}
