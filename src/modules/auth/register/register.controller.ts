import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/dispatcher/transform.interceptor';
import { SuccessResponse } from 'src/interface/success.response.interface.sto';
import { UserDto } from '../../../dto/user.dto';
import { RegisterDto } from './dto/register.dto';
import { RegisterService } from './register.service';

@Controller('register')
@ApiTags('Register')
@UseInterceptors(TransformInterceptor)
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @ApiOperation({ summary: 'User Registration' })
  @ApiOkResponse({ description: 'Success', type: UserDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<SuccessResponse<UserDto>> {
    const { data, message } = await this.registerService.register(registerDto);
    return { data, message };
  }
}
