const router = require('express').Router();
const bcrypt = require('bcryptjs');
const secrets = require('../config/secrets.js');
const Users = require('./auth-user-model.js');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
        .then(users => {
            const token = genToken(user)
            res.status(201).json({ created_user: users, token: token });
        })
        .catch(err => {
            res.status(500).json({ message: 'user not added', err })
        });
});

router.get('/users', (req, res) => {
    Users.findUser()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})


router.post('/login', (req, res) => {
    let { username, password } = req.body;
    console.log(req.body);

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = genToken(user)
                res.status(201).json({
                    message: `Welcome ${user.username}!`, token
                });
            } else {
                res.status(401).json({ message: 'Invalid Credentails' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'whaat the heck', err })
        });
})



function genToken(user) {
    const payload = {
        userid: user.id,
        username: user.username,
    };
    const options = { expiresIn: '30d' };
    const token = jwt.sign(payload, secrets.jwtSecrets, options)

    return token;
}

module.exports = router;