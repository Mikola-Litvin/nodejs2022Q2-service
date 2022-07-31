import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from 'src/track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumEntity } from './entities/album.entity';

@Module({
  imports: [TrackModule, TypeOrmModule.forFeature([AlbumEntity])],
  exports: [AlbumService],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
