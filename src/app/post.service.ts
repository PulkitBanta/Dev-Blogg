import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostRequest } from './PostRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'port_address/api/posts'
  currentUser = localStorage.getItem('username')

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

  getUserPosts(): Observable<Array<PostRequest>> {
    return this.http.get<Array<PostRequest>>(this.url + `/users/${this.currentUser}`);
  }

  getPost(id: number): Observable<PostRequest> {
    return this.http.get<PostRequest>(`${this.url}/${id}`);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, {responseType: 'text'});
  }

  getPostsByTag(tag: string): Observable<PostRequest> {
    return this.http.get<PostRequest>(`${this.url}/tags/${tag}`);
  }
}