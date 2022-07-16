import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  // @HttpCode(200)
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  // @HttpCode(200)
  getUser(@Param('id') id) {
    return this.userService.getUser(id);
  }

  @Post()
  // @HttpCode(201)
  createUser(@Body() user) {
    return this.userService.createUser(user);
  }

  @Put(':id')
  // @HttpCode(200)
  updateUser(@Param('id') id, @Body() user) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id) {
    return this.userService.deleteUser(id);
  }
}
