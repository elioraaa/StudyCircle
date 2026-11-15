import { IsString, IsNotEmpty, IsOptional, IsInt, Min, Max, IsIn } from 'class-validator';

export class CreateGroupDto {
  @IsString() @IsNotEmpty()
  courseCode: string;

  @IsString() @IsNotEmpty()
  topic: string;

  @IsString() @IsOptional()
  description?: string;

  @IsInt() @Min(2) @Max(20) @IsOptional()
  maxSize?: number;

  @IsIn(['online', 'in-person']) @IsOptional()
  mode?: string;
}