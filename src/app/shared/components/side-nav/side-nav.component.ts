import { Component } from '@angular/core';
import {
  NAVIGATION_TABS,
  NavigationTabsInterface,
  SideNavWidthEnum,
  StorageService,
  TabInterface,
  getIconPath,
} from 'src/app/core';
import { normalizeName } from '../../helpers/strings.helper';
import { Location } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('collapseAnimation', [
      state(SideNavWidthEnum.LARGE, style({ width: '270px' })),
      state(SideNavWidthEnum.SMALL, style({ width: '75px' })),
      transition(
        `${SideNavWidthEnum.LARGE} <=> ${SideNavWidthEnum.SMALL}`,
        animate('0.3s ease-in-out'),
      ),
    ]),
  ],
})
export class SideNavComponent {
  get navigationTabs(): NavigationTabsInterface[] {
    return NAVIGATION_TABS.map((tab: TabInterface) => ({
      ...tab,
      iconLabel: `${tab.name} Icon`,
      iconName: getIconPath(normalizeName(tab.name)),
    }));
  }

  get isFullSideNav(): boolean {
    return this.getSideNavState === SideNavWidthEnum.LARGE;
  }

  get getSideNavState(): SideNavWidthEnum {
    return this._storageService.getSideNavWidth();
  }

  constructor(
    private readonly _location: Location,
    private readonly _storageService: StorageService,
  ) {}

  /**
   * So we can hover the active tab
   */
  isTabActive(tab: TabInterface): boolean {
    const tabUrl = tab?.url ?? tab.name;
    const currentUrl = this._location.path();
    return currentUrl.startsWith(`/${tabUrl}`);
  }

  toggleSideNavWidth(): void {
    this._storageService.updateSideNavWidth(
      this.isFullSideNav
        ? SideNavWidthEnum.SMALL
        : SideNavWidthEnum.LARGE,
    );
  }
}
