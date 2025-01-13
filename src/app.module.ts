import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [
    {
      provide:'APP_GUARD',
      useClass:JwtAuthGuard
    },
    {
      provide:'APP_GUARD',
      useClass:RolesGuard
    }
  ],
})
export class AppModule {}
