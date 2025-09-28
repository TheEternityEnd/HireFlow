// auth.js
class AuthManager {
  constructor() {
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.initAuthListeners();
  }

  initAuthListeners() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('Usuario autenticado:', user.email);
        this.updateUIForAuthenticatedUser(user);
      } else {
        console.log('Usuario no autenticado');
        this.updateUIForUnauthenticatedUser();
      }
    });
  }

  // Registro con email y contraseña
  async signUpWithEmail(email, password, additionalData = {}) {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Guardar información adicional del usuario en Firestore
      await this.db.collection('users').doc(user.uid).set({
        email: user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        ...additionalData
      });

      return { success: true, user };
    } catch (error) {
      console.error('Error en registro:', error);
      return { success: false, error: this.translateError(error) };
    }
  }

  // Inicio de sesión con email y contraseña
  async signInWithEmail(email, password) {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Error en inicio de sesión:', error);
      return { success: false, error: this.translateError(error) };
    }
  }

  // Inicio de sesión con Google
  async signInWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await this.auth.signInWithPopup(provider);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Error en inicio de sesión con Google:', error);
      return { success: false, error: this.translateError(error) };
    }
  }

  // Inicio de sesión con Microsoft
  async signInWithMicrosoft() {
    try {
      const provider = new firebase.auth.OAuthProvider('microsoft.com');
      const userCredential = await this.auth.signInWithPopup(provider);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Error en inicio de sesión con Microsoft:', error);
      return { success: false, error: this.translateError(error) };
    }
  }

  // Inicio de sesión con Apple
  async signInWithApple() {
    try {
      const provider = new firebase.auth.OAuthProvider('apple.com');
      const userCredential = await this.auth.signInWithPopup(provider);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Error en inicio de sesión con Apple:', error);
      return { success: false, error: this.translateError(error) };
    }
  }

  // Cerrar sesión
  async signOut() {
    try {
      await this.auth.signOut();
      return { success: true };
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      return { success: false, error: error.message };
    }
  }

  // Restablecer contraseña
  async resetPassword(email) {
    try {
      await this.auth.sendPasswordResetEmail(email);
      return { success: true };
    } catch (error) {
      console.error('Error al restablecer contraseña:', error);
      return { success: false, error: this.translateError(error) };
    }
  }

  // Traducir errores de Firebase a español
  translateError(error) {
    const errorMessages = {
      'auth/email-already-in-use': 'Este correo electrónico ya está en uso.',
      'auth/invalid-email': 'El correo electrónico no es válido.',
      'auth/operation-not-allowed': 'Esta operación no está permitida.',
      'auth/weak-password': 'La contraseña es demasiado débil.',
      'auth/user-disabled': 'Esta cuenta ha sido deshabilitada.',
      'auth/user-not-found': 'No existe una cuenta con este correo electrónico.',
      'auth/wrong-password': 'La contraseña es incorrecta.',
      'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde.',
      'auth/popup-closed-by-user': 'La ventana de autenticación fue cerrada.'
    };

    return errorMessages[error.code] || error.message;
  }

  updateUIForUnauthenticatedUser() {
    // Actualizar la UI cuando el usuario no está autenticado
    const loginLinks = document.querySelectorAll('a[href*="login"], a[href*="signup"]');
    loginLinks.forEach(link => {
      link.style.display = 'inline';
    });
  }

  async checkAuth() {
    return new Promise((resolve) => {
        this.auth.onAuthStateChanged((user) => {
            if (user) {
                // Usuario autenticado - guardar en localStorage
                localStorage.setItem('userAuthenticated', 'true');
                localStorage.setItem('userId', user.uid);
                localStorage.setItem('userEmail', user.email);
                resolve({ success: true, user });
            } else {
                // Usuario no autenticado - limpiar localStorage
                localStorage.removeItem('userAuthenticated');
                localStorage.removeItem('userId');
                localStorage.removeItem('userEmail');
                resolve({ success: false, user: null });
            }
        });
    });
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  // Verificar autenticación en cualquier página
  async requireAuth(redirectUrl = '../index.html') {
    const authResult = await this.checkAuth();
    
    if (!authResult.success) {
        // Redirigir al login si no está autenticado
        window.location.href = redirectUrl;
        return false;
    }
    
    return authResult.user;
  }

  async signInWithEmail(email, password) {
    try {
        const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Guardar en localStorage para persistencia
        localStorage.setItem('userAuthenticated', 'true');
        localStorage.setItem('userId', user.uid);
        localStorage.setItem('userEmail', user.email);
        
        return { success: true, user };
    } catch (error) {
        console.error('Error en inicio de sesión:', error);
        return { success: false, error: this.translateError(error) };
    }
  }

  // AGREGAR similar en los otros métodos de login (Google, Microsoft, Apple)
  async signInWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const userCredential = await this.auth.signInWithPopup(provider);
        const user = userCredential.user;
        
        localStorage.setItem('userAuthenticated', 'true');
        localStorage.setItem('userId', user.uid);
        localStorage.setItem('userEmail', user.email);
        
        return { success: true, user };
    } catch (error) {
        console.error('Error en inicio de sesión con Google:', error);
        return { success: false, error: this.translateError(error) };
    }
  }

  // auth.js - AGREGAR/ACTUALIZAR el método signOut
  async signOut() {
    try {
        await this.auth.signOut();
        
        // Limpiar localStorage completamente
        localStorage.removeItem('userAuthenticated');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userProfile');
        
        // Limpiar cualquier otra data de sesión
        const sessionKeys = Object.keys(localStorage).filter(key => 
            key.startsWith('firebase:') || key.startsWith('user')
        );
        sessionKeys.forEach(key => localStorage.removeItem(key));
        
        console.log('Sesión cerrada exitosamente');
        return { success: true };
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        return { success: false, error: error.message };
    }
  }
}

