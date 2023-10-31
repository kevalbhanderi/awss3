import { BadRequestException, Injectable } from '@nestjs/common';
import { ErrorMessages, SuccessMessages } from 'src/config/constants';
import { UserDto } from 'src/dto/user.dto';
import { UserObject } from 'src/modules/mongo/interface/user.inteface';
import { MongoService } from 'src/modules/mongo/mongo.service';
import { RegisterDto } from './dto/register.dto';
import { UserMapper } from './mapper/user.mapper';

@Injectable()
export class RegisterService {
  constructor(
    private readonly mongoService: MongoService,
    private readonly userMapper: UserMapper,
  ) {}

  /**
   * User registration
   * @param registerDto 
   * @returns 
   */
  async register(registerDto: RegisterDto) {
    const user = (await this.mongoService.getUser(
      registerDto.email,
    )) as UserObject;
    if (user) {
      throw new BadRequestException(ErrorMessages.EMAIL_ALREADY_REGISTERED);
    }

    const mappedUser = await this.userMapper.buildUser(registerDto);
    await this.mongoService.addUserDetails(mappedUser);
    return {
      data: new UserDto(mappedUser),
      message: SuccessMessages.USER_REGISTERED,
    };
  }
}
