import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { FavoritesRepsonse } from 'src/interfaces/favorites.interface';
import { FavoritesService } from './favorites.service';

@Controller('/favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites(): FavoritesRepsonse {
    return this.favoritesService.getFavorites();
  }

  @Post('/track/:id')
  addTrack(@Param('id') id: string) {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    return this.favoritesService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string): void {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    this.favoritesService.deleteTrack(id);
  }

  @Post('/album/:id')
  addAlbum(@Param('id') id: string) {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    return this.favoritesService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string): void {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    this.favoritesService.deleteAlbum(id);
  }

  @Post('/artist/:id')
  addArtist(@Param('id') id: string) {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    return this.favoritesService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string): void {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    return this.favoritesService.deleteArtist(id);
  }
}
