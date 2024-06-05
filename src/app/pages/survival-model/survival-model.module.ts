import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SurvivalModelComponent } from './survival-model.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes : Routes=[
  {
    path:'',
    component:SurvivalModelComponent ,
    //canActivate:[AuthGuard]  
  }
];

@NgModule({
  declarations: [SurvivalModelComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class SurvivalModelModule { }
