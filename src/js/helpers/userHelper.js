/**
 * Sends a login request for the given user
 *
 * Please note that in case of success, a JWT token is stored in the local storage,
 * which is the only way we have to detect wether the current user is logged in
 * or not.
 * @see isLoggedIn()
 *
 * @param {string} email
 * @param {string} password
 *
 * @returns {Promise}
 */
export function login(email, password) {
    return new Promise((success, failure) => {
        if (email === 'anis@beta.gouv.fr' && password === 'test') {
            localStorage.setItem('auth_token', email);
            success();
        } else {
            failure({
                user_message: 'Identifiants incorrects',
            });
        }
    });
}

/**
 * Logs the user out
 *
 * Basically, all we have to do is remove the token from local storage.
 */
export function logout() {
    localStorage.removeItem('auth_token');
}

/**
 * Checks if the current user is logged in or not
 *
 * This check is only based on the existence of an 'auth_token' entry in the local storage,
 * NOT on its validity.
 * This should not cause safety issues as the backend should always validate that token before
 * accepting any requests.
 *
 * @returns {boolean}
 */
export function isLoggedIn() {
    return localStorage.getItem('auth_token') !== null;
}

/**
 * This a navigation before-enter guard that ensures the current user is logged-in
 *
 * If the user is logged-in, perform the routing as requested.
 * Redirect to the home, otherwise.
 *
 * Please @see https://router.vuejs.org/guide/advanced/navigation-guards.html#per-route-guard
 * for more information about VueJS navigation guards.
 *
 * @param {Route}    to   The target Route Object being navigated to
 * @param {Route}    from The current route being navigated away from
 * @param {Function} next Resolver
 */
export function checkLogin(to, from, next) {
    if (isLoggedIn() === true) {
        next();
    } else {
        next('/');
    }
}