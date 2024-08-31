import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { provideToastr } from 'ngx-toastr'
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

function HttpLoaderFactory(http:HttpClient)
{
  return new TranslateHttpLoader(http , './assets/i18n/' , '.json' )
}

export const appConfig: ApplicationConfig = {
  
  providers: [provideRouter(routes), provideClientHydration(),   provideToastr(), provideAnimations(),importProvidersFrom(HttpClient, HttpClientModule, BrowserAnimationsModule),
    
  ]
  
};
