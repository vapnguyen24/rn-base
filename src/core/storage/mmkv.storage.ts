import { createMMKV } from 'react-native-mmkv';
import type { IStorage } from './storage.interface';

const mmkv = createMMKV();

// Zustand-persist compatible storage adapter
export const mmkvStorage: IStorage & {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
} = {
  getString: (key) => mmkv.getString(key),
  set: (key, value) => mmkv.set(key, value),
  delete: (key) => mmkv.remove(key),

  // Zustand persist interface
  getItem: (key) => mmkv.getString(key) ?? null,
  setItem: (key, value) => mmkv.set(key, value),
  removeItem: (key) => mmkv.remove(key),
};
