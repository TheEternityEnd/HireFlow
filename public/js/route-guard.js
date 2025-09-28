// route-guard.js
class RouteGuard {
  constructor() {
    this.auth = firebase.auth();
    this.init();
  }

  init() {
    this.auth.onAuthStateChanged((user) => {
      const currentPath = window.location.pathname;
      
      // Rutas que requieren autenticación
      const protectedRoutes = ['/main.html', '/createPage.html', '/profile.html'];
      
      // Rutas públicas (cuando ya estás autenticado)
      const publicRoutesWhenAuthenticated = ['/index.html', '/signup.html'];

      const isProtectedRoute = protectedRoutes.some(route => currentPath.includes(route));
      const isPublicRouteWhenAuth = publicRoutesWhenAuthenticated.some(route => currentPath.includes(route));

      if (isProtectedRoute && !user) {
        // Redirigir a login si intenta acceder a ruta protegida sin autenticación
        window.location.href = '../index.html';
      } else if (isPublicRouteWhenAuth && user) {
        // Redirigir a main si está autenticado y trata de acceder a login/registro
        window.location.href = '../profile.html';
      }
    });
  }
}

// Inicializar el guardia de rutas
new RouteGuard();