import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostRequest } from './create-post/PostRequest';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'port_address/api/posts'
  currentUser = this.localStorageService.retrieve('username')

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
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
}