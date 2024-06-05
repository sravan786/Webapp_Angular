export class SurvivalModelChartData{
    monthsOnTherapy: number;
    survivalProbability: number;
    kmLowerBoundSurvivalProb: number;
    kmUpperBoundSurvivalProb: number;

    constructor(
        monthsOnTherapy: number,
        survivalProbability: number,
        kmLowerBoundSurvivalProb: number,
        kmUpperBoundSurvivalProb: number
      ) {
        this.monthsOnTherapy = monthsOnTherapy;
        this.survivalProbability = survivalProbability;
        this.kmLowerBoundSurvivalProb = kmLowerBoundSurvivalProb;
        this.kmUpperBoundSurvivalProb = kmUpperBoundSurvivalProb;
      }
}