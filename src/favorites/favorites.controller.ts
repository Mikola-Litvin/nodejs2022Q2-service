import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('/favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites(): string {
    return this.favoritesService.getFavorites();
  }

  @Post('/track/:id')
  // @HttpCode(201)
  addTrack(@Param('id') id) {
    return this.favoritesService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id') id) {
    return this.favoritesService.deleteTrack(id);
  }

  @Post('/album/:id')
  // @HttpCode(201)
  addAlbum(@Param('id') id) {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id) {
    return this.favoritesService.deleteAlbum(id);
  }

  @Post('/artist/:id')
  // @HttpCode(201)
  addArtist(@Param('id') id) {
    return this.favoritesService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id') id) {
    return this.favoritesService.deleteArtist(id);
  }
}
