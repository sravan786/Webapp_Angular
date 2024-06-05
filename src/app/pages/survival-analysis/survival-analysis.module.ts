import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SurvivalAnalysisComponent } from './survival-analysis.component';

const routes : Routes=[
  {
    path:'',
    component:SurvivalAnalysisComponent ,
    //canActivate:[AuthGuard]  
  }
];

@NgModule({
  declarations: [SurvivalAnalysisComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class SurvivalAnalysisModule { }
