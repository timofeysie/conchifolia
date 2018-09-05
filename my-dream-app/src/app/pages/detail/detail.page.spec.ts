import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DetailPage } from './detail.page';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BackendApiService } from '../../services/backend-api.service';
import { Observable, from, of } from 'rxjs';
import { ActivatedRouteStub } from './ActivatedRouteStub';
//import { ValueService } from 'jasmine';

describe('DetailPage', () => {

  let component: DetailPage;
  let fixture: ComponentFixture<DetailPage>;
  let observableFromPromise = Observable.create;
//  let service: ValueService;

  beforeEach(async(() => {
    // The TestBed emulates @NgModule.
    TestBed.configureTestingModule({
      declarations: [ DetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: ActivatedRouteStub },
        HttpClient,
        HttpHandler,
        BackendApiService]
    })
    .compileComponents();
  }));
  // @NgModule({
  //   imports: [
  //     CommonModule,
  //     SharedModule,
  //     RouterModule.forChild(routes)
  //   ],
  //   declarations: [DetailPage]
  // })x

  beforeEach(() => {
    //activatedRoute.setParamMap({ id: expectedHero.id });
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
