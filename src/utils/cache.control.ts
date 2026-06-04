import { Injectable } from '@nestjs/common';
import NodeCache from 'node-cache';

const cache = new NodeCache();
@Injectable()
export class Cache {
  setCache(key: string, value: string): boolean {
    const data = cache.set(key, value, 180);
    return data;
  }
  getCache(key: string): string {
    const data = String(cache.get(key));
    return data;
  }
  delCache(key: string): boolean {
    cache.del(key);
    return true;
  }
}
