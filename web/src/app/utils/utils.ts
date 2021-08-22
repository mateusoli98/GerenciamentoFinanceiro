import { LocalStorageEnum } from '../enums/localStorage.enum';

export function setItemLocalStorage(key: LocalStorageEnum, value: string) {
  window.localStorage.setItem(key, value);
}

export function getItemLocalStorage(key: LocalStorageEnum) {
  return window.localStorage.getItem(key);
}

export function cleanLocalStorage() {
  window.localStorage.clear();
}
