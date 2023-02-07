export class createNewUser {
  public name: string;
  public last_name: string;
  public document: string;
  public document_type: string;
  public email: string;
  public phone: string;
  public password: string;

  public constructor(name: string, last_name: string, document: string, document_type: string, phone: string, email: string, password: string) {
    this.name = name
    this.last_name = last_name
    this.document = document
    this.document_type = document_type
    this.email = email
    this.phone = phone
    this.password = password
}
}