import { Module } from '@nestjs/common';
import { MongoService } from 'src/modules/mongo/mongo.service';
import { UserMapper } from './mapper/user.mapper';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
  imports: [],
  controllers: [RegisterController],
  providers: [RegisterService, UserMapper, MongoService],
})
export class RegisterModule {}
