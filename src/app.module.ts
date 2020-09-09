import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ExternalUsersModule } from './external-users/external-users.module';
import { ExternaluserController } from './external-users/externaluser.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InternalUsersModule } from './internal-users/internal-users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'superstore',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    ExternalUsersModule,
    AuthModule,
    UsersModule,
    InternalUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
