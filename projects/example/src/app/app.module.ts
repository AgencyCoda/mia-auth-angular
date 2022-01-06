import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MiaAuthModule } from 'projects/agencycoda/mia-auth/src/lib/mia-auth.module';
import { MiaCoreModule, MIA_CORE_PROVIDER } from '@agencycoda/mia-core';
import { MIA_AUTH_PROVIDER } from 'projects/agencycoda/mia-auth/src/public-api';

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
      provide: MIA_CORE_PROVIDER, 
      useValue: {
        baseUrl: 'http://34.151.195.34/',
        v2: true
      }
    },
    { 
      provide: MIA_AUTH_PROVIDER, 
      useValue: {
        baseUrl: 'http://34.151.195.34/'
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
