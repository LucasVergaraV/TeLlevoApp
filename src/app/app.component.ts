import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from './services/db.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Perfil', url: '/perfil', icon: 'person' },
  ];
  public labels = [];
  constructor(
    private dbService: DbService,
    private router: Router) {
  }

  cerrarSesion(){
    localStorage.removeItem('ingresado')
    this.router.navigate(['/login']);
  }
}
