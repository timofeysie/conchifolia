import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BackendApiService } from './backend-api.service';

describe('BackendApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BackendApiService,
        HttpClient,
        HttpHandler]
    });
  });

  it('should be created', inject([BackendApiService], (service: BackendApiService) => {
    expect(service).toBeTruthy();
  }));
});
