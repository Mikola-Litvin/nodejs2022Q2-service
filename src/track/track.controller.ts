import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';

@Controller('/track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getTracks(): string {
    return this.trackService.getTracks();
  }

  @Get(':id')
  // @HttpCode(200)
  getTrack(@Param('id') id) {
    return this.trackService.getTrack(id);
  }

  @Post()
  // @HttpCode(201)
  createTrack(@Body() track) {
    return this.trackService.createTrack(track);
  }

  @Put(':id')
  // @HttpCode(200)
  updateTrack(@Param('id') id, @Body() track) {
    return this.trackService.updateTrack(id, track);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id') id) {
    return this.trackService.deleteTrack(id);
  }
}
