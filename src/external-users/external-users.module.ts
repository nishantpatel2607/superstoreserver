import { Module } from '@nestjs/common';
import { ExternalUsersService } from './external-users.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalUserRepository } from './external-user.repository';
import { ExternaluserController } from './externaluser.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ExternalUserRepository])],
  providers: [ExternalUsersService],
  controllers: [ExternaluserController],
})
export class ExternalUsersModule {}
