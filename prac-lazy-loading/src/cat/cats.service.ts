import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  async getAllCats() {
    const start = Date.now();
    await new Promise(resolve => setTimeout(resolve, 300)); // simulate slow work
    const end = Date.now();
    console.log(`🐾 getAllCats() took ${end - start}ms`);
    return ['Tom', 'Garfield', 'Whiskers'];
  }
}
