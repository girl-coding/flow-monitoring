import { TabInterface } from '../interfaces/tab.interface';

/**
 * If url different from name we specify it
 */
export const NAVIGATION_TABS: TabInterface[] = [
  { name: 'Dashboard', url: 'home', matIconName: 'home' },
  { name: 'Charts', matIconName: 'query_stats' },
  { name: 'Management', matIconName: 'edit_note' },
  { name: 'Help Center', matIconName: 'help' },
  { name: 'Settings', matIconName: 'settings' },
];
