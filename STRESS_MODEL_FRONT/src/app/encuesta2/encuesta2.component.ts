import { Component, OnInit } from '@angular/core';
import { EncuestaService } from '../services/encuesta.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-encuesta2',
  templateUrl: './encuesta2.component.html',
  styleUrls: ['./encuesta2.component.css']
})
export class Encuesta2Component implements OnInit {
  templateForm(value: any) {
    
  }
  constructor(
    private _en: EncuestaService,
    private _api:ApiService
  ) { }

  ngOnInit() {
  }

  encuesta(numero: string, value: any) {
    numero = "2";
    value = JSON.stringify(value);
    //respuesta="8";
    this._api.encuesta(numero, value).subscribe(data => {
      this._en.en = data.en
      console.log("Hola", this._en.en)
    });
  }


}
