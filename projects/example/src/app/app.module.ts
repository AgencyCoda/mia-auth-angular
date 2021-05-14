import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MiaAuthModule } from 'projects/agencycoda/mia-auth/src/lib/mia-auth.module';
import { MIA_AUTH_PROVIDER } from '@agencycoda/mia-auth';
import { MiaCoreModule } from '@agencycoda/mia-core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MiaCoreModule,
    MiaAuthModule
  ],
  providers: [
    { 
      provide: MIA_AUTH_PROVIDER, 
      useValue: {
        baseUrl: 'http://localhost:8080/'
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
