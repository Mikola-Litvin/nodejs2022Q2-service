import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesRepsonse } from 'src/interfaces/favorites.interface';
import { FavoritesEntity } from './entities/favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly dbService: DBService,
    @InjectRepository(FavoritesEntity)
    private userRepo: Repository<FavoritesEntity>,
  ) {}

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

    const isFavoriteTrack = this.dbService.favorites.tracks.find(
      (trackId) => trackId === id,
    );

    if (isFavoriteTrack)
      return { message: 'This track is already in the Favorites' };

    this.dbService.favorites.tracks.push(id);

    return { message: 'The track has been added to the Favorites' };
  }

  deleteTrack(id: string): void {
    const isFavoriteTrack = this.dbService.favorites.tracks.find(
      (trackId) => trackId === id,
    );

    if (!isFavoriteTrack) throw new NotFoundException();

    this.dbService.favorites.tracks = this.dbService.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }

  addAlbum(id: string): { message: string } {
    const album = this.dbService.albums.find((album) => album.id === id);

    if (!album)
      throw new HttpException(
        'The album does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const isFavoriteAlbum = this.dbService.favorites.albums.find(
      (albumId) => albumId === id,
    );

    if (isFavoriteAlbum)
      return { message: 'This album is already in the Favorites' };

    this.dbService.favorites.albums.push(id);

    return { message: 'The album has been added to the Favorites' };
  }

  deleteAlbum(id: string): void {
    const isFavoriteAlbum = this.dbService.favorites.albums.find(
      (albumId) => albumId === id,
    );

    if (!isFavoriteAlbum) throw new NotFoundException();

    this.dbService.favorites.albums = this.dbService.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
  }

  addArtist(id: string): { message: string } {
    const artist = this.dbService.artists.find((artist) => artist.id === id);

    if (!artist)
      throw new HttpException(
        'The artist does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const isFavoriteArtist = this.dbService.favorites.artists.find(
      (artistId) => artistId === id,
    );

    if (isFavoriteArtist)
      return { message: 'This artist is already in the Favorites' };

    this.dbService.favorites.artists.push(id);

    return { message: 'The artist has been added to the Favorites' };
  }

  deleteArtist(id: string): void {
    const isFavoriteArtist = this.dbService.favorites.artists.find(
      (artistId) => artistId === id,
    );

    if (!isFavoriteArtist) throw new NotFoundException();

    this.dbService.favorites.artists = this.dbService.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
  }
}
