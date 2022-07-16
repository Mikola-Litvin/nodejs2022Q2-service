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
import { AlbumService } from './album.service';

@Controller('/album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAlbums(): string {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  // @HttpCode(200)
  getAlbum(@Param('id') id) {
    return this.albumService.getAlbum(id);
  }

  @Post()
  // @HttpCode(201)
  createAlbum(@Body() album) {
    return this.albumService.createAlbum(album);
  }

  @Put(':id')
  // @HttpCode(200)
  updateAlbum(@Param('id') id, @Body() album) {
    return this.albumService.updateAlbum(id, album);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id) {
    return this.albumService.deleteAlbum(id);
  }
}
