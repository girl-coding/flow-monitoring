import { Injectable } from '@angular/core';
import { StorageKeysType } from '../types/storage-keys.type';
import { StorageKeysEnum } from '../enums/storage-keys.enum';
import { ModeUI } from '../enums/modes-ui.enum';
import { DEFAULT_APPLICATION_THEME } from '../constants/app.const';

@Injectable()
export class StorageService {
  saveData(key: StorageKeysEnum, data: StorageKeysType): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getData(key: StorageKeysEnum): any {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  clearData(): void {
    localStorage.clear();
  }

  /**
   * save the last option selected by the user
   */
  updateDarkMode(data: ModeUI): void {
    this.saveData(StorageKeysEnum.DARK_MODE_VALUE, data);
  }

  /**
   * get the last value used by the user
   * return light by default if user never changed it
   */
  getDarkMode(): ModeUI {
    return (
      this.getData(StorageKeysEnum.DARK_MODE_VALUE) ??
      DEFAULT_APPLICATION_THEME
    );
  }

  clearDarkMode(): void {
    const data = this.getDarkMode();
    if (data) {
      localStorage.removeItem(StorageKeysEnum.DARK_MODE_VALUE);
    }
  }
}
