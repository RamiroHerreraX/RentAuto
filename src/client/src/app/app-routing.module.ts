import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutosComponent } from './component/autos/autos.component';
import { CiudadComponent } from './component/ciudad/ciudad.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : '/home',
    pathMatch : 'full'
  },
  {
    path : 'home',
    component : HomeComponent
  },
  {
    path : 'ubicaciones',
    component : CiudadComponent
  },
  {
    path : 'autos',
    component : AutosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
