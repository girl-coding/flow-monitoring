export interface FilterDataInterface {
  selectedPlatform?: string;
  selectedStatus?: string;
  domaineName?: string;
  flowName?: string;
  flowUID?: string;
  startDate?: string;
  endDate?: string;
  keyName?: string;
  keyValue?: string;
}

export interface PeriodicElement {
  [key: string]: string | number | null;
}
