import { Module } from '@nestjs/common';
import { DBModule } from 'src/db/db.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DBModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
