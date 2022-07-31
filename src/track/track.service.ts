import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from 'src/interfaces/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private userRepo: Repository<TrackEntity>,
  ) {}

  async getTracks(): Promise<Track[]> {
    return await this.userRepo.find();
  }

  async getTrack(id: string): Promise<Track> {
    return await this.userRepo.findOne({ where: { id: id } });
  }

  async createTrack({
    name,
    duration,
    artistId,
    albumId,
  }: CreateTrackDto): Promise<Track> {
    const newTrack: Track = {
      id: uuidv4(),
      name,
      duration,
      artistId: artistId ?? null,
      albumId: albumId ?? null,
    };

    const createdTrack = this.userRepo.create(newTrack);

    return await this.userRepo.save(createdTrack);
  }

  async updateTrack(
    id,
    { name, duration, artistId, albumId }: UpdateTrackDto,
  ): Promise<Track> {
    const track = await this.userRepo.findOne({ where: { id: id } });

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

    return await this.userRepo.save(track);
  }

  async deleteTrack(id): Promise<void> {
    const result = await this.userRepo.delete(id);

    if (!result.affected) {
      throw new NotFoundException();
    }
  }
}
