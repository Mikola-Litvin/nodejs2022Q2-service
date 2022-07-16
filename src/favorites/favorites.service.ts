import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
  getFavorites(): string {
    return 'Hello Favorites!';
  }

  addTrack(id) {
    return id;
  }

  deleteTrack(id) {
    return id;
  }

  addAlbum(id) {
    return id;
  }

  deleteAlbum(id) {
    return id;
  }

  addArtist(id) {
    return id;
  }

  deleteArtist(id) {
    return id;
  }
}
