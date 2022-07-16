import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackService {
  getTracks(): string {
    return 'Hello Track!';
  }

  getTrack(id): string {
    return `Hello ${id}`;
  }

  createTrack(track) {
    return track;
  }

  updateTrack(id, track) {
    return track;
  }

  deleteTrack(id) {
    return id;
  }
}
