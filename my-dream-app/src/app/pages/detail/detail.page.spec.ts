import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DetailPage } from './detail.page';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BackendApiService } from '../../services/backend-api.service';
import { Observable, from } from 'rxjs';

describe('DetailPage', () => {
  const fakeActivatedRoute = {  
    snapshot: { data: { } }
  } as ActivatedRoute;

  let component: DetailPage;
  let fixture: ComponentFixture<DetailPage>;
  let observableFromPromise = Observable.create;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ActivatedRoute,
          useValue: { 'paramMap': observableFromPromise([{ 'id': '1'}]) } },
        HttpClient,
        HttpHandler,
        BackendApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit()
    tick()
    fixture.detectChanges()
    expect(component).toBeTruthy();
  });
});
