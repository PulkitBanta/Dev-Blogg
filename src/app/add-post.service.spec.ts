import { TestBed } from '@angular/core/testing';

import { AddPostService } from './add-post.service';

describe('AddPostService', () => {
  let service: AddPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
