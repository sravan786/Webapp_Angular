import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RawDataCollectionComponent } from './raw-data-collection.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes : Routes=[
  {
    path:'',
    component:RawDataCollectionComponent ,
    //canActivate:[AuthGuard]  
  }
];

@NgModule({
  declarations: [RawDataCollectionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class RawDataCollectionModule { }
