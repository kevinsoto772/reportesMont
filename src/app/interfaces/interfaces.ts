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