import { Repository, EntityRepository } from 'typeorm';
import { Internalusers } from './internal-user.entity';
import { CreateInternalUserDTO } from './dto/create-internal-user.dto';

@EntityRepository(Internalusers)
export class InternalUserRepository extends Repository<Internalusers> {
  public async createInternalUser(
    createInternalUserDTO: CreateInternalUserDTO,
  ): Promise<Internalusers> {
    const { userid, firstname, lastname, password } = createInternalUserDTO;
    const internalUser = new Internalusers();
    internalUser.userid = userid;
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
    const { userid, firstname, lastname, password } = createInternalUserDTO;
    editedInternalUser.userid = userid;
    editedInternalUser.firstname = firstname;
    editedInternalUser.lastname = lastname;
    editedInternalUser.password = password;

    await editedInternalUser.save();
    return editedInternalUser;
  }
}
