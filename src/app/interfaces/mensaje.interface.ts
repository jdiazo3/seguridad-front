export interface Mensaje{
    id : number;
    mensaje : number;
    puerta : string;
    sensor : number;
    fecha : Date;
    leido : boolean;
  }

  export class NewMensaje{
    id !: number;
    mensaje !: number;
    puerta !: string;
    sensor !: number;
    fecha !: Date;
    leido !: boolean;
  }