export interface TopFiveItem {
    AccountID: string;
    PatientID: string;
    ShipDate: string;
    Product: string;
    DiseaseType: string;
    Segment: string;
  }
  
  export interface DataPruningResponse {
    top_five: TopFiveItem[];
    filtered_date: string;
    filtered_date_prune: string;
    filtered_num_accounts: number;
    filtered_num_patients: number;
    filtered_product: string[];
    filtered_disease: string[];
    filtered_segment: string[];
  }