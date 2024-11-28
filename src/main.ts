import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideNgxMask } from 'ngx-mask';
import { AuthInterceptor } from './app/auth/auth.interceptor';
import { AuthService } from './app/services/auth.service';
import { APP_INITIALIZER } from '@angular/core';
import { Observable } from 'rxjs';

export function initializeAuth(authService: AuthService) {
  return (): Observable<void> => authService.loadToken();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideNgxMask(),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // Garante que o interceptor seja chamado em todas as requisições
    },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeAuth,
    //   deps: [AuthService],
    //   multi: true,
    // },
  ],
});
