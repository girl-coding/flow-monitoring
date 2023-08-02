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
  position: string;
  status: string;
  total: number;
  date: string;
  owner?: string;
}
