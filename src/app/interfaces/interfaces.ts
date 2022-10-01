import { EmailValidator } from "@angular/forms";

export interface NewsResponse {
  status:       string;
  totalResults: number;
  reports: Reportes[]
}
export interface Reportes {
  id: number;
  tipo: string;
  direccion: string;
  referencia: string,
  correo: EmailValidator;
  latitud: number;
  longitud: number;
  descripcion: string;
  urlImage: string;
}
export interface photo {
  path?: string;
  webPath?: string;
}
export interface LocalFile{
  name: string,
  path: string,
  data: string
}

export interface ReportByTypeAndPage{
  [key: string]: {
    page: number,
    reports: Reportes[]
  }
}


