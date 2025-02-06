import type { Client } from '@mengkodingan/ckptw';
import { globalThis } from './global';

export interface IGlobal extends globalThis {
  bot: Client
}