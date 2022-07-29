import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from 'src/interfaces/artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    private readonly dbService: DBService,
    @InjectRepository(ArtistEntity)
    private userRepo: Repository<ArtistEntity>,
  ) {}

  getArtists(): Artist[] {
    return this.dbService.artists;
  }

  getArtist(id: string): Artist {
    const artist = this.dbService.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  createArtist({ name, grammy }: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      name,
      grammy,
    };

    this.dbService.artists.push(newArtist);

    return newArtist;
  }

  updateArtist(id: string, { name, grammy }: UpdateArtistDto) {
    const artist = this.dbService.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException();
    }

    artist.name = name ?? artist.name;
    artist.grammy = grammy ?? artist.grammy;

    return artist;
  }

  deleteArtist(id: string) {
    const artist = this.dbService.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException();
    }

    this.dbService.albums.forEach((album) => {
      if (album.artistId === id) album.artistId = null;
    });

    this.dbService.tracks.forEach((track) => {
      if (track.artistId === id) track.artistId = null;
    });

    this.dbService.favorites.artists = this.dbService.favorites.artists.filter(
      (artistId) => artistId !== id,
    );

    this.dbService.artists = this.dbService.artists.filter(
      (artist) => artist.id !== id,
    );
  }
}
