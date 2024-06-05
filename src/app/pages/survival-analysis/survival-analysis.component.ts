import { Component } from '@angular/core';

@Component({
  selector: 'app-survival-analysis',
  templateUrl: './survival-analysis.component.html',
  styleUrls: ['./survival-analysis.component.scss']
})
export class SurvivalAnalysisComponent {
  currentYear: number;


  constructor() {
    this.currentYear = new Date().getFullYear();
  }
}
