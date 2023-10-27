import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mensaje, NewMensaje } from 'src/app/interfaces/mensaje.interface';
import { MensajeserviceService } from 'src/app/services/mensajeservice.service';

@Component({
  selector: 'app-biblio',
  templateUrl: './biblio.component.html',
  styleUrls: ['./biblio.component.css']
})
export class BiblioComponent implements OnInit{
  mensaje !: NewMensaje[];

  constructor(private router: Router,
    private mensajeService: MensajeserviceService
  ) {
  }
  ngOnInit(): void {
    this.historial();
  }
  historial() {
    this.mensajeService.getHistorial()
      .subscribe(date => {

        for (let m of date) {
          if(m.sensor==1){
            m.puerta= "Entrada1";
          }
          if(m.sensor==2){
            m.puerta= "Entrada2";
          }
          if(m.sensor==3){
            m.puerta= "Salida";
          }
        }
        this.mensaje=date;
        console.log("se activaron los siguientes sensores:");
        console.log(date);
    });
  }
}
