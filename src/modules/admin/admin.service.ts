import { BadRequestException, Injectable } from '@nestjs/common';
import { ErrorMessages } from 'src/config/constants';
import { UserDto } from 'src/dto/user.dto';
import { SuccessResponse } from 'src/interface/success.response.interface.sto';
import { UserObject } from '../mongo/interface/user.inteface';
import { MongoService } from '../mongo/mongo.service';
import { UserDetailsDto } from './dto/user.details.dto';

@Injectable()
export class AdminService {
  constructor(private readonly mongoService: MongoService) {}

  /**
   * To get User Details
   * @param email
   * @returns
   */
  async getUser(email: string) {
    const user = (await this.mongoService.getUser(email)) as UserObject;
    return new UserDto(user);
  }

  /**
   * List all the registerd users
   */
  async listUser() {
    const allUsers = await this.mongoService.getAllUsers();
    return allUsers.map((o) => new UserDto(o));
  }

  /**
   * Update user details
   * @param email
   */
  async editUser(userDetailsDto: UserDetailsDto, email: string) {
    const existingUserDetails = (await this.mongoService.getUser(
      email,
    )) as UserObject;
    if (!existingUserDetails) {
      throw new BadRequestException(ErrorMessages.USER_NOT_FOUND);
    }
    const updatedUser = await this.mongoService.updateUser(
      userDetailsDto,
      email,
    );
    return new UserDto(updatedUser);
  }

  /**
   * To delete user
   * @param email
   */
  async deleteUser(email: string) {
    const existingUserDetails = (await this.mongoService.getUser(
      email,
    )) as UserObject;
    if (!existingUserDetails) {
      throw new BadRequestException(ErrorMessages.USER_NOT_FOUND);
    }
    await this.mongoService.deleteUser(email);
  }

  /**
   * Get list of all collections
   * @returns
   */
  async getColl() {
    const collection = await this.mongoService.getColl();
    return collection;
  }
}
