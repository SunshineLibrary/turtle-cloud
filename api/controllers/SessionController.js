/**
 * SessionController
 *
 * @module      :: Controller
 * @description    :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    register: function (req, res) {
        res.view();
    },

    login: function (req, res) {
        res.view();
    },

    logout: function (req, res) {
        req.session.user = null;
        req.session.message = null;
        res.redirect('/');
    },

    registerUser: function (req, res) {
        var username = req.param('username'),
            password = req.param('password');
        console.log('Register--->username=' + username + '  password=' + password);

        //Fistly checkout the username have been used? if not, what the specific defintion about unique id, how about the work folow?
        User.create({
            username: username,
            password: password
        }).done(function (err, user) {
                if (err) {
                    console.log(err);
                    return
                }
                console.log('Success...' + user.username);
                req.session.user = user;
                res.redirect('/');
            });
    },

    auth: function (req, res) {
        if (req.session.user) {
            res.send({
                'index': '/app/102/index.html'
            })
        } else {
            res.send(401);
        }
    },

    loginUser: function (req, res) {
        var username = req.param('username'),
            password = req.param('password');

        User.findOne({username: username, password: password}, function (err, user) {
            if (err) return console.log(err);
            if (user) {
                req.session.user = user;
                req.session.message = 'Login Successfully!';
                res.redirect('/');
            } else {
                req.session.message = 'Username or Password is not match, Please try again';
                res.redirect('/login');
            }
        });
    }
};
