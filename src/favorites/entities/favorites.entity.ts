import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorites')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'simple-array',
    array: true,
  })
  artists;

  @Column({
    type: 'simple-array',
    array: true,
  })
  albums;

  @Column({
    type: 'simple-array',
    array: true,
  })
  tracks;
}
