import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { SearchComponent } from './search/search.component';
import { TableComponent } from './table/table.component';
import { SearchServiceService } from "./search-service.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LocalStorageService } from "./local-storage.service";
import {RemakeInterceptor} from "./remake.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,
    SecondPageComponent,
    SearchComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    SearchServiceService,
    LocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RemakeInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
