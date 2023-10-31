import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TransformInterceptor } from 'src/dispatcher/transform.interceptor';
import { UserDto } from 'src/dto/user.dto';
import { SuccessResponse } from 'src/interface/success.response.interface.sto';
import { AdminService } from './admin.service';
import { UserDetailsDto } from './dto/user.details.dto';

@Controller('user/')
@ApiTags('Admin')
@UseInterceptors(TransformInterceptor)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Get all user' })
  @ApiOkResponse({ description: 'Success' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('')
  async getAllUser(): Promise<SuccessResponse<UserDto[]>> {
    const data = await this.adminService.listUser();
    return { data: data };
  }

  @ApiOperation({ summary: 'Edit user details' })
  @ApiOkResponse({ description: 'Success' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Put('/:id')
  async editUser(
    @Param('id') email: string,
    @Body() userDetailsDto: UserDetailsDto,
  ): Promise<SuccessResponse<UserDto>> {
    const data = await this.adminService.editUser(userDetailsDto, email);
    return { data: data, message: 'User updated successfully' };
  }

  @ApiOperation({ summary: 'Delete user details' })
  @ApiOkResponse({ description: 'Success' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete('/:id')
  async deleteUser(@Param('id') email: string): Promise<SuccessResponse<{}>> {
    await this.adminService.deleteUser(email);
    return { data: '', message: 'User has been deleted successfully' };
  }

  @ApiOperation({ summary: 'List of all collections' })
  @ApiOkResponse({ description: 'Success' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('/collection')
  async getCollections(): Promise<SuccessResponse<{}>> {
    const data = await this.adminService.getColl();
    return { data: data, message: '' };
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ description: 'Success' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('/:id')
  async getUser(@Param('id') email: string): Promise<SuccessResponse<UserDto>> {
    const data = await this.adminService.getUser(email);
    return { data };
  }
}
