import { Module } from '@nestjs/common';
import { MongoService } from '../mongo/mongo.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, MongoService],
})
export class AdminModule {}
