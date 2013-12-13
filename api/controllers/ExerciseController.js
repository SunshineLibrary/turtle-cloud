/**
 * ExerciseController
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
var UDM = require('../services/udm')
    , USERDATA_BASE = 'userdata'
    , udm = UDM.init(USERDATA_BASE)

module.exports = {

    "v1/user_data/*": function (req, res) {
        var method = req.method
            , username = req.session.user.username;
        if ("POST" === method) {
            console.log("post userdata:%s", username);
            var result = udm.putData(username, req.path, JSON.stringify(req.body));
            res.send(result);
        } else if ("GET" === method) {
            console.log("get userdata:%s", username);
            var result = udm.getData(username, req.path);
            res.send(result || {});
        }
    },


    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to ExerciseController)
     */
    _config: {}

};
