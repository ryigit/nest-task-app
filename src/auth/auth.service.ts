import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private UserRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.UserRepository.signUp(authCredentialsDto)
    }


    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const username = await this.UserRepository.validateUserPassword(authCredentialsDto)

        if(!username) {
            throw new UnauthorizedException('Hata')
        }

        const payload: JwtPayload = { username }
        const accessToken = this.jwtService.sign(payload)

        return { accessToken }
    }
}
