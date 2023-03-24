import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessplansComponent } from './businessplans/businessplans.component';
import { LandingComponent } from './landing.component';

const routes: Routes = [
  {path:"",component:LandingComponent, children:[
    {path:"businessplans",component:BusinessplansComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
