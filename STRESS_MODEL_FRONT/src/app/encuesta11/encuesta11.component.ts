import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Encuesta11Service } from '../services/encuesta11.service';

@Component({
  selector: 'app-encuesta11',
  templateUrl: './encuesta11.component.html',
  styleUrls: ['./encuesta11.component.css']
})
export class Encuesta11Component implements OnInit {
public elementos: any = ' ';
  constructor(
    public _en11: Encuesta11Service,
    public _api: ApiService
  ) { }

  ngOnInit() {
  }
  encuesta11(valor: any) {
    this._api.encuesta11(valor).subscribe((data: any) => {
      this._en11.encuesta = data;
      this.elementos = data;
      console.log("lo que se guarda en encuesta", this._en11.encuesta);
      console.log("Hola", this.elementos);
    });
  }
}
