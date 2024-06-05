import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DataPruningComponent } from './data-pruning.component';
import { SharedModule } from 'src/app/shared/shared.module';


const routes : Routes=[
  {
    path:'',
    component:DataPruningComponent ,
    //canActivate:[AuthGuard]  
  }
];

@NgModule({
  declarations: [DataPruningComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class DataPruningModule { }
