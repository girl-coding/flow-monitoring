import { Injectable } from '@angular/core';
import { StorageKeysType } from '../types/storage-keys.type';
import { StorageKeysEnum } from '../enums/storage-keys.enum';
import { ModeUI } from '../enums/modes-ui.enum';
import {
  DEFAULT_APPLICATION_THEME,
  DEFAULT_SIDE_NAV_WIDTH,
} from '../constants/app.const';
import { SideNavWidthEnum } from '../enums/side-nav-width.enum.ts';

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

  /**
   * save the last option selected by the user
   */
  updateSideNavWidth(data: SideNavWidthEnum): void {
    this.saveData(StorageKeysEnum.SIDE_NAV_WIDTH, data);
  }

  /**
   * get the last value used by the user
   * return light by default if user never changed it
   */
  getSideNavWidth(): SideNavWidthEnum {
    return (
      this.getData(StorageKeysEnum.SIDE_NAV_WIDTH) ??
      DEFAULT_SIDE_NAV_WIDTH
    );
  }

  clearSideNavWidth(): void {
    const data = this.getSideNavWidth();
    if (data) {
      localStorage.removeItem(StorageKeysEnum.SIDE_NAV_WIDTH);
    }
  }
}
