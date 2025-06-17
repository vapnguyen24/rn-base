import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

import { APP_DISPLAY_NAME, PRIVATE_KEY_STORAGE } from '~/env-config';

export const AppStorage = new MMKV({
  encryptionKey: PRIVATE_KEY_STORAGE,
  id: `user-${APP_DISPLAY_NAME}-storage`,
});

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export function loadString(key: string) {
  try {
    return AppStorage.getString(key);
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return undefined;
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export function saveString(key: string, value: string) {
  try {
    AppStorage.set(key, value);

    return true;
  } catch {
    return false;
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export function load<T = Record<string, any>>(key: string): T | null {
  try {
    const almostThere = AppStorage.getString(key);

    return typeof almostThere === 'string' ? JSON.parse(almostThere) : null;
  } catch {
    return null;
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export function save(key: string, value: any) {
  try {
    AppStorage.set(key, JSON.stringify(value));

    return true;
  } catch {
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key: string) {
  try {
    AppStorage.delete(key);
  } catch {}
}

export const zustandStorage = {
  getItem: (name: string) => {
    const value = AppStorage.getString(name);
    return value ? JSON.parse(value) : null;
  },
  removeItem: (name: string) => {
    return AppStorage.delete(name);
  },
  setItem: (name: string, value: any) => {
    return AppStorage.set(name, JSON.stringify(value));
  },
};
