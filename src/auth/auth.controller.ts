import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { Role } from './role.enum';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login-local')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    // @UseGuards(JwtAuthGuard)
    @Post('Profile')
    async profile(@Request() req){
        return req.user
    }

    @Roles(Role.ADMIN)
    @Post('private-admin')
    async profileAdmin(@Request() req){
        return {
            user:req.user,
            message:'private resource for admin'
        }
    }

}
