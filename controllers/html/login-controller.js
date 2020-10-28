const db = require('../../models');
const path = require('path')

module.exports = function(router) {
    // when user goes to home page
    router.get('/', function(req, res) {
        // send static login file
        res.sendFile(path.join(__dirname, '../../public/login.html'))
    });
};