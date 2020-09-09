import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Externalusers } from './external-user.entity';
import { CreateExternalUserDTO } from './dto/create-external-user.dto';
import { ExternalUserRepository } from './external-user.repository';
import { globalconstants } from '../constants';
import { Not } from 'typeorm';
const bcrypt = require('bcrypt');

@Injectable()
export class ExternalUsersService {
  constructor(
    @InjectRepository(ExternalUserRepository)
    private externalUserRepository: ExternalUserRepository,
  ) {}

  public async createExternalUser(
    createExternalUserDTO: CreateExternalUserDTO,
  ): Promise<Externalusers> {
    const foundUser = await this.externalUserRepository.findOne({
      where: { email: createExternalUserDTO.email },
    });
    if (foundUser) {
      throw new ConflictException('email already found');
    }

    createExternalUserDTO.password = bcrypt.hashSync(
      createExternalUserDTO.password,
      globalconstants.saltRounds,
      null,
    );
    return await this.externalUserRepository.createExternalUser(
      createExternalUserDTO,
    );
  }

  public async getExternalUsers(): Promise<Externalusers[]> {
    return await this.externalUserRepository.find();
  }

  public async getExternalUser(userId: number): Promise<Externalusers> {
    console.log(userId);
    const foundUser = await this.externalUserRepository.findOne({
      where: { id: userId },
    });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  public async findByEmail(userEmail: string): Promise<Externalusers> {
    const foundUser = await this.externalUserRepository.findOne({
      where: { email: userEmail },
    });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  public async editExternalUser(
    userId: number,
    editExternalUserDTO: CreateExternalUserDTO,
  ): Promise<Externalusers> {console.log(userId);
    const editedExternalUser = await this.externalUserRepository.findOne(
      userId
    );
    if (!editedExternalUser) {
      throw new NotFoundException('User not found');
    }

    const foundUser = await this.externalUserRepository.findOne({
      where: [{ email: editExternalUserDTO.email ,id: Not(userId) }],
    });
    if (foundUser) {
      throw new ConflictException('email already found');
    }

    return this.externalUserRepository.editExternalUser(
      editExternalUserDTO,
      editedExternalUser,
    );
  }

  public async deleteExternalUser(userId: number): Promise<void> {
    await this.externalUserRepository.delete(userId);
  }
}
