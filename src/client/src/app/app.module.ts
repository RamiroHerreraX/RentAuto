import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutosComponent } from './component/autos/autos.component';
import { CiudadComponent } from './component/ciudad/ciudad.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { AdminSucursalesComponent } from './component/admin-sucursales/admin-sucursales.component';
import { ModelosComponent } from './component/modelos/modelos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CiudadComponent,
    HomeComponent,
    AutosComponent,
    AdminSucursalesComponent,
    ModelosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
