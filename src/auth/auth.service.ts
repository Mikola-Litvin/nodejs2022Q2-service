import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login({
    login,
    password,
  }: CreateUserDto): Promise<{ [key: string]: string }> {
    const user = await this.userService.getUserByLogin(login);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new ForbiddenException();
    }

    return { jwt: 'token' };
  }

  async signUpUser(
    userData: CreateUserDto,
  ): Promise<{ [key: string]: string }> {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(userData.password, saltRounds);

    const signedUpUser = await this.userService.createUser({
      ...userData,
      password: hash,
    });

    if (signedUpUser?.login !== userData.login) {
      return {
        message: 'User has not been signed up',
      };
    }

    return {
      message: 'User has been signed up',
    };
  }
}
