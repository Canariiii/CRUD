import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private user: any[] = [];

  endPoint = "http://localhost:8080/usuarios";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.endPoint);
  }

  addUser(user: any): Observable<any> {
    console.log("añadido usuario:", user);
    return this.httpClient.post(this.endPoint, user, httpOptions);
  }

  updateUser(user: any, id: number): Observable<any> {
    const url = `${this.endPoint}/${id}`;
    return this.httpClient.put(url, user, httpOptions);
  }

  deleteUser(id: any): Observable<any> {
    const url = `${this.endPoint}/${id}`;
    return this.httpClient.delete(url, httpOptions);
  }
}
