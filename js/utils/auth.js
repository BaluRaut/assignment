import request from './localRequest';
var auth = {
        login(username, password, callback) {
        if (this.loggedIn()) {
            callback(true);
            return;
        }
        // Post a fake request (see below)
        request.post('/login', { username, password }, (response) => {
            // If the user was authenticated successfully, save a random token to the
            // localStorage
            if (response.authenticated) {
                localStorage.token = response.token;
                callback(true);
            } else {
                // If there was a problem authenticating the user, show an error on the
                // form
                callback(false, response.error);
            }
        });
    },
    /**
     * Logs the current user out
     */
    logout(callback) {
      console.log(callback);
      console.log("callback logout");
        request.post('/logout', {}, () => {
            callback(true);
        });
    },
    /**
     * Checks if anybody is logged in
     * @return {boolean} True if there is a logged in user, false if there isn't
     */
    loggedIn() {
        return !!localStorage.token;
    },
    onChange() {}
}

module.exports = auth;
