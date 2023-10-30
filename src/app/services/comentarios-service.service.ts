import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComentariosServiceService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  endPoint = "http://localhost:8080/comentarios";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.endPoint);
  }

  addComentario(newComment: any): Observable<any> {
    return this.httpClient.post(this.endPoint, newComment, this.httpOptions).pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
  }

  deleteComentario(id: any): Observable<any> {
    const url = `${this.endPoint}/${id}`;
    return this.httpClient.delete(url, this.httpOptions);
  }

  updateComentario(id: number, updatedComment: any): Observable<any> {
    const url = `${this.endPoint}/${id}`;
    return this.httpClient.put(url, updatedComment, this.httpOptions).pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
  }
}
