import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './models/post.model';

@Injectable()
export class DataService {
  ROOT_URL = 'http://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(`${this.ROOT_URL}/posts`);
  }
}
