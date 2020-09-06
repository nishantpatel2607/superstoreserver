import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExternalUsersService } from './external-users.service';
import { CreateExternalUserDTO } from './dto/create-external-user.dto';
import { Externalusers } from './external-user.entity';

@Controller('externaluser')
export class ExternaluserController {
  constructor(private externalUsersService: ExternalUsersService) {}

  @Post('create')
  public async createExternalUser(
    @Body() createExternalUserDTO: CreateExternalUserDTO,
  ): Promise<Externalusers> {
    const user = await this.externalUsersService.createExternalUser(
      createExternalUserDTO,
    );
    return user;
  }

  @Get('all')
  public async getExternalUsers(): Promise<Externalusers[]> {
    const users = await this.externalUsersService.getExternalUsers();
    return users;
  }

  @Get('/:userId')
  public async getExternalUser(@Param('userId') userId: number) {
    const user = await this.externalUsersService.getExternalUser(userId);
    return user;
  }

  @Patch('/edit/:userId')
  public async editExternalUser(
    @Body() createExternalUserDTO: CreateExternalUserDTO,
    @Param('userId') userId: number,
  ): Promise<Externalusers> {
    const user = await this.externalUsersService.editExternalUser(
      userId,
      createExternalUserDTO,
    );
    return user;
  }

  @Delete('/delete/:userId')
  public async deleteExternalUser(@Param('userId') userId: number) {
    const deletedUser = await this.externalUsersService.deleteExternalUser(
      userId,
    );
    return deletedUser;
  }
}
