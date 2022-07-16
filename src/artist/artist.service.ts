import { Injectable } from '@nestjs/common';

@Injectable()
export class ArtistService {
  getArtists(): string {
    return 'Hello Artist!';
  }
}
