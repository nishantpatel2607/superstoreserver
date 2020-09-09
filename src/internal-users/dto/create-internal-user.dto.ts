import { IsString, MaxLength, IsEmail } from 'class-validator';

export class CreateInternalUserDTO {
  @IsString()
  @MaxLength(255)
  firstname: string;

  @IsString()
  @MaxLength(255)
  lastname: string;

  @IsString()
  @MaxLength(255)
  userid: string;

  @IsString()
  password: string;
}
