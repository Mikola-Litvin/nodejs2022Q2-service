import { v4 as uuidv4 } from 'uuid';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userRepo.find();

    return users.map((user) => user.toResponse() as User);
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException();
    }

    return user.toResponse() as User;
  }

  async createUser({ login, password }: CreateUserDto): Promise<User> {
    const newUser: User = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    const createdUser = this.userRepo.create(newUser);

    return (await this.userRepo.save(createdUser)).toResponse() as User;
  }

  async updateUser(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException();
    }

    if (oldPassword !== user.password) {
      throw new ForbiddenException();
    }

    user.password = newPassword;
    user.version = user.version + 1;
    user.updatedAt = new Date().getTime();

    return (await this.userRepo.save(user)).toResponse() as User;
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepo.delete(id);

    if (!result.affected) {
      throw new NotFoundException();
    }
  }
}
