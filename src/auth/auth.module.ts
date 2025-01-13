import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [UsersModule, PassportModule,JwtModule.register({
    secret:jwtConstants.secret,
    signOptions:{expiresIn:'1h'}
  })],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  exports:[JwtStrategy]
})
export class AuthModule { }