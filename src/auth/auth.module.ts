import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalExternalStrategy, LocalInternalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    UsersModule,
  ],
  providers: [AuthService, LocalExternalStrategy, LocalInternalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
