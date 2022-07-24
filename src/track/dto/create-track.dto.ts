import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  duration: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  artistId: string | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  albumId: string | null;
}
