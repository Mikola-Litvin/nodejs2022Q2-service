import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUsers(): string {
    return 'Hello User!';
  }

  getUser(id): string {
    return `Hello ${id}`;
  }

  createUser(user) {
    return user;
  }

  updateUser(id, user) {
    return user;
  }

  deleteUser(id) {
    return id;
  }
}
