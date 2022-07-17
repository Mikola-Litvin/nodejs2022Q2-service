import { v4 as uuidv4 } from 'uuid';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { User } from 'src/interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DBService) {}

  getUsers(): User[] {
    const users = this.dbService.users;

    return users.map((user) => {
      const respons = Object.entries(user).filter(
        (item) => item[0] !== 'password',
      );
      return Object.fromEntries(respons) as User;
    });
  }

  getUser(id: string): User {
    const user = this.dbService.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException();
    }

    const respons = Object.entries(user).filter(
      (item) => item[0] !== 'password',
    );

    return Object.fromEntries(respons) as User;
  }

  createUser({ login, password }: CreateUserDto): User {
    const newUser: User = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: null,
    };

    this.dbService.users.push(newUser);

    const respons = Object.entries(newUser).filter(
      (item) => item[0] !== 'password',
    );

    return Object.fromEntries(respons) as User;
  }

  updateUser(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): User {
    const user = this.dbService.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException();
    }

    if (oldPassword !== user.password) {
      throw new ForbiddenException();
    }

    user.password = newPassword;
    user.version = user.version + 1;
    user.updatedAt = new Date().getTime();

    const respons = Object.entries(user).filter(
      (item) => item[0] !== 'password',
    );

    return Object.fromEntries(respons) as User;
  }

  deleteUser(id: string): void {
    const user = this.dbService.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException();
    }

    this.dbService.users = this.dbService.users.filter(
      (user) => user.id !== id,
    );
  }
}
