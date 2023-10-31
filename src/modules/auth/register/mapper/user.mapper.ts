import { RegisterDto } from '../dto/register.dto';
import * as uuid from 'uuid';
import { generateMD5Hash } from 'src/utils/password.helper';
import { UserObject } from 'src/modules/mongo/interface/user.inteface';

export class UserMapper {
  /**
   * Build user data required to register
   * @param payload
   */
  buildUser = async (payload: RegisterDto): Promise<UserObject> => {
    return {
      user_id: uuid.v4(),
      email: payload.email,
      password: payload.password ? await generateMD5Hash(payload.password) : '',
      username: payload.userName,
    };
  };
}
