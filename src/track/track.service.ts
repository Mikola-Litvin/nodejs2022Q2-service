import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from 'src/interfaces/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    private readonly dbService: DBService,
    @InjectRepository(TrackEntity)
    private userRepo: Repository<TrackEntity>,
  ) {}

  getTracks(): Track[] {
    return this.dbService.tracks;
  }

  getTrack(id: string): Track {
    const track = this.dbService.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }

  createTrack({ name, duration, artistId, albumId }: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuidv4(),
      name,
      duration,
      artistId: artistId ?? null,
      albumId: albumId ?? null,
    };

    this.dbService.tracks.push(newTrack);

    return newTrack;
  }

  updateTrack(
    id,
    { name, duration, artistId, albumId }: UpdateTrackDto,
  ): Track {
    const track = this.dbService.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException();
    }

    const newArtistId =
      typeof artistId === 'undefined' ? track.artistId : artistId;
    const newAlbumId = typeof albumId === 'undefined' ? track.albumId : albumId;

    track.name = name ?? track.name;
    track.duration = duration ?? track.duration;
    track.artistId = newArtistId;
    track.albumId = newAlbumId;

    return track;
  }

  deleteTrack(id): void {
    const track = this.dbService.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException();
    }

    this.dbService.favorites.tracks = this.dbService.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );

    this.dbService.tracks = this.dbService.tracks.filter(
      (track) => track.id !== id,
    );
  }
}
