import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }


    async validateUser(authSignin: AuthSignInDto) {
        const OriginalUser = await this.userService.findOneByEmail(authSignin.email);
        const user = { ...OriginalUser }
        if (user && user.password == authSignin.password) {
            delete user.password;
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username,roles:user.roles||['user'], sub: user.id };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }




}
