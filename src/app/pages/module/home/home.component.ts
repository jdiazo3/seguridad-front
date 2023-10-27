import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Mensaje, NewMensaje } from 'src/app/interfaces/mensaje.interface';
import { roles } from 'src/app/interfaces/usuario.interface';
import { MensajeserviceService } from 'src/app/services/mensajeservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('chatDivElement') chatDivElement: ElementRef;
  messages!: Mensaje[];
  roles !: roles;
  entrada1="";
  entrada2="";
  salida="";


  constructor(private router: Router,
    private mensajeService: MensajeserviceService
  ) {
    this.entrada1="verde";
    this.entrada2="verde";
    this.salida="verde";
  }
  ngOnInit(): void {
    this.sensores();
  }

  sensores() {
    this.mensajeService.getMensaje()
      .subscribe(date => {

        for (let m of date) {
          if(m.sensor==1){
            this.entrada1="rojo";
          }
          if(m.sensor==2){
            this.entrada2="rojo";
          }
          if(m.sensor==3){
            this.salida="rojo";
          }
        }
        setTimeout(() => {
          this.entrada1="verde";
          this.entrada2="verde";
          this.salida="verde";
        }, 2000);
    });

  }

}
