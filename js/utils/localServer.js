import bcrypt from 'bcryptjs';
import genSalt from './salt';
const salt = bcrypt.genSaltSync(10);
let users;
let localStorage = global.window.localStorage;
var server = {
     init() {
        if (localStorage.users === undefined || !localStorage.encrypted) {
            // Set default user
            const Username = "theredpandas@theredpandas.com";
            const UsernameSalt = genSalt(Username);
            const UsernamePass = bcrypt.hashSync("theredpandas", UsernameSalt);
            users = {
                [Username]: bcrypt.hashSync(UsernamePass, salt)
            };
            localStorage.users = JSON.stringify(users);
            localStorage.encrypted = true;
        } else {
            users = JSON.parse(localStorage.users);
        }
    },
    login(username, password, callback) {
        const userExists = this.doesUserExist(username);
        // If the user exists and the password fits log the user in
        if (userExists && bcrypt.compareSync(password, users[username])) {
            if (callback) callback({
                authenticated: true,
                token: Math.random().toString(36).substring(7)
            });
        } else {
            if (userExists) {
                var error = {
                    type: "password-wrong"
                }
            } else {
                var error = {
                    type: "user-doesnt-exist"
                }
            }
            if (callback) callback({
                authenticated: false,
                error: error
            });
        }
    },
    logout(callback) {
      localStorage.removeItem('token');
      if (callback) callback();
    },
    doesUserExist(username) {
        return !(users[username] === undefined);
    }
}

server.init();

module.exports = server;
