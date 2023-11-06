import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  rut!:string;
  name!:string;
  lastName!:string; 
  user!:string;
  password!:string;

  constructor(private router: Router) { }



  // registrar(){
  //   this.bduserservice.guardarUsuario()
  // }
  login(){
    this.router.navigate(['/login']);
  }
  ngOnInit() {
  }

}
