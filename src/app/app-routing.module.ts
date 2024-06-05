import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren:()=>import('./pages/landing-page/landing-page.module')
    .then(mod=>mod.LandingPageModule)
  },
  {
    path: 'data-pruning',
    loadChildren:()=>import('./pages/data-pruning/data-pruning.module')
    .then(mod=>mod.DataPruningModule)
  },
  {
    path: 'data-wrangling',
    loadChildren:()=>import('./pages/data-wrangling/data-wrangling.module')
    .then(mod=>mod.DataWranglingModule)
  },
  {
    path: 'data-collection',
    loadChildren:()=>import('./pages/raw-data-collection/raw-data-collection.module')
    .then(mod=>mod.RawDataCollectionModule)
  },
  {
    path: 'survival-analysis',
    loadChildren:()=>import('./pages/survival-analysis/survival-analysis.module')
    .then(mod=>mod.SurvivalAnalysisModule)
  },
  {
    path: 'survival-model',
    loadChildren:()=>import('./pages/survival-model/survival-model.module')
    .then(mod=>mod.SurvivalModelModule)
  },
  {
    path: 'landing',
    loadChildren:()=>import('./pages/landing-page/landing-page.module')
    .then(mod=>mod.LandingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  //providers: [AuthGuard],
})
export class AppRoutingModule {}
