import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { LoginResponse, Registro, Encuesta, Enceusta11, logout, promedio } from '../other/interfaces';
import { RegistroService } from './registro.service';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _http: HttpClient
  ) { }

  api_url: string = 'http://backend-escenario2.rhos-cc-mx-368027-2db74476dfddf70d0d5ba71d5eb9bfda-0001.us-south.containers.appdomain.cloud'
  // api_url: string = 'http://backestres-stress-model.rhos-cc-mx-368027-2db74476dfddf70d0d5ba71d5eb9bfda-0001.us-south.containers.appdomain.cloud/'

  login(user: string, password: string): Observable<LoginResponse> {
    //console.log('HOLA MAUS');
    let formData: FormData = new FormData();
    formData.append('fname', user);
    formData.append('lname', password);

    console.log("hice login", this.api_url)

    return this._http.post<LoginResponse>(`${this.api_url}/inicio`, formData);

  }


  registro(nombre: string, sector: string, correo: string, correo2: string, password1: string, password2: string): Observable<Registro> {

    let FormData1: FormData = new FormData();
    FormData1.append('nom', nombre);
    FormData1.append('sec', sector);
    FormData1.append('mail', correo);
    FormData1.append('mail2', correo2);
    FormData1.append('pass', password1);
    FormData1.append('pass2', password2);

    return this._http.post<Registro>(`${this.api_url}/summit`, FormData1);

  }
encuesta(numero: string, respuesta: any): Observable<Encuesta> {
  let FormData2: FormData = new FormData();
  FormData2.append('num', numero);
  FormData2.append('resp', respuesta);


  return this._http.post<Encuesta>(`${this.api_url}/Encuesta1`, FormData2);

}
encuesta11(valor: any): Observable<Enceusta11>{
let FormData4: FormData= new FormData();
FormData4.append('texto', valor);

  return this._http.post<Enceusta11>(`${this.api_url}/inyeccion`, FormData4);

}

  logout(): Observable<logout> {
    let FormData5: FormData = new FormData();
    return this._http.post<logout>(`${this.api_url}/loogout`, FormData5);

  }

  promedio(): Observable<promedio> {
    let FormData6: FormData = new FormData();
    return this._http.post<promedio>(`${this.api_url}/promdep`, FormData6);

  }
 

}
