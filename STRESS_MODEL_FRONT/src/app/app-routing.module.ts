import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PruebaComponent} from './prueba/prueba.component';
import { LoginComponent} from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { Encuesta1Component } from './encuesta1/encuesta1.component';
import { Encuesta2Component } from './encuesta2/encuesta2.component';
import { Encuesta3Component } from './encuesta3/encuesta3.component';
import { Encuesta4Component } from './encuesta4/encuesta4.component';
import { Encuesta5Component } from './encuesta5/encuesta5.component';
import { Encuesta6Component } from './encuesta6/encuesta6.component';
import { Encuesta7Component } from './encuesta7/encuesta7.component';
import { Encuesta8Component } from './encuesta8/encuesta8.component';
import { Encuesta9Component } from './encuesta9/encuesta9.component';
import { Encuesta10Component } from './encuesta10/encuesta10.component';
import { AdminComponent } from './admin/admin.component';
import { SugerenciasComponent } from './sugerencias/sugerencias.component';
import { RecomendacionesComponent } from './recomendaciones/recomendaciones.component';
import { Encuesta11Component } from './encuesta11/encuesta11.component';


const routes: Routes = [
  {path: "Login", component: LoginComponent},
  {path: "Registro", component: RegistroComponent},
  {path: "Encuesta1", component: Encuesta1Component},
  {path: "Encuesta2", component: Encuesta2Component},
  {path: "Encuesta3", component: Encuesta3Component},
  {path: "Encuesta4", component: Encuesta4Component},
  {path: "Encuesta5", component: Encuesta5Component},
  {path: "Encuesta6", component: Encuesta6Component},
  {path: "Encuesta7", component: Encuesta7Component},
  {path: "Encuesta8", component: Encuesta8Component},
  {path: "Encuesta9", component: Encuesta9Component},
  {path: "Encuesta10", component: Encuesta10Component},
  {path: "Prueba", component: PruebaComponent},
  {path: "Administrador", component: AdminComponent},
  {path: "Sugerencias", component: SugerenciasComponent},
  {path: "Recomendaciones", component: RecomendacionesComponent},
  {path: "Encuesta11", component: Encuesta11Component},
  {path: "**", component: LoginComponent}

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingCompnents = [
  RegistroComponent, Encuesta10Component, Encuesta1Component,
  Encuesta2Component, Encuesta3Component, Encuesta4Component,
  Encuesta5Component, Encuesta6Component, Encuesta7Component,
  Encuesta8Component, Encuesta9Component, LoginComponent,
   PruebaComponent, AdminComponent, SugerenciasComponent,
    RecomendacionesComponent, Encuesta11Component] 