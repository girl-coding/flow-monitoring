import { Component } from '@angular/core';
import {
  NAVIGATION_TABS,
  NavigationTabsInterface,
  TabInterface,
  getIconPath,
} from 'src/app/core';
import { normalizeName } from '../../helpers/strings.helper';
import { Location } from '@angular/common';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  get navigationTabs(): NavigationTabsInterface[] {
    return NAVIGATION_TABS.map((tab: TabInterface) => ({
      ...tab,
      iconLabel: `${tab.name} Icon`,
      iconName: getIconPath(normalizeName(tab.name)),
    }));
  }

  constructor(private readonly _location: Location) {}

  /**
   * So we can hover the active tab
   */
  isTabActive(tab: TabInterface): boolean {
    const tabUrl = tab?.url ?? tab.name;
    const currentUrl = this._location.path();
    return currentUrl.startsWith(`/${tabUrl}`);
  }
}
