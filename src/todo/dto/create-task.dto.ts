import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateTaskDto {
  @IsNotEmpty()
  userId: string

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsOptional()
  description?: string
}
