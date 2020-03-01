const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {

    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secrets.jwtSecrets, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ you: 'shall not pass!' });
            } else {
                req.deodedJwt = decodedToken;
                console.log("decoded token", req.deodedJwt);
                next();
            }
        })
    } else {
        res.status(401).json({ you: "can't touch this" })
    }
};