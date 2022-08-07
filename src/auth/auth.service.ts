import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login({
    login,
    password,
  }: CreateUserDto): Promise<{ [key: string]: string }> {
    const user = await this.userService.getUserByLogin(login);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new ForbiddenException();
    }

    const payload = { username: user.login, sub: user.id };
    return {
      jwt: this.jwtService.sign(payload),
    };
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
