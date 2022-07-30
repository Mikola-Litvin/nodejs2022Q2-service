import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { FavoritesEntity } from './entities/favorites.entity';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    AlbumModule,
    TrackModule,
    TypeOrmModule.forFeature([FavoritesEntity]),
    forwardRef(() => ArtistModule),
  ],
  exports: [FavoritesService],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
