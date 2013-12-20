/**
 * ClassroomsController
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
    createClassroom : function(req, res, next) {
    	console.log('createClassroom..');
    	Classrooms.create(req.body, function(err, classroom) {
    		if(err) return console.log(err);
    		res.json(classroom, 200);
    	})
    },
   
    addUserToClassroom : function(req, res, next) {
    	var user_id = req.param('id');
    	var room_id = req.body.room_id;

    	//res.send('addUserToClassroom...+uid'+user_id+'   room_id='+room_id);
    	Classrooms.findOne(room_id).done(function(err, classroom) {
    		if(err) return console.log(err);

    		if(typeof classroom.user_ids == 'undefined') {
    			console.log('user_ids undefined');
    			classroom.user_ids = new Array();
    		}
    		classroom.user_ids.push(user_id);
    		classroom.save(function(err) {
    			if(err) return console.log(err);
    		});

    		Users.findOne(user_id).done(function(err, user) {
    			if(err) return console.log(err);
    			res.json(user, 200);
    		});
    	});
    },

    destroyUserFromClassroom : function(req, res, next) {
    	//res.send('destroyUserFromClassroom...+uid='+req.param('user_id')+'  cid='+req.param('room_id'));
    	var user_id = req.param('user_id'),
    	      room_id = req.param('room_id');

    	Classrooms.findOne(room_id).done(function(err, classroom) {
    		if(classroom.user_ids == 'undefined') {
    			classroom.user_ids = new Array();
    		}

    		var index = classroom.user_ids.indexOf(user_id);
    		if(inde < 0) {
    			res.send('没有此用户，无法删除！');
    		}

    		var deleteId = classroom.user_ids.splice(index, 1);
    		console.log('delete : '+deleteId);

    		res.send(204);
    	});
    },

    showClassroomInfo : function(req, res, next) {
    	//res.send('showClassroomInfo...cid='+req.param('id'));
    	Classrooms.findOne(req.param('id')).done(function(err, classroom) {
    		if(err) return console.log(err);

    		res.json(classroom, 200);
    	})
    },

    destroyStudentFromClassroom : function(req, res, next) {
    	//res.send('destroyStudentFromClassroom...cid='+req.param('room_id')+'  uid='+req.param('user_id'));
    	var user_id = req.param('user_id'),
    	      room_id = req.param('room_id');

    	Classrooms.findOne(room_id).done(function(err, classroom) {
    		if(classroom.user_ids == 'undefined') {
    			classroom.user_ids = new Array();
    		}

    		var index = classroom.user_ids.indexOf(user_id);
    		if(index < 0) {
    			res.send('没有此学生，无法删除！');
    		}

    		Users.findOne(user_id).done(function(err, user) {
    			if(user.utype == 'student') {
	    			var deleteId = classroom.user_ids.splice(index, 1);
    				console.log('delete : '+deleteId);

    				res.send(204);

    			} else {
    				res.send('您无此权限删除此用户');
    			}
    		})
    	});    	
    },

    //__________________________***_________________________________
   getUsersByClassroom : function(req, res, next) {
    	//res.send('getClassroomsByUser...+id'+req.param('id'));
    	var classroom_id = req.param('id');
    	Classrooms.findOne(classroom_id).done(function(err, classroom) {
    		if(err) return console.log(err);
    		
    		if(!(typeof classroom.user_ids == 'undefined')) {
    			var users = new Array();
    			classroom.user_ids.forEach(function(user_id, index, arr) {
    				Users.findOne(user_id).done(function(err, user) {
    					users.push(user);
    					if(users.length == classroom.user_ids.length) {
    						console.log('users.length='+users.length);
    						res.json(users, 200);	
    					}
    				});
    			});
    			
    		} else {
    			res.send('type='+(typeof classroom.user_ids)+', 没有认领任何班级');
    		}
    	});
    },    

};
