export interface TopFiveItem {
    AccountID: string;
    PatientID: string;
    Product: string;
    DiseaseType: string;
    Segment: string;
    MOT: number;
    MinShip: string;
    MaxShip: string;
    Observed: number;
  }
  
  export interface WranglingDataResponse {
    top_five: TopFiveItem[];
    start_36: string;
    end_36: string;
    number_accounts: number;
    number_patients: number;
    x: string[];
    y: number[];
  }