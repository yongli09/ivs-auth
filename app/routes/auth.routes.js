module.exports = (app) => {
    const auth = require('../controllers/auth.controller.js');

    // Login
    app.post('/ivs-auth/get-token', auth.getToken);

    // Refresh token
    app.post('/ivs-auth/refresh-token', auth.refreshToken);

}