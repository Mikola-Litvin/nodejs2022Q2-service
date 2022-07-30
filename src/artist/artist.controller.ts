import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { Artist } from 'src/interfaces/artist.interface';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('/artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getArtists(): Promise<Artist[]> {
    return await this.artistService.getArtists();
  }

  @Get(':id')
  async getArtist(@Param('id') id: string): Promise<Artist> {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    return await this.artistService.getArtist(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createArtist(@Body() artist: CreateArtistDto): Promise<Artist> {
    return await this.artistService.createArtist(artist);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async updateArtist(
    @Param('id') id: string,
    @Body() artist: UpdateArtistDto,
  ): Promise<Artist> {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    return await this.artistService.updateArtist(id, artist);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string): Promise<void> {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    await this.artistService.deleteArtist(id);
  }
}
