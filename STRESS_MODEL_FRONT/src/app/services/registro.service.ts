import { Injectable } from '@angular/core';
import { Registro } from '../other/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor() { }

  reg: Registro;
  
}
