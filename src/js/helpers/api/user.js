import { unload as unloadConfig } from '#helpers/api/config';
import { postApi, getApi } from '#helpers/api/main';

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
    return postApi('/signin', { email, password }).then((response) => {
        localStorage.setItem('token', response.token);
        return response;
    });
}

/**
 * Renews the access token for a few more time
 *
 * @returns {Promise}
 */
export function refreshToken() {
    return getApi('/refreshToken').then((response) => {
        localStorage.setItem('token', response.token);
    });
}

/**
 * Logs the user out
 *
 * Basically, all we have to do is remove the token from local storage.
 */
export function logout() {
    unloadConfig();
    localStorage.removeItem('token');
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
    return localStorage.getItem('token') !== null;
}

/**
 * Returns the access token of the current session (if any)
 *
 * @returns {string|null}
 */
export function getToken() {
    return localStorage.getItem('token');
}

/**
 * Sends a sign-up request with the given credentials
 *
 * @param {string} email
 * @param {string} description
 *
 * @returns {Promise}
 */
export function signup(email, description) {
    return new Promise((success, failure) => {
        setTimeout(() => {
            if (email !== '' && description !== '') {
                success();
            } else {
                failure({
                    user_message: 'Données incorrectes !',
                    details: {
                        email: 'Ce champ est obligatoire',
                        description: 'Ce champ est obligatoire',
                    },
                });
            }
        }, 1000);
    });
}