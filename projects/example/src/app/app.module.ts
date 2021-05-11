import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MiaAuthModule } from 'projects/agencycoda/mia-auth/src/lib/mia-auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MiaAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
