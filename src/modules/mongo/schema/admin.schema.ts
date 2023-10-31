import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export class Admin {
  @Prop()
  admin_id: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const AdminSchema = new mongoose.Schema({
  admin_id: { type: 'string' },
  email: { type: 'string' },
  password: { type: 'string' },
});

export const AdminModel = mongoose.model('admin', AdminSchema);
