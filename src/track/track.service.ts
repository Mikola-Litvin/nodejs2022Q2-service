import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackService {
  getTracks(): string {
    return 'Hello Track!';
  }
}
