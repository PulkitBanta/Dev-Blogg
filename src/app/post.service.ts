import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostRequest } from './create-post/PostRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'port_address/api/posts'

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  constructor(
    private http: HttpClient
  ) { }

  addPost(postRequest: PostRequest): Observable<any> {
    return this.http.post(this.url, postRequest, this.httpOptions);
  }

  getPosts(): Observable<Array<PostRequest>> {
    return this.http.get<Array<PostRequest>>(this.url);
  }

  getPost(id: number): Observable<PostRequest> {
    return this.http.get<PostRequest>(`${this.url}/${id}`);
  }
}