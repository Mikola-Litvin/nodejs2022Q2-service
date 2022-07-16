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
import { ArtistService } from './artist.service';

@Controller('/artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getArtists(): string {
    return this.artistService.getArtists();
  }

  @Get(':id')
  // @HttpCode(200)
  getArtist(@Param('id') id) {
    return this.artistService.getArtist(id);
  }

  @Post()
  // @HttpCode(201)
  createArtist(@Body() artist) {
    return this.artistService.createArtist(artist);
  }

  @Put(':id')
  // @HttpCode(200)
  updateArtist(@Param('id') id, @Body() artist) {
    return this.artistService.updateArtist(id, artist);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id) {
    return this.artistService.deleteArtist(id);
  }
}
