import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../services/registro.service';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  signupForm: FormGroup
  chart = [];
  constructor(

    private _builder: FormBuilder,
    private _user: UserService, 
    private _registro: RegistroService,
    private _api: ApiService
  ) { }

  enviar(values){
console.log(values)

}


  ngOnInit() {}


  registro (nombre: string, sector:string , correo: string, correo2: string, password1: string, password2: string ){
    
    this._api.registro(nombre, sector, correo, correo2, password1 ,password2).subscribe( data =>{
      this._registro.reg = data.reg
      console.log("HOLA MAU MOROCHA", this._registro.reg)
    });

  }

}
