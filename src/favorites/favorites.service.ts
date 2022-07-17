import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { FavoritesRepsonse } from 'src/interfaces/favorites.interface';

@Injectable()
export class FavoritesService {
  constructor(private readonly dbService: DBService) {}

  getFavorites(): FavoritesRepsonse {
    const artists = this.dbService.favorites.artists.map((artistId) => {
      const artist = this.dbService.artists.find(
        (artist) => artist.id === artistId,
      );

      if (artist) return artist;
    });

    const albums = this.dbService.favorites.albums.map((albumId) => {
      const album = this.dbService.albums.find((album) => album.id === albumId);

      if (album) return album;
    });

    const tracks = this.dbService.favorites.tracks.map((trackId) => {
      const track = this.dbService.tracks.find((track) => track.id === trackId);

      if (track) return track;
    });

    return {
      artists,
      albums,
      tracks,
    };
  }

  addTrack(id: string): { message: string } {
    const track = this.dbService.tracks.find((track) => track.id === id);

    if (!track)
      throw new HttpException(
        'The track does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    this.dbService.favorites.tracks.push(id);

    return { message: 'The track has been added to the Favorites' };
  }

  deleteTrack(id: string): void {
    // return id;
  }

  addAlbum(id: string): { message: string } {
    return { message: 'The album has been added to the Favorites' };
  }

  deleteAlbum(id: string): void {
    // return id;
  }

  addArtist(id: string): { message: string } {
    return { message: 'The artist has been added to the Favorites' };
  }

  deleteArtist(id: string): void {
    // return id;
  }
}
