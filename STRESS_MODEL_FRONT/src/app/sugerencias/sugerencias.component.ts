import { Component, OnInit} from '@angular/core';
import { Encuesta11Service } from '../services/encuesta11.service';


@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.css']
})
export class SugerenciasComponent implements OnInit {
public data : any = '';
public load : boolean = false;

  public ChartLabels: any[];
  public ChartData: any[];
  public ChartType: string;

  constructor(
    public _en11: Encuesta11Service
  ) {
//onsole.log(this._en11.encuesta);
this.data = this._en11.encuesta;
console.log(this.data);
    
   }

  ngOnInit(): void {
    setTimeout(() =>{
this.load = true;

    }, 6000)
  }



}

