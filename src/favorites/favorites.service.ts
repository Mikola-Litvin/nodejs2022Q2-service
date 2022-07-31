import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesRepsonse } from 'src/interfaces/favorites.interface';
import { FavoritesEntity } from './entities/favorites.entity';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class FavoritesService {
  public favoritesId: string;

  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    @InjectRepository(FavoritesEntity)
    private userRepo: Repository<FavoritesEntity>,
  ) {
    this.createFavorites();
  }

  async createFavorites(): Promise<void> {
    const favorites = {
      artists: {},
      albums: {},
      tracks: {},
    };
    const createdFavorites = await this.userRepo.create(favorites);

    this.favoritesId = (await this.userRepo.save(createdFavorites)).id;
  }

  async getFavorites(): Promise<FavoritesRepsonse> {
    const favorites = await this.userRepo.findOne({
      where: { id: this.favoritesId },
    });

    let artists = favorites.artists.map((artistId) => {
      const artist = this.artistService.getArtist(artistId);

      if (artist) return artist;
    });
    artists = await Promise.all(artists);

    let albums = favorites.albums.map((albumId) => {
      const album = this.albumService.getAlbum(albumId);

      if (album) return album;
    });
    albums = await Promise.all(albums);

    let tracks = favorites.tracks.map((trackId) => {
      const track = this.trackService.getTrack(trackId);

      if (track) return track;
    });
    tracks = await Promise.all(tracks);

    return {
      artists,
      albums,
      tracks,
    };
  }

  async addTrack(id: string): Promise<{ message: string }> {
    const track = await this.trackService.getTrack(id);

    if (!track)
      throw new HttpException(
        'The track does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const favorites = await this.userRepo.findOne({
      where: { id: this.favoritesId },
    });

    const isFavoriteTrack = favorites.tracks.find((trackId) => trackId === id);

    if (isFavoriteTrack)
      return { message: 'This track is already in the Favorites' };

    favorites.tracks.push(id);
    favorites.tracks = `{${favorites.tracks.join()}}`;
    await this.userRepo.save(favorites);

    return { message: 'The track has been added to the Favorites' };
  }

  async deleteTrack(id: string): Promise<void> {
    const favorites = await this.userRepo.findOne({
      where: { id: this.favoritesId },
    });

    const isFavoriteTrack = favorites.tracks.find((trackId) => trackId === id);

    if (!isFavoriteTrack) throw new NotFoundException();

    favorites.tracks = favorites.tracks.filter((trackId) => trackId !== id);
    favorites.tracks = `{${favorites.tracks.join()}}`;
    await this.userRepo.save(favorites);
  }

  async addAlbum(id: string): Promise<{ message: string }> {
    const album = await this.albumService.getAlbum(id);

    if (!album)
      throw new HttpException(
        'The album does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const favorites = await this.userRepo.findOne({
      where: { id: this.favoritesId },
    });

    const isFavoriteAlbum = favorites.albums.find((albumId) => albumId === id);

    if (isFavoriteAlbum)
      return { message: 'This album is already in the Favorites' };

    favorites.albums.push(id);
    favorites.albums = `{${favorites.albums.join()}}`;
    await this.userRepo.save(favorites);

    return { message: 'The album has been added to the Favorites' };
  }

  async deleteAlbum(id: string): Promise<void> {
    const favorites = await this.userRepo.findOne({
      where: { id: this.favoritesId },
    });

    const isFavoriteAlbum = favorites.albums.find((albumId) => albumId === id);

    if (!isFavoriteAlbum) throw new NotFoundException();

    favorites.albums = favorites.albums.filter((albumId) => albumId !== id);
    favorites.albums = `{${favorites.albums.join()}}`;
    await this.userRepo.save(favorites);
  }

  async addArtist(id: string): Promise<{ message: string }> {
    const artist = await this.artistService.getArtist(id);

    if (!artist)
      throw new HttpException(
        'The artist does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const favorites = await this.userRepo.findOne({
      where: { id: this.favoritesId },
    });

    const isFavoriteArtist = favorites.artists.find(
      (artistId) => artistId === id,
    );

    if (isFavoriteArtist)
      return { message: 'This artist is already in the Favorites' };

    favorites.artists.push(id);
    favorites.artists = `{${favorites.artists.join()}}`;
    await this.userRepo.save(favorites);

    return { message: 'The artist has been added to the Favorites' };
  }

  async deleteArtist(id: string): Promise<void> {
    const favorites = await this.userRepo.findOne({
      where: { id: this.favoritesId },
    });

    const isFavoriteArtist = favorites.artists.find(
      (artistId) => artistId === id,
    );

    if (!isFavoriteArtist) throw new NotFoundException();

    favorites.artists = favorites.artists.filter((artistId) => artistId !== id);
    favorites.artists = `{${favorites.artists.join()}}`;
    await this.userRepo.save(favorites);
  }
}
