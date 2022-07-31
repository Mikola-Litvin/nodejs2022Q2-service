import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  duration?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  artistId?: string | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  albumId?: string | null;
}
