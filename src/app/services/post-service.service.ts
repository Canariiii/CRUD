import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  private endPoint = 'http://localhost:8080/posts';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get(this.endPoint);
  }

  addPost(newPost: any): Observable<any> {
    return this.httpClient.post(this.endPoint, newPost, this.httpOptions).pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
  }

  deletePost(id: any): Observable<any> {
    const url = `${this.endPoint}/${id}`;
    return this.httpClient.delete(url, this.httpOptions);
  }

updatePost(id: number, updatedPost: any): Observable<any> {
  const url = `${this.endPoint}/${id}`;
  return this.httpClient.put(url, updatedPost, this.httpOptions).pipe(
    catchError((error: any) => {
      console.error('An error occurred:', error);
      return throwError(error);
    })
  );
}

}
