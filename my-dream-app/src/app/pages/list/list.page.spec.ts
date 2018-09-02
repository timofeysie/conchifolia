import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ListPage } from './list.page';
import { RouterModule, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { BackendApiService } from '../../services/backend-api.service';
import { DetailModel } from '../../models/detail.model';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListPage', () => {
  let component: ListPage;
  let fixture: ComponentFixture<ListPage>; 
  let backendApiServiceSpy: jasmine.SpyObj<BackendApiService>;
  const fakeActivatedRoute = {  
    snapshot: { data: { } }
  } as ActivatedRoute;
  let mockRouter:any;
    class MockRouter {
        navigate = jasmine.createSpy('navigate');
    }

    beforeEach(() => {
      backendApiServiceSpy = jasmine.createSpyObj('BackendApiService', ['getList']);
      const detail = new DetailModel();
      detail.cognitive_biasLabel = '1';
      detail.cognitive_biasDescription = '1';
      detail.wikiMedia_label = '1';
      detail.wikiMedia_description = '1';
      detail.wikiMedia_category = '1';
      detail.sortName = '1';
      detail.lang = 'en';
      detail.detailState = '1';
      detail.descriptionState = '1';
      detail.itemState = '1';
      detail.itemOrder = '1';
      detail.listSortingProperty = '1';
      detail.backupTitle = '1';
      const list = [];
      list.push(detail);
      backendApiServiceSpy.getList.and.returnValue(of(list));
    });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ ListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: BackendApiService, useValue: backendApiServiceSpy },
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

  it('should show loaded artworks', () => {
      fixture.detectChanges();
      const host: HTMLElement = fixture.nativeElement;
      expect(host.textContent).toContain('Cognitive Biases');
  });

});