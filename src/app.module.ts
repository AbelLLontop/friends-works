import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { ConfigModule } from '@nestjs/config';
import { configLoader } from './config/config-loader';
import { envSchema } from './config/env-schema';

enum NODE_ENV_ENUM {
  development = 'development',
  production = 'production',
  test = 'test'
}
const NODE_ENV = NODE_ENV_ENUM?.[process.env.NODE_ENV];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:`./.env${NODE_ENV ? '.' + NODE_ENV : ''}`,
      load:[configLoader],
      validationSchema:envSchema,
      isGlobal:true
    }),
    AuthModule
  ],
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
