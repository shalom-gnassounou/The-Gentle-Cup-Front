import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Récupérer le token depuis localStorage
  const token = localStorage.getItem('token');
  
  // Si un token existe, on clone la requête et on ajoute le header Authorization
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  // Continuer la requête
  return next(req);
};