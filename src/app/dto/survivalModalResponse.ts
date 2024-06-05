export interface SurvivalTop5 {
    AccountID: string;
    PatientID: string;
    Product: string;
    DiseaseType: string;
    Segment: string;
    MOT: number;
    Observed: number;
  }
  
  // Define the structure for the final top 25 survival data
  export interface FinalTop25 {
    Months_on_Therapy: number;
    Survival_Probability: number;
    KM_Lower_Bound_Survival_Prob: number;
    KM_Upper_Bound_Survival_Prob: number;
  }
  
  // Define the structure for the complete response
  export interface SurvivalModalResponse {
    median_surv: number;
    mean_surv: number;
    df_final_top_25: FinalTop25[];
  }