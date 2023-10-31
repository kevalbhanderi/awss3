import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { UserDto } from 'src/dto/user.dto';
import { UserDetailsDto } from '../admin/dto/user.details.dto';
import { RegisterDto } from '../auth/register/dto/register.dto';
import { AdminObject } from './interface/admin.interface';
import { UserObject } from './interface/user.inteface';
import { AdminModel } from './schema/admin.schema';
import { UsersModel } from './schema/user.schema';

@Injectable()
export class MongoService {
  constructor() {
    const mongoOptions = {
      // auth: {
      //   username: process.env.MONGO_USER,
      //   password: process.env.MONGO_PASS,
      // },
      dbName: process.env.MONGO_DB,
      authSource: process.env.MONGO_AUTH_DB,
      useNewUrlParser: true,
    };

    mongoose
      .connect(
        `mongodb://${process.env.MONGO_URL}/?retryWrites=false`,
        mongoOptions,
      )
      .then(() => {
        console.log('Connected successfully');
      })
      .catch((err) => {
        console.log('Err in connecting mongodb', err);
      });
  }

  /**
   * To get the User Details
   * @param email
   * @returns
   */
  async getUser(email: string) {
    const user = (await UsersModel.findOne({
      email: `${email}`,
    })) as UserObject;
    return user;
  }

  /**
   * Create new user and save data
   * @param userInfo
   */
  async addUserDetails(userInfo: UserObject) {
    await new UsersModel(userInfo).save();
    return userInfo;
  }

  async addAdminDetails(adminInfo: AdminObject) {
    await new AdminModel(adminInfo).save();
    return adminInfo;
  }

  /**
   * Get all users details
   * @returns
   */
  async getAllUsers() {
    const allUsers = (await UsersModel.find().exec()) as UserObject[];
    return allUsers;
  }

  /**
   * Save updated user details
   * @param email
   */
  async updateUser(userDetailsDto: UserDetailsDto, email: string) {
    const updateUser = (await UsersModel.updateOne(
      {
        email: `${email}`,
      },
      {
        $set: {
          email: userDetailsDto.email,
          username: userDetailsDto.userName,
        },
      },
    )) as unknown as UserObject;
    return updateUser;
  }

  /**
   * To Delete user details
   * @param email
   */
  async deleteUser(email: string) {
    return await UsersModel.deleteOne({ email: email });
  }

  /**
   * Fetch name of all collections
   * @returns
   */
  async getColl() {
    const coll = await mongoose.connection.db.listCollections().toArray();
    return coll;
  }
}
