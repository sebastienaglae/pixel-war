const jwt = require('jsonwebtoken');
const passport = require('passport');

const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 5);
}
const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
}

passport.use("local", new LocalStrategy({
        usernameField: 'nickname',
        passwordField: 'password'
    },
    function (nickname, password, cb) {
        return UserModel.findOne({nickname})
            .then(user => {
                if (!user) {
                    return cb(null, false, {message: 'Incorrect email or password.'});
                }
                return comparePassword(password, user.password)
                    .then(match => {
                        if (!match) {
                            return cb(null, false, {message: 'Incorrect email or password.'});
                        }
                        return cb(null, user, {message: 'Logged In Successfully'});
                    }
                );
            })
            .catch(err => cb(err));
    }
));
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : JWT_SECRET
    },
    function (jwtPayload, cb) {
        return UserModel.findById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));

const RequireJWT = passport.authenticate('jwt', { session: false });
const AllowJWT = passport.authenticate('jwt', { session: false, failWithError: true });

module.exports = {
    authenticate: (req, res, next) => {
        return passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err && err.name === 'InvalidArgumentError') {
                return res.status(401).json({ error: err.message });
            }
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!user) {
                return res.status(401).json();
            }
            const token = jwt.sign({ id: user.id, email: user.email, nickname: user.nickname, admin: user.admin }, JWT_SECRET, { expiresIn: '1d' });
            return res.json({ token });
        })(req, res, next);
    },
    register: (req, res) => {
        const { email, password, nickname } = req.body;
        UserModel.create({ email, password: hashPassword(password), nickname })
            .then(user => {
                const token = jwt.sign({ id: user.id, email: user.email, nickname: user.nickname }, JWT_SECRET);
                return res.json({ token });
            })
            .catch(err => {
                if (err.code === 11000) {
                    if (err.keyValue.email) {
                        return res.status(400).json({ error: 'Email already exists' });
                    }
                    if (err.keyValue.nickname) {
                        return res.status(400).json({ error: 'Nickname already exists' });
                    }
                }
                res.status(500).json({ error: err });
            });
    },
    RequireJWT,
    AllowJWT
}