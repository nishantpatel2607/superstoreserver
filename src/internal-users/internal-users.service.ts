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
    private internalUserRepository: InternalUserRepository,
  ) {}

  public async createInternalUser(
    createInternalUserDTO: CreateInternalUserDTO,
  ): Promise<Internalusers> {
    const foundUser = await this.internalUserRepository.findOne({
      where: { username: createInternalUserDTO.username },
    });
    if (foundUser) {
      throw new ConflictException('user name already found');
    }

    createInternalUserDTO.password = bcrypt.hashSync(
      createInternalUserDTO.password,
      globalconstants.saltRounds,
      null,
    );
    return await this.internalUserRepository.createInternalUser(
      createInternalUserDTO,
    );
  }

  public async getInternalUsers(): Promise<Internalusers[]> {
    return await this.internalUserRepository.find();
  }

  public async getInternalUser(Id: number): Promise<Internalusers> {
    
    const foundUser = await this.internalUserRepository.findOne({
      where: { id: Id },
    });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  public async findByUsername(username: string): Promise<Internalusers> {
    
    const foundUser = await this.internalUserRepository.findOne({
      where: { username: username },
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
    const editedInternalUser = await this.internalUserRepository.findOne(Id);
    if (!editedInternalUser) {
      throw new NotFoundException('User not found');
    }

    const foundUser = await this.internalUserRepository.findOne({
      where: [{ username: editInternalUserDTO.username, id: Not(Id) }],
    });
    if (foundUser) {
      throw new ConflictException('user name already found');
    }

     editInternalUserDTO.password = bcrypt.hashSync(
       editInternalUserDTO.password,
       globalconstants.saltRounds,
       null,
     );

    return this.internalUserRepository.editInternalUser(
      editInternalUserDTO,
      editedInternalUser,
    );
  }

  public async deleteInternalUser(Id: number): Promise<void> {
    await this.internalUserRepository.delete(Id);
  }
}
