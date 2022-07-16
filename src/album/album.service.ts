import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumService {
  getAlbums(): string {
    return 'Hello Album!';
  }
}
