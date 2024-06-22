import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(21)
  public cin: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(6)
  public pin: string;

  @IsString()
  @IsEmail()
  public email: string;
}
