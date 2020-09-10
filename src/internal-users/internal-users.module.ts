import { Module } from '@nestjs/common';
import { InternalUsersService } from './internal-users.service';
import { InternalUsersController } from './internal-users.controller';

@Module({
  providers: [InternalUsersService],
  controllers: [InternalUsersController]
})
export class InternalUsersModule {}
