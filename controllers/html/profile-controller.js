const db = require('../../models');

module.exports = function(router) {
    // route to load logged in user's profile
    router.get('/profile', function(req, res) {
        // if no manager is logged in, redirect to login page
        if (!req.session.user) {
            res.redirect('/')
        }

        // grab values from session for user
        const { id, name, email } = req.session.user
        // recreate obj to render page with (only doing this step so dev team knows that properties are being used)
        const userObj = { id, name, email }

        // render the profile page with the user's information
        res.render('user-profile', userObj)
    });
};