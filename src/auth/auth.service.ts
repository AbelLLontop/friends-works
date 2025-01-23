import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDto } from './dto/auth-register.dto';
import * as bcryptjs from 'bcryptjs'
import { Role } from './role.enum';
@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async register(authRegisterDto: AuthRegisterDto) {
        const userExist = await this.userService.findOneByEmail(authRegisterDto.email);
        if (userExist) throw new NotFoundException('User already exists');

        const hashedPassword = await bcryptjs.hash(authRegisterDto.password, 10);
        const user = this.userService.saveUser({
            ...authRegisterDto,
            password: hashedPassword
        });
        
        return {
            access_token: await this.getAccesTokenJwt(user)
        }
    }

    async login(authLogin: AuthLoginDto) {
        const user = await this.userService.findOneByEmail(authLogin.email);
        if (!user) throw new UnauthorizedException('Invalid credentials');
        
        const isPasswordValid = await bcryptjs.compare(authLogin.password,user.password);
        if(!isPasswordValid) throw new UnauthorizedException('Invalid credentials')

        return {
            access_token: await this.getAccesTokenJwt(user)
        }
    }

    private async getAccesTokenJwt(user: any) {
        const payload = { username: user.username, roles: user.roles || [Role.USER], sub: user.id };
        return this.jwtService.sign(payload);
    }

}
