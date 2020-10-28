const bcrypt = require('bcrypt')

const db = require('../../models');

module.exports = function(router) {
    // user wants to login
    router.post('/login', function(req, res) {
        // look for user in db by eamil
        db.User.findOne({
            where: {email: req.body.email}
        }).then(dbUser => {
            // if user not found
            if (!dbUser) {
                // destroy any existing session and status 404
                req.session.destroy();
                return res.status(401).send("Incorrect email or password").end();

            // check if passwords match after decrypting password from db
            } else if (bcrypt.compareSync(req.body.password, dbUser.password)) {
                // create user session
                req.session.user = {
                    id: dbUser.id,
                    name: dbUser.name,
                    email: dbUser.email
                }
                // status 200
                return res.status(200).end();
            } else {
                // if passwords don't match, status 401
                return res.status(401).end();
            }

        })
    });

    // user wants to sign up
    router.post('/signup', function(req, res) {
        // check if user with same email already exists
        db.User.findOne({
            where: {email: req.body.email}
        }).then(dbUser => {
            // if email taken
            if (dbUser) {
                // status 403
                return res.status(403).send("Email taken").end();
            }
            // otherwise create a new user
            db.User.create({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            }).then(newUser => {
                // create session with new user info
                req.session.user = {
                    id: newUser.id,
                    email: newUser.email,
                    name: newUser.name
                }
                // status 200
                res.status(200).send("User created").end();
            })
        })
    });
};