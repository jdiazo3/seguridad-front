import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mensaje, NewMensaje } from '../interfaces/mensaje.interface';
import { Observable, catchError, interval, switchMap, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class MensajeserviceService {
  apiUrl = 'http://localhost:8086/sensores';
  constructor(private http: HttpClient) { }

   //trae los actores y productores
  getMensaje(): Observable<Mensaje[]> {
    return interval(2000).pipe(
      switchMap(() => this.http.get<Mensaje[]>(this.apiUrl+"/sensorOn")),
      catchError((err: HttpErrorResponse) => this.errorMensaje(err))
    );
  }
  getHistorial(): Observable<Mensaje[]> {
    return interval(2000).pipe(
      switchMap(() => this.http.get<Mensaje[]>(this.apiUrl+"/historial")),
      catchError((err: HttpErrorResponse) => this.errorMensaje(err))
    );
  }

//captura los errores
errorMensaje(error: HttpErrorResponse): Observable<never>  {
  if (error.status == HttpStatusCode.PreconditionFailed){
    return throwError('El username ya esta registrado');
  }
  if (error.status == HttpStatusCode.Forbidden)
    return throwError('La persona que lo referencio no esta registrada');
  if (error.status == HttpStatusCode.NotFound)
    return throwError('no existen mensajes');
  if (error.status == HttpStatusCode.InternalServerError)
    return throwError('Error en el servidor.');
  return throwError('Un error inesperado ha ocurrido.');
}
}
