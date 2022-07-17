import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { Track } from 'src/interfaces/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private readonly dbService: DBService) {}

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

    this.dbService.tracks = this.dbService.tracks.filter(
      (track) => track.id !== id,
    );
  }
}
