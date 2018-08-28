import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DataService } from './data.service';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        HttpClient,
        HttpHandler,
        { provide: SESSION_STORAGE, useValue: {} },]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});
