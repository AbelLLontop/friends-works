import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { Role } from './role.enum';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) { }

    @Public()
    @Post('login')
    async login(@Body() authLoginDto:AuthLoginDto) {
        return this.authService.login(authLoginDto);
    }
    
    @Public()
    @Post('register')
    async register(@Body() authRegisterDto:AuthRegisterDto){
        return this.authService.register(authRegisterDto);
    }

    @Post('Profile')
    async profile(@Request() req){
        return req.user
    }

    @Roles(Role.USER)
    @Post('private-admin')
    async profileAdmin(@Request() req){
        return {
            user:req.user,
            message:'private resource for admin'
        }
    }

}
