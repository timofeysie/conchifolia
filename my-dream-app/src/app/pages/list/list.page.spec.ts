import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ListPage } from './list.page';
import { RouterModule, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

describe('ListPage', () => {
  let component: ListPage;
  let fixture: ComponentFixture<ListPage>;
  const fakeActivatedRoute = {  
    snapshot: { data: { } }
  } as ActivatedRoute;
  let mockRouter:any;
    class MockRouter {
        //noinspection TypeScriptUnresolvedFunction
        navigate = jasmine.createSpy('navigate');
    }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: SESSION_STORAGE, useValue: {} },
        HttpClient,
        HttpHandler,
        RouterModule,
        DataService
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
