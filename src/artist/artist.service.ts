import { Injectable } from '@nestjs/common';

@Injectable()
export class ArtistService {
  getArtists(): string {
    return 'Hello Artist!';
  }

  getArtist(id): string {
    return `Hello ${id}`;
  }

  createArtist(artist) {
    return artist;
  }

  updateArtist(id, artist) {
    return artist;
  }

  deleteArtist(id) {
    return id;
  }
}
