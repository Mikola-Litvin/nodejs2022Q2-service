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
import { Track } from 'src/interfaces/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('/track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getTracks() {
    return this.trackService.getTracks();
  }

  @Get(':id')
  getTrack(@Param('id') id: string): Track {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    return this.trackService.getTrack(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createTrack(@Body() track: CreateTrackDto): Track {
    return this.trackService.createTrack(track);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateTrack(@Param('id') id: string, @Body() track: UpdateTrackDto): Track {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    return this.trackService.updateTrack(id, track);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string): void {
    if (!uuidValidate(id))
      throw new HttpException('Id is not UUID', HttpStatus.BAD_REQUEST);
    this.trackService.deleteTrack(id);
  }
}
