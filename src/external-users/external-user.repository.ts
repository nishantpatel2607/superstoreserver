import { Repository, EntityRepository } from 'typeorm';
import { Externalusers } from './external-user.entity';
import { CreateExternalUserDTO } from './dto/create-external-user.dto';

@EntityRepository(Externalusers)
export class ExternalUserRepository extends Repository<Externalusers> {
  public async createExternalUser(
    createExternalUserDTO: CreateExternalUserDTO
  ): Promise<Externalusers> {
    const {
      firstName,
      lastName,
      street1,
      street2,
      suburb,
      state,
      postcode,
      email,
      password,
    } = createExternalUserDTO;
    const externalUser = new Externalusers();
    externalUser.email = email;
    externalUser.firstName = firstName;
    externalUser.lastName = lastName;
    externalUser.street1 = street1;
    externalUser.street2 = street2;
    externalUser.suburb = suburb;
    externalUser.state = state;
    externalUser.postcode = postcode;
    externalUser.password = password;

    await externalUser.save();
    return externalUser;
  }

  public async editExternalUser(
    createExternalUserDTO: CreateExternalUserDTO,
    editedExternalUser:Externalusers
  ): Promise<Externalusers> {
    const {
      firstName,
      lastName,
      street1,
      street2,
      suburb,
      state,
      postcode,
      email,
      password,
    } = createExternalUserDTO;
    editedExternalUser.email = email;
    editedExternalUser.firstName = firstName;
    editedExternalUser.lastName = lastName;
    editedExternalUser.street1 = street1;
    editedExternalUser.street2 = street2;
    editedExternalUser.suburb = suburb;
    editedExternalUser.state = state;
    editedExternalUser.postcode = postcode;
    editedExternalUser.password = password;

    await editedExternalUser.save();
    return editedExternalUser;
  }
}
