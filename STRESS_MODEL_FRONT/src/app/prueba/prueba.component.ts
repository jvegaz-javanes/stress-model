import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { logout } from '../other/interfaces';
import { LogoutService } from '../services/logout.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  constructor(

    public _api: ApiService,
    public _log: LogoutService

  ) { }

  ngOnInit() {
  }

  logout() {

    this._api.logout().subscribe(data => {
      this._log.afuera = data
      console.log("HOLA MAU MOROCHA", this._log.afuera)
    });

  }

}
