export interface SurvivalRecord {
    AccountID: string;
    PatientID: string;
    Product: string;
    DiseaseType: string;
    Segment: string;
    MOT: number;
    Observed: number;
  }
  
  export interface SurvivalModalBeforeResponse {
    survival_disease: string;
    survival_product: string;
    survival_segment: string;
    survival_num_patients: number;
    survival_min_date: string;
    survival_max_date: string;
    df_survival_top_5: SurvivalRecord[];
  }
  