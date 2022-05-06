import { EmailValidator } from "@angular/forms";

export interface Reportes {
  id: number;
  tipo: string;
  direccion: string;
  correo: EmailValidator;
  latitud: number;
  longitud: number;
  descripcion: String;
  urlImage: string;
}

export interface Markers{
  position: {
    lat: number;
    lng: number
  };
  title: string;
}

export interface CoorInfo {
  country: string;
  city: string;
  marker: Markers;
}

export interface photo {
  filepath: string;
  webviewPath: string;
}

