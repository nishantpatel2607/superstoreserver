import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InternalUsersService } from './internal-users.service';
import { CreateInternalUserDTO } from './dto/create-internal-user.dto';
import { Internalusers } from './internal-user.entity';

@Controller('internaluser')
export class InternalUsersController {
  constructor(private internalUsersService: InternalUsersService) {}

  @Post('create')
  public async createInternalUser(
    @Body() createInternalUserDTO: CreateInternalUserDTO,
  ): Promise<Internalusers> {
    const user = await this.internalUsersService.createInternalUser(
      createInternalUserDTO,
    );
    return user;
  }

  @Get('all')
  public async getInternalUsers(): Promise<Internalusers[]> {
    const users = await this.internalUsersService.getInternalUsers();
    return users;
  }

  @Get('/:Id')
  public async getInternalUser(@Param('Id') Id: number) {
    const user = await this.internalUsersService.getInternalUser(Id);
    return user;
  }

  // @Get('/email/:useremail')
  // public async getInternalUserByEmail(@Param('useremail') userEmail: string) {
  //   const user = await this.internalUsersService.findByEmail(userEmail);
  //   return user;
  // }

  @Patch('/edit/:Id')
  public async editInternalUser(
    @Body() createInternalUserDTO: CreateInternalUserDTO,
    @Param('Id') Id: number,
  ): Promise<Internalusers> {
    const user = await this.internalUsersService.editInternalUser(
      Id,
      createInternalUserDTO,
    );
    return user;
  }

  @Delete('/delete/:Id')
  public async deleteInternalUser(@Param('Id') Id: number) {
    const deletedUser = await this.internalUsersService.deleteInternalUser(Id);
    return deletedUser;
  }
}
