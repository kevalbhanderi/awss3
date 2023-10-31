import { Controller } from '@nestjs/common';
import { MongoService } from './mongo.service';
import * as uuid from 'uuid';

@Controller('mongo')
export class MongoController {
  constructor(private readonly mongoService: MongoService) {
    // mongoService.addAdminDetails({
    //   admin_id: uuid.v4(),
    //   email: 'admin@gmail.com',
    //   password: 'Admin@123',
    // });
  }
}
