import { Component, OnInit } from '@angular/core';
import { StorageService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly _storageService: StorageService) {}

  ngOnInit(): void {
    this.toggleModeUi();
  }

  /**
   * Init the normal mode
   */
  toggleModeUi(): void {
    const defaultValue = this._storageService.getDarkMode();
    const root = document.documentElement;
    root.classList.toggle(defaultValue, true);
  }
}
