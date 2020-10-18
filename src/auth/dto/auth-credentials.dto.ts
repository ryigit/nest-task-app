import { IsString, MaxLength, MinLength } from "class-validator"

export class AuthCredentialsDto {
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    username: string

    @IsString()
    @MinLength(3, { message: 'Password Too Short'} )
    @MaxLength(30)
    password: string
}