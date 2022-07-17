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
  getArtists(): Artist[] {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtist(@Param('id') id: string): Artist {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    return this.artistService.getArtist(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createArtist(@Body() artist: CreateArtistDto) {
    return this.artistService.createArtist(artist);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateArtist(@Param('id') id: string, @Body() artist: UpdateArtistDto) {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    return this.artistService.updateArtist(id, artist);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string): void {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    this.artistService.deleteArtist(id);
  }
}
