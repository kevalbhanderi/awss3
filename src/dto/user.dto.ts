import { ApiProperty } from '@nestjs/swagger';
import { UserObject } from '../modules/mongo/interface/user.inteface';

export class UserDto {
  @ApiProperty()
  readonly userId: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly userName: string;


  constructor(user: UserObject) {
    this.userId = user.user_id;
    this.email = user.email;
    this.userName = user.username;
  }
}
