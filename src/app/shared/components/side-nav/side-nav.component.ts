import { Component } from '@angular/core';
import {
  NAVIGATION_TABS,
  TabNavigationInterface,
  getIconPath,
} from 'src/app/core';
import { normalizeName } from '../../helpers/strings.helper';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  get navigationTabs(): TabNavigationInterface[] {
    return NAVIGATION_TABS.map((tab) => ({
      name: tab.name,
      iconLabel: `${tab.name} Icon`,
      iconName: getIconPath(normalizeName(tab.name)),
    }));
  }
}
