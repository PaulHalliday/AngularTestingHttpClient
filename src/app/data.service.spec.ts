import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { DataService } from './data.service';
import { Post } from './models/post.model';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });

    service = TestBed.get(DataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve posts from the API via GET', () => {
    const dummyPosts: Post[] = [
      { userId: '1', id: 1, body: 'Hello World', title: 'Testing Angular' },
      { userId: '2', id: 2, body: 'Hello World', title: 'Testing Angular 2' },
    ];

    service.getPosts().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts);
    });

    const request = httpMock.expectOne(`${service.ROOT_URL}/posts`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyPosts);
  });
});
