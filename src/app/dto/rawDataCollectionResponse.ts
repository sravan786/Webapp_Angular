export interface TopFiveItem {
  AccountID: string;
  PatientID: string;
  ShipDate: string;
  Product: string;
  DiseaseType: string;
  Segment: string;
}

export interface RawDataCollectionResponse {
  top_five: TopFiveItem[];
  num_accountid: number;
  num_patientid: number;
  mindate_raw: string;
}
