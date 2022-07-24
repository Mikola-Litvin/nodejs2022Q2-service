import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { User } from 'src/interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string): User {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    return this.userService.getUser(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createUser(@Body() user: CreateUserDto): User {
    return this.userService.createUser(user);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() passwords: UpdatePasswordDto,
  ): User {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    return this.userService.updateUser(id, passwords);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string): void {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    this.userService.deleteUser(id);
  }
}
