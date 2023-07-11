import { Component } from '@angular/core';
import { StorageService, ModeUI } from 'src/app/core';

@Component({
  selector: 'app-mode-ui',
  templateUrl: './mode-ui.component.html',
  styleUrls: ['./mode-ui.component.scss'],
})
export class ModeUiComponent {
  isModeToggled!: boolean;

  constructor(private readonly _storageService: StorageService) {
    // if there's a dark or light theme in local storage then set it to true else false
    this.isModeToggled = _storageService.getDarkMode() == ModeUI.DARK;
  }

  /**
   * By default we are triggering the normal mode
   */
  toggleModeUi(): void {
    this.isModeToggled = !this.isModeToggled;
    const root = document.documentElement;

    this._storageService.updateDarkMode(
      this.isModeToggled ? ModeUI.DARK : ModeUI.LIGHT,
    );

    root.classList.toggle(ModeUI.DARK, this.isModeToggled);
    root.classList.toggle(ModeUI.LIGHT, !this.isModeToggled);
  }
}
