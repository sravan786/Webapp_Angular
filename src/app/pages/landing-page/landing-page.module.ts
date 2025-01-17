import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { Router, RouterModule, Routes } from '@angular/router';

const routes : Routes=[
  {
    path:'',
    component:LandingPageComponent 
  }
];

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})

export class LandingPageModule {

}
