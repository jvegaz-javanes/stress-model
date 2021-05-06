import { Injectable } from '@angular/core';
import { promedio } from '../other/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PromedioService {

  constructor() { }

  promedio: promedio
}
