import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Internalusers } from './internal-user.entity';
import { CreateInternalUserDTO } from './dto/create-internal-user.dto';
import { InternalUserRepository } from './internal-user.repository';
import { globalconstants } from '../constants';
import { Not } from 'typeorm';
const bcrypt = require('bcrypt');

@Injectable()
export class InternalUsersService {
  constructor(
    @InjectRepository(InternalUserRepository)
    private externalUserRepository: InternalUserRepository,
  ) {}

  public async createInternalUser(
    createInternalUserDTO: CreateInternalUserDTO,
  ): Promise<Internalusers> {
    const foundUser = await this.externalUserRepository.findOne({
      where: { email: createInternalUserDTO.userid },
    });
    if (foundUser) {
      throw new ConflictException('user name already found');
    }

    createInternalUserDTO.password = bcrypt.hashSync(
      createInternalUserDTO.password,
      globalconstants.saltRounds,
      null,
    );
    return await this.externalUserRepository.createInternalUser(
      createInternalUserDTO,
    );
  }

  public async getInternalUsers(): Promise<Internalusers[]> {
    return await this.externalUserRepository.find();
  }

  public async getInternalUser(Id: number): Promise<Internalusers> {
    console.log(Id);
    const foundUser = await this.externalUserRepository.findOne({
      where: { id: Id },
    });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  public async findByUserId(userId: string): Promise<Internalusers> {
    const foundUser = await this.externalUserRepository.findOne({
      where: { userid: userId },
    });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  public async editInternalUser(
    Id: number,
    editInternalUserDTO: CreateInternalUserDTO,
  ): Promise<Internalusers> {
    const editedInternalUser = await this.externalUserRepository.findOne(Id);
    if (!editedInternalUser) {
      throw new NotFoundException('User not found');
    }

    const foundUser = await this.externalUserRepository.findOne({
      where: [{ userid: editInternalUserDTO.userid, id: Not(Id) }],
    });
    if (foundUser) {
      throw new ConflictException('user name already found');
    }

    return this.externalUserRepository.editInternalUser(
      editInternalUserDTO,
      editedInternalUser,
    );
  }

  public async deleteInternalUser(Id: number): Promise<void> {
    await this.externalUserRepository.delete(Id);
  }
}
