import { EmailValidator } from "@angular/forms";

export interface NewsResponse {
  status:       string;
  totalResults: number;
  reports: Report[]
}
export interface Report {
  id: number;
  type: number;
  user_document: string;
  address: string;
  reference: string,
  email: EmailValidator;
  latitude: number;
  longitude: number;
  description: string;
  images: Text;
  follows: number;
  attended: boolean;
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


