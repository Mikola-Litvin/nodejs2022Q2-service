import { Module } from '@nestjs/common';
import { DBModule } from 'src/db/db.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [DBModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
