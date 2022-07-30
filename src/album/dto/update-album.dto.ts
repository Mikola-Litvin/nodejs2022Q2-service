import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  year?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  artistId?: string | null;
}
