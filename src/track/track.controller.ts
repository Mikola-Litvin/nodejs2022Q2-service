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
import { Track } from 'src/interfaces/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('/track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getTracks(): Promise<Track[]> {
    return await this.trackService.getTracks();
  }

  @Get(':id')
  async getTrack(@Param('id') id: string): Promise<Track> {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);

    const track = await this.trackService.getTrack(id);

    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createTrack(@Body() track: CreateTrackDto): Promise<Track> {
    return await this.trackService.createTrack(track);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async updateTrack(
    @Param('id') id: string,
    @Body() track: UpdateTrackDto,
  ): Promise<Track> {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    return await this.trackService.updateTrack(id, track);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string): Promise<void> {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    await this.trackService.deleteTrack(id);
  }
}
