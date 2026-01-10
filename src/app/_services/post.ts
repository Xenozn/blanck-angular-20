import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, finalize, map, tap, throwError} from 'rxjs';
import {PostModel} from '../_models/post';

@Injectable({
  providedIn: 'root',
})

export class PostService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';


  private _posts = signal<PostModel[]>([]);


  readonly posts = this._posts.asReadonly();


  private transformPosts(data: any): PostModel {
    return {
      id: data.id,
      title: data.title,
      body: data.body
    };
  }

  getPosts() {
    console.log('Fetching posts from API:', this.apiUrl);
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data =>{
        const transformed = data.map(item => this.transformPosts(item));
        return transformed;
      }),
      tap((data) => {
        this._posts.set(data)
      }),
      catchError((error) => {
        console.error('Error fetching posts:', error);
        console.log(`Erreur: ${error.status || 'unknown status'} - ${error.message || 'no message'}`);
        return throwError(() => error);
      }),
      finalize(() => {
        console.log('Completed fetching posts from API.');
      })
    );
  }



}
