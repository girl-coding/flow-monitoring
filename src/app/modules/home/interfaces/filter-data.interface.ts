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
  position: string | null;
  status: string | null;
  total: number | null;
  date: string | null;
  owner: string | null;
}
