var User = require('../model/user.js');
var Users = require('../collections/users');

var Event = require('../model/event.js');
var Events = require('../collections/events.js');

var UserAttendEvent = require('../model/userAttendEvent.js')
var UserAttendEvents = require('../collections/userAttendEvents.js');

var UserInterestEvent = require('../model/userInterestEvent.js')
var UserInterestEvents = require('../collections/userInterestEvents.js')

var util = require('../lib/utility.js');
var jwt = require('jwt-simple');

module.exports = {

  signup:function (req,res) {
    var user = req.body;
    // var file = req.files;
    // console.log(file)
    util.hashpass(user.password,function(hash){
      user.password = hash;
    });
    new User({ username: user.username }).fetch().then(function(found) {
     if (found) {
       res.status(200).send("this user is already existed");
     } else {
       Users.create(user)
       .then(function(newUser) {
        var token = jwt.encode(newUser, 'not your bussines!!');
        newUser.set("password", "");
        newUser.token = token;
        res.json(newUser);
      });
     }
   });
  },

  signin : function(req,res) {
    var user = req.body
    new User({ username: user.username }).fetch().then(function(found) {
      if (found) {
        var userHash = found.get('password');
        util.comparePass(user.password, userHash, function(exist){
          if(exist){
            var token = jwt.encode(found, 'not your bussines!!');
            found.set("password", "");
            found.token = token;
            res.json(found);
          }else{
            res.send("password is not correct");
          }
        })  
      } else {
        console.log("not found");
        res.status(500).send("user not found");
      }
    });
  },

getUserProfile: function (req, res) {
  var username = req.params.username;

  Users.reset().query('where', 'username', username).fetch({withRelated: ['event', 'interest', 'attend']}).then( function (found) {
    if(found.length) {
      found.models[0].attributes.password =  "";
      res.json(found);      
    }  
    else {
      res.status(500).send('There is nothing to show')
    }
  })
},

addAttending: function (req, res) {
  var attend = req.body
    // console.log(userId)
    new UserAttendEvent(attend).fetch().then(function(found){
      if(found){
        console.log(found)
        res.status(500).send("This user is already attending");
      } 
      else{
        UserAttendEvents.create(attend).then(function(newAttend){
          console.log(newAttend)
          res.json(newAttend);
        });
      }
    }).catch(function(err){
      res.status(500).send("Unable to add the user to the attending table");
    });
  },

  addInteresting: function (req, res) {
    var interest = req.body
    new UserInterestEvent(interest).fetch().then(function(found){
      if(found){
        console.log(found)
        res.status(500).send("This user is already inteested");
      } 
      else{
        UserInterestEvents.create(interest).then(function(newInterest){
          console.log(newInterest)
          res.json(newInterest);
        });
      }
    }).catch(function(err){
      res.status(500).send("Unable to add the user to the interested table");
    });
  }
}
