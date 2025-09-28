class AuthMiddleware {
    static async protectPage(redirectUrl = '../index.html') {
        const authManager = new AuthManager();
        try {
            const user = await authManager.requireAuth(redirectUrl);
            return user;
        } catch (error) {
            console.error('Authentication failed:', error);
            window.location.href = redirectUrl;
            return null;
        }
    }

    static getCurrentUserInfo() {
        return {
            isAuthenticated: localStorage.getItem('userAuthenticated') === 'true',
            userId: localStorage.getItem('userId'),
            userEmail: localStorage.getItem('userEmail')
        };
    }
}