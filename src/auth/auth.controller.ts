import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Get(':id')
  // async getUser(@Param('id') id: string): Promise<User> {
  //   if (!uuidValidate(id))
  //     throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
  //   return await this.userService.getUser(id);
  // }

  @UsePipes(new ValidationPipe())
  @Post('/signup')
  async signUpUser(
    @Body() user: CreateUserDto,
  ): Promise<{ [key: string]: string }> {
    return await this.authService.signUpUser(user);
  }

  @UsePipes(new ValidationPipe())
  @Post('/login')
  async lonig(@Body() user: CreateUserDto): Promise<{ [key: string]: string }> {
    return await this.authService.login(user);
  }
}
