import { IsString, MaxLength, IsEmail } from 'class-validator';

export class CreateExternalUserDTO {
         @IsString()
         @MaxLength(50)
         firstName: string;

         @IsString()
         @MaxLength(50)
         lastName: string;

         @IsString()
         @MaxLength(100)
         street1: string;

         @IsString()
         @MaxLength(100)
         street2: string;

         @IsString()
         @MaxLength(45)
         suburb: string;

         @IsString()
         @MaxLength(45)
         state: string;

         @IsString()
         @MaxLength(10)
         postcode: string;

         @IsEmail()
         email: string;

         @IsString()
         password: string;
       }