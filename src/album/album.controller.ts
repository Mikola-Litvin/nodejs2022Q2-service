import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { Album } from 'src/interfaces/album.interface';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('/album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAlbums(): Promise<Album[]> {
    return await this.albumService.getAlbums();
  }

  @Get(':id')
  async getAlbum(@Param('id') id: string): Promise<Album> {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);

    const album = await this.albumService.getAlbum(id);

    if (!album) {
      throw new NotFoundException();
    }

    return album;
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createAlbum(@Body() album: CreateAlbumDto): Promise<Album> {
    return await this.albumService.createAlbum(album);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async updateAlbum(
    @Param('id') id: string,
    @Body() album: UpdateAlbumDto,
  ): Promise<Album> {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    return await this.albumService.updateAlbum(id, album);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string): Promise<void> {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    await this.albumService.deleteAlbum(id);
  }
}
