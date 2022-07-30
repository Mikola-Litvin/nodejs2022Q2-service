import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackService } from 'src/track/track.service';
import { Album } from 'src/interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    private readonly trackService: TrackService,
    @InjectRepository(AlbumEntity)
    private userRepo: Repository<AlbumEntity>,
  ) {}

  async getAlbums(): Promise<Album[]> {
    return await this.userRepo.find();
  }

  async getAlbum(id: string): Promise<Album> {
    return await this.userRepo.findOne({ where: { id: id } });
  }

  async createAlbum({ name, year, artistId }: CreateAlbumDto): Promise<Album> {
    const newAlbum: Album = {
      id: uuidv4(),
      name,
      year,
      artistId: artistId ?? null,
    };

    const createdAlbum = this.userRepo.create(newAlbum);

    return await this.userRepo.save(createdAlbum);
  }

  async updateAlbum(
    id: string,
    { name, year, artistId }: UpdateAlbumDto,
  ): Promise<Album> {
    const album = await this.userRepo.findOne({ where: { id: id } });

    if (!album) {
      throw new NotFoundException();
    }

    const newArtistId =
      typeof artistId === 'undefined' ? album.artistId : artistId;

    album.name = name ?? album.name;
    album.year = year ?? album.year;
    album.artistId = newArtistId;

    return await this.userRepo.save(album);
  }

  async deleteAlbum(id: string): Promise<void> {
    const result = await this.userRepo.delete(id);

    if (!result.affected) {
      throw new NotFoundException();
    }

    const tracks = await this.trackService.getTracks();
    tracks.forEach(({ id: trackId, albumId }) => {
      if (albumId === id)
        this.trackService.updateTrack(trackId, { albumId: null });
    });
  }
}
