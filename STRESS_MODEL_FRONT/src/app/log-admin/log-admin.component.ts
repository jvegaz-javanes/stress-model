import { Component, OnInit } from '@angular/core';
import { Encuesta11Service } from '../services/encuesta11.service';

@Component({
  selector: 'app-log-admin',
  templateUrl: './log-admin.component.html',
  styleUrls: ['./log-admin.component.css']
})
export class LogAdminComponent implements OnInit {
  public prom: any = "";
  public rest: any = "";
  public ChartLabels: any[];
  public ChartData: any[];
  public ChartType: string;
  
  public data: any = '';
  constructor(
    public _en11: Encuesta11Service

  ) {
    console.log(this._en11.encuesta);
    this.data = this._en11.encuesta;
    console.log(this.data);
  }

  ngOnInit(): void {
    this.ChartLabels = ['Alegria', 'Enojo', 'Miedo','Analitico','Confident','iterativo'];
    this.ChartData = [10, 2,3,10,3,2];
    this.ChartType = 'polarArea';
  }

}
