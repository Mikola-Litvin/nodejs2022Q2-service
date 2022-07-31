import { v4 as uuidv4 } from 'uuid';
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { Artist } from 'src/interfaces/artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TrackService,
    @InjectRepository(ArtistEntity)
    private userRepo: Repository<ArtistEntity>,
  ) {}

  async getArtists(): Promise<Artist[]> {
    return await this.userRepo.find();
  }

  async getArtist(id: string): Promise<Artist> {
    return await this.userRepo.findOne({ where: { id: id } });
  }

  async createArtist({ name, grammy }: CreateArtistDto): Promise<Artist> {
    const newArtist: Artist = {
      id: uuidv4(),
      name,
      grammy,
    };

    const createdArtist = this.userRepo.create(newArtist);

    return await this.userRepo.save(createdArtist);
  }

  async updateArtist(
    id: string,
    { name, grammy }: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = await this.userRepo.findOne({ where: { id: id } });

    if (!artist) {
      throw new NotFoundException();
    }

    artist.name = name ?? artist.name;
    artist.grammy = grammy ?? artist.grammy;

    return await this.userRepo.save(artist);
  }

  async deleteArtist(id: string): Promise<void> {
    const result = await this.userRepo.delete(id);

    if (!result.affected) {
      throw new NotFoundException();
    }

    const albums = await this.albumService.getAlbums();
    albums.forEach(({ id: albumId, artistId }) => {
      if (artistId === id)
        this.albumService.updateAlbum(albumId, { artistId: null });
    });

    const tracks = await this.trackService.getTracks();
    tracks.forEach(({ id: trackId, artistId }) => {
      if (artistId === id)
        this.trackService.updateTrack(trackId, { artistId: null });
    });

    await this.favoritesService.deleteArtist(id);
  }
}
