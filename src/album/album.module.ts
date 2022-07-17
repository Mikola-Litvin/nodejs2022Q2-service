import { Module } from '@nestjs/common';
import { DBModule } from 'src/db/db.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [DBModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
