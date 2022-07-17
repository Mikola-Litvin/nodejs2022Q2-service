import { Injectable } from '@nestjs/common';
import { Album } from 'src/interfaces/album.interface';
import { Artist } from 'src/interfaces/artist.interface';
import { Favorites } from 'src/interfaces/favorites.interface';
import { Track } from 'src/interfaces/track.interface';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class DBService {
  users: User[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];
  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
