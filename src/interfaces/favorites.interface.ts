import { Album } from './album.interface';
import { Artist } from './artist.interface';
import { Track } from './track.interface';

export interface FavoritesRepsonse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}
