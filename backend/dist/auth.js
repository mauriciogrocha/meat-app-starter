"use strict";
exports.__esModule = true;
exports.handleAuthentication = void 0;
var user_1 = require("./user");
var jwt = require("jsonwebtoken");
var api_config_1 = require("./api-config");
var handleAuthentication = function (req, resp) {
    var user = req.body;
    if (isValid(user)) {
        var dbUser = user_1.users[user.email];
        var token = jwt.sign({ sub: dbUser.email, iss: 'meat-api' }, api_config_1.apiConfig.secret);
        resp.json({ name: dbUser.name, email: dbUser.email, accessToken: token });
    }
    else {
        resp.status(403).json({ message: 'Dados inválidos.' });
    }
};
exports.handleAuthentication = handleAuthentication;
function isValid(user) {
    if (!user) {
        return false;
    }
    var dbUser = user_1.users[user.email];
    return dbUser !== undefined && dbUser.matches(user);
}
