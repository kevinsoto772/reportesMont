import { EmailValidator } from "@angular/forms";

export interface NewsResponse {
  status:       string;
  totalResults: number;
  reports: Reportes[]
}
export interface Reports {
  id: number;
  type: string;
  user_document
  address: string;
  reference: string,
  email: EmailValidator;
  latitude: number;
  longitude: number;
  description: string;
  Images:Text;
}

export interface Reportes {
  id: number;
  tipo: number;
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


