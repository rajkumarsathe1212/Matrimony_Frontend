import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path : "", component : LoginComponent},
  {path : "footer", component : FooterComponent},
  {path : 'general', loadChildren:()=>import("./general/general.module").then(m=>m.GeneralModule)},
  {path:"masters",loadChildren:()=>import("./masters/masters.module").then(m=>m.MastersModule)},
  {path:"**",component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
