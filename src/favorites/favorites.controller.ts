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
  async getFavorites(): Promise<FavoritesRepsonse> {
    return await this.favoritesService.getFavorites();
  }

  @Post('/track/:id')
  async addTrack(@Param('id') id: string): Promise<{ message: string }> {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    return await this.favoritesService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string): Promise<void> {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    await this.favoritesService.deleteTrack(id);
  }

  @Post('/album/:id')
  async addAlbum(@Param('id') id: string): Promise<{ message: string }> {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    return await this.favoritesService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string): Promise<void> {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    await this.favoritesService.deleteAlbum(id);
  }

  @Post('/artist/:id')
  async addArtist(@Param('id') id: string): Promise<{ message: string }> {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    return await this.favoritesService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string): Promise<void> {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    await this.favoritesService.deleteArtist(id);
  }
}
