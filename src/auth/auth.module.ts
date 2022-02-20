import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { JWT } from './jwt/const/jwt-const';
import { JwtStrategy } from './jwt/strategies/jwt-strategy';
import { AuthService } from './services/auth/auth.service';

@Module({
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    JwtStrategy
  ],
  imports: [
    UserModule,
    JwtModule.register({
      secret: JWT.key,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  exports: [
    JwtModule
  ]
})
export class AuthModule { }
