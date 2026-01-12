import { inject, Injectable, signal } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, finalize, map, retry, tap, throwError, timeout } from 'rxjs';
import { Errors } from './errors';
import {PostInterface} from '../_interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);
  private errors = inject(Errors);
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  private _posts = signal<PostInterface[]>([]);
  readonly posts = this._posts.asReadonly();

  private _error = signal<string | null>(null);
  readonly error = this._error.asReadonly();

  private transformPosts(data: any): PostInterface {
    return {
      id: data.id,
      title: data.title,
      body: data.body
    };
  }

  getPosts() {
    // Reset de l'erreur au début de l'appel
    this._error.set(null);

    return this.http.get<any[]>(this.apiUrl).pipe(
      timeout(5000),
      retry(2),
      map(data => data.map(item => this.transformPosts(item))),
      tap(transformedData => {
        this._posts.set(transformedData);
      }),
      catchError((err:HttpErrorResponse) => {
        const errorMessage = this.errors.handleHttpError(err);
        this._error.set(errorMessage);
        return throwError(() => err);
      }),
      finalize(() => {
        console.log('Fetching posts sequence completed.');
      })
    );
  }
}
