import { Repository, EntityRepository } from 'typeorm';
import { Internalusers } from './internal-user.entity';
import { CreateInternalUserDTO } from './dto/create-internal-user.dto';

@EntityRepository(Internalusers)
export class InternalUserRepository extends Repository<Internalusers> {
  public async createInternalUser(
    createInternalUserDTO: CreateInternalUserDTO,
  ): Promise<Internalusers> {
    const { username, firstname, lastname, password } = createInternalUserDTO;
    const internalUser = new Internalusers();
    internalUser.username = username;
    internalUser.firstname = firstname;
    internalUser.lastname = lastname;
    internalUser.password = password;

    await internalUser.save();
    return internalUser;
  }

  public async editInternalUser(
    createInternalUserDTO: CreateInternalUserDTO,
    editedInternalUser: Internalusers,
  ): Promise<Internalusers> {
    const { username, firstname, lastname, password } = createInternalUserDTO;
    editedInternalUser.username = username;
    editedInternalUser.firstname = firstname;
    editedInternalUser.lastname = lastname;
    editedInternalUser.password = password;

    await editedInternalUser.save();
    return editedInternalUser;
  }
}
