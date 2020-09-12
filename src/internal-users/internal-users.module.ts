import { Module } from '@nestjs/common';
import { InternalUsersService } from './internal-users.service';
import { InternalUsersController } from './internal-users.controller';
import { InternalUserRepository } from './internal-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([InternalUserRepository])],
  providers: [InternalUsersService],
  exports:[InternalUsersService],
  controllers: [InternalUsersController],
})
export class InternalUsersModule {}
