import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorites')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  artists: string;

  @Column()
  albums: string;

  @Column()
  tracks: string;
}
