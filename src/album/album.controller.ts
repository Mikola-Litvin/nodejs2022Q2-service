import { Controller, Get } from '@nestjs/common';
import { AlbumService } from './album.service';

@Controller('/album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAlbums(): string {
    return this.albumService.getAlbums();
  }
}