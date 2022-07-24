import { Module } from '@nestjs/common';
import { DBModule } from 'src/db/db.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [DBModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
