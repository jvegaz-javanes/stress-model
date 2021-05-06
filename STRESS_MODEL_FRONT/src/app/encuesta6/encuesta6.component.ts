import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { EncuestaService } from '../services/encuesta.service';

@Component({
  selector: 'app-encuesta6',
  templateUrl: './encuesta6.component.html',
  styleUrls: ['./encuesta6.component.css']
})
export class Encuesta6Component implements OnInit {
  templateForm(value: any) {
    alert(JSON.stringify(value));
  }


  constructor(
    private _en: EncuestaService,
    private _api: ApiService

  ) { }

  ngOnInit() {
  }

  encuesta(numero: string, value: any) {
    numero = "6";
    value = JSON.stringify(value);
    //respuesta="8";
    this._api.encuesta(numero, value).subscribe(data => {
      this._en.en = data.en
      console.log("Hola", this._en.en)
    });
  }
}
