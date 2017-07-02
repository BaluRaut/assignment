import server from './localServer';
var localRequest = {
    post(endpoint, data, callback) {
        setTimeout(() => {
            switch (endpoint) {
                case '/login':
                    server.login(data.username, data.password, callback);
                    break;
                case '/logout':
                    server.logout(callback);
                    break;
                default:
                    break;
            }
        }, (Math.random() * 2000) + 100);
    }
}
module.exports = localRequest;