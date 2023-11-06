import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-mi-viaje',
  templateUrl: './mi-viaje.page.html',
  styleUrls: ['./mi-viaje.page.scss'],
})
export class MiViajePage implements OnInit {
miViaje:any;

  constructor(private router: Router, private activeroute: ActivatedRoute,public toastController: ToastController) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.miViaje = this.router.getCurrentNavigation()?.extras.state?.['viaje'];
        console.log(this.miViaje)
      }
    });
  }

  volver(){
    this.router.navigate(['/crear-viaje']);
  }

  async presentToast(msg: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 2000
    });
    toast.present();
  }

  ngOnInit() {
  }

}
