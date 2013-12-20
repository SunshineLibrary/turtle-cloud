/**
 * UsersController
 *
 * @module      :: Controller
 * @description	:: A set of function called `actions`.
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
    showAllUsers : function(req, res, next) {
    	//res.send('showAllUsers....');
    	Users.find().done(function(err, users) {
    		if(err) return console.log(err);
    		res.json(users, 200);
    	})
    },

    createUser : function(req, res, next) {
    	//res.send('createUser...body='+JSON.stringify(req.body));
    	Users.create(req.body, function(err, user) {
    		if(err) return console.log(err);
    		res.json(user, 200);
    	})
    },

    showUserInfo : function(req, res, next) {
    	//res.send('showUserInfo...+id='+req.param('id'));
    	Users.findOne(req.param('id'), function(err, user) {
    		if(err) return console.log(err);
    		res.json(user, 200);
    	})
    },

    destroyUser : function(req, res, next) {
    	//res.send('destroyUser...+id='+req.param('id'));
    	Users.findOne(req.param('id'), function(err, user) {
    		if(err) return console.log(err);
    		user.destroy(function(err) {
    			if(err) return console.log(err);
    			res.send(204);
    		})
    	})
    },

//_____________________________***____________________________
   getClassroomsByUser : function(req, res, next) {
    	//res.send('getClassroomsByUser...+id'+req.param('id'));
    	var user_id = req.param('id');
    	Users.findOne(user_id).done(function(err, user) {
    		if(err) return console.log(err);
    		
    		if(!(typeof user.room_ids == 'undefined')) {
    			var classrooms = new Array();
    			user.room_ids.forEach(function(room_id, index, arr) {
    				Classrooms.findOne(room_id).done(function(err, classroom) {
    					classrooms.push(classroom);
    					if(classrooms.length == user.room_ids.length) {
    						console.log('classrooms.length='+classrooms.length);
    						res.json(classrooms, 200);	
    					}
    				});
    			});
    			
    		} else {
    			res.send('type='+(typeof user.room_ids)+', 没有认领任何班级');
    		}
    	});
    },

    addClassroomToUser : function(req, res, next) {
    	var room_id = req.param('id');
    	var user_id = req.body.user_id;

    	Users.findOne(user_id).done(function(err, user) {
    		if(err) return console.log(err);
    		if(typeof user.room_ids == 'undefined') {
    			console.log('undefined');
    			user.room_ids = new Array();
    		}
    		user.room_ids.push(room_id);
    		user.save(function(err) {
    			if(err) return console.log(err);
    		});

    		Classrooms.findOne(room_id).done(function(err, classroom) {
    			if(err) return console.log(err);
    			res.json(classroom, 200);
    		}); 
    	})
    }
};
