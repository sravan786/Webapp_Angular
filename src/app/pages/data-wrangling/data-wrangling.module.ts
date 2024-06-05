import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataWranglingComponent } from './data-wrangling.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes : Routes=[
  {
    path:'',
    component:DataWranglingComponent ,
    //canActivate:[AuthGuard]  
  }
];

@NgModule({
  declarations: [DataWranglingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class DataWranglingModule { }
