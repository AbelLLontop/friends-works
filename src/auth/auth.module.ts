import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule, 
    PassportModule,
  JwtModule.registerAsync({
    useFactory: async (configService:ConfigService)=>({
      secret:configService.get('jwtConstants.secret'),
      signOptions:{expiresIn:configService.get('jwtConstants.expiresIn'),}
    }),
    inject:[ConfigService]
  })],
  providers: [AuthService,JwtStrategy],
  exports:[JwtStrategy]
})
export class AuthModule { }
