import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

const fakeActivatedRoute = {  
  snapshot: { data: { } }
} as ActivatedRoute;

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [
        AppComponent,
      ],
      providers: [{provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to my-dream-app!');
  // }));
  // let fixture: ComponentFixture<LandingComponent>;
  //   beforeEach(() => {
  //       TestBed.configureTestingModule({
  //           imports: [
  //               MyModule,
  //               RouterTestingModule.withRoutes([]),
  //           ],
  //       }).compileComponents();
  //       fixture = TestBed.createComponent(MyComponent);
  //   });

    // it('should navigate', () => {
    //   const fixture = TestBed.createComponent(AppComponent);
    //     let component = fixture.componentInstance;
    //     let navigateSpy = spyOn((<any>component).router, 'navigate');

    //     //component.navigate('/');
    //     expect(navigateSpy).toHaveBeenCalledWith(['/home']);
    // });
});
