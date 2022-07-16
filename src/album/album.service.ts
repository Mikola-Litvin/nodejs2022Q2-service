import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumService {
  getAlbums(): string {
    return 'Hello Album!';
  }

  getAlbum(id): string {
    return `Hello ${id}`;
  }

  createAlbum(album) {
    return album;
  }

  updateAlbum(id, album) {
    return album;
  }

  deleteAlbum(id) {
    return id;
  }
}
