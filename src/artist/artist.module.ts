import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from 'src/album/album.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  imports: [
    AlbumModule,
    FavoritesModule,
    TrackModule,
    TypeOrmModule.forFeature([ArtistEntity]),
  ],
  exports: [ArtistService],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
