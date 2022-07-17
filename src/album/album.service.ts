import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { Album } from 'src/interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly dbService: DBService) {}

  getAlbums(): Album[] {
    return this.dbService.albums;
  }

  getAlbum(id: string): Album {
    const album = this.dbService.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException();
    }

    return album;
  }

  createAlbum({ name, year, artistId }: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      name,
      year,
      artistId: artistId ?? null,
    };

    this.dbService.albums.push(newAlbum);

    return newAlbum;
  }

  updateAlbum(id: string, { name, year, artistId }: UpdateAlbumDto): Album {
    const album = this.dbService.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException();
    }

    const newArtistId =
      typeof artistId === 'undefined' ? album.artistId : artistId;

    album.name = name ?? album.name;
    album.year = year ?? album.year;
    album.artistId = newArtistId;

    return album;
  }

  deleteAlbum(id: string): void {
    const album = this.dbService.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException();
    }

    this.dbService.tracks.forEach((track) => {
      if (track.albumId === id) track.albumId = null;
    });

    this.dbService.favorites.albums = this.dbService.favorites.albums.filter(
      (albumId) => albumId !== id,
    );

    this.dbService.albums = this.dbService.albums.filter(
      (album) => album.id !== id,
    );
  }
}
