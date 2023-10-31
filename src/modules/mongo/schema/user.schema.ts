import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export class Users {
  @Prop()
  user_id: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  username: string;
}

export const UsersSchema = new mongoose.Schema({
  user_id: { type: 'string' },
  email: { type: 'string' },
  password: { type: 'string' },
  username: { type: 'string' },
});

export const UsersModel = mongoose.model('users', UsersSchema);
