import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Encuesta11Service } from '../services/encuesta11.service';
import { LoginResponse, Registro, Encuesta, Enceusta11 } from '../other/interfaces';
import { PromedioService } from '../services/promedio.service';
import {Chart} from 'chart.js'
 
@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent implements OnInit {
  public prom: any = "";
  public rest: any = "";
  public ChartLabels: any [];
  public ChartData:any[];
  public ChartType:string;
  

  constructor(
    public _promedio: PromedioService
  )
   { 
   
 }
  ngOnInit() {
    console.log("antes", this._promedio.promedio)
    this.prom = Number(this._promedio.promedio)
    console.log("despues", this.prom)
    //incio de chart circulo 
    
this.rest= 10 - this.prom;
   this.ChartLabels = ['Promedio','Area de Mejora'];
   this.ChartData = [this.prom, this.rest];
   this.ChartType = 'doughnut';
  }
  
}
