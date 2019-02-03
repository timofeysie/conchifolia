import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BackendApiService } from './services/backend-api.service';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { ListPageModule } from './pages/list/list.module';
import { StorageServiceModule } from 'angular-webstorage-service';
import { SharedModule } from './components/shared-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ListPageModule,
    StorageServiceModule,
    SharedModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [BackendApiService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
