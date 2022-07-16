import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
  getFavorites(): string {
    return 'Hello Favorites!';
  }
}
