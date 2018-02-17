class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userName',data.user.name);
    localStorage.setItem('userEmail',data.user.email);
    localStorage.setItem('userId',data.user.id);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
    // setTimeout(100);
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    setTimeout(100);
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return localStorage.getItem('token');
  }

  static getUserName() {
    return localStorage.getItem('userName');
  }

  static getUserEmail() {
    return localStorage.getItem('userEmail');
  }

  static getUserId() {
    return localStorage.getItem('userId');
  }
}

export default Auth;