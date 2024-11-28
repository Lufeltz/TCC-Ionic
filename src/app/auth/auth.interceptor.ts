import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    // Log para ver se o token foi encontrado
    

    if (token) {
      // Clona a requisição para adicionar o cabeçalho de autorização
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log para ver a requisição clonada com o cabeçalho Authorization
      
      
      return next.handle(clonedRequest);
    }

    // Se não tiver token, apenas passa a requisição original
    
    return next.handle(request);
  }
}
