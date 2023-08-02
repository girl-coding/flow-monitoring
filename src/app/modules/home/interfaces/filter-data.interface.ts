export interface FilterDataInterface {
  selectedPlatform: string | null;
  selectedStatus: string | null;
  domaineName: string | null;
  flowName: string | null;
  flowUID: string | null;
  startDate: string | null;
  endDate: string | null;
  keyName: string | null;
  keyValue: string | null;
}

export interface PeriodicElement {
  position: string | null;
  status: string | null;
  total: number | null;
  date: string | null;
  owner: string | null;
}
