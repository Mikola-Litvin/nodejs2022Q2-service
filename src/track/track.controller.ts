import { Controller, Get } from '@nestjs/common';
import { TrackService } from './track.service';

@Controller('/track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getTracks(): string {
    return this.trackService.getTracks();
  }
}
