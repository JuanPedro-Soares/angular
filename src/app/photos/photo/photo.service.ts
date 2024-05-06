import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photos } from 'src/app/photo.interface';

const API = 'https://5324-200-17-32-208.ngrok-free.app/Usuario/';
const Key = ''; 

@Injectable({ providedIn: 'root' })
export class PhotoService {
  constructor(private http: HttpClient) { }
  url = `${API}`; 
  KEY = `${Key}`;
  
  // Combine httpOptions and params for listFromUserPaginated
  createOptions(nome: string, page: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '1',
      }),
     params: new HttpParams().append('page', page.toString()),
    }; 
    return httpOptions;
  }

  listFromUser(nome: string) {
    return this.http.get<Photos[]>(`${this.url}${nome}/fotos`,this.createOptions(nome, 1));
  }

  listFromUserPaginated(nome: string, page: number) {
    const options = this.createOptions(nome, page);
    return this.http.get<Photos[]>(`${this.url}${nome}/fotos`, options);
  }
}