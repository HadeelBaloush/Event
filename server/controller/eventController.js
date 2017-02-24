var Event = require('../model/event.js');
var Events = require('../collections/events');
var Users = require('../collections/users');

var UserAttendEvents = require('../collections/userAttendEvents.js');
var UserAttendEvent = require('../model/userAttendEvent.js');

var UserInterestEvents = require('../collections/userInterestEvents.js');
var UserInterestEvent = require('../model/userInterestEvent.js');

var jwt = require('jwt-simple');

module.exports = {

  addEvent:function (req, res){
    var event = req.body;
    new Event({eventName: event.eventName}).fetch().then(function(found){
      if(found){
        res.status(500).send("This event is already existed");
      } 
      else{
        Events.create(event).then(function(newEvent){
          res.json(newEvent);
        });
      }
    }).catch(function(err){
      res.status(500).send("Unable to add event");
    });

  },

  getAll : function(req,res){
    Events.reset().fetch({withRelated: ['attend','interest']}).then(function(events){
      if(events.length){
        res.json(events)
      }
      else{
        res.status(500).send('Unable to find events!');
      }
    });
  },

  getTopCityEvents: function (req, res){
    var city = req.params.city;
    
    Events.reset().fetch({city: city, withRelated: ['attend','interest']}).then(function(topEvents){
        if(result.models.length){
          res.json(topEvents);
        }
        else{
        res.status(500).send("Unable to find events in ", city);
      }
    })
  },

  getAllCityEvents: function(req, res){
    var city = req.params.city;
    Events.reset().fetch({city: city, withRelated: ['attend','interest']}).then(function(cityEvents){
      if(cityEvents.length){
        res.json(cityEvents);
      }
      else{
        res.status(500).send("Unable to find events in ", city);
      }
    });
  },

  editEvent: function (req, res){
    var edit = req.body;

    new Event({id: edit.id}).fetch().then(function(event){
      delete edit['id'];
      event.set(edit);
      event.save();
      res.json("Event is updated");
    }).catch(function(err){
      res.status(500).send("Unable to edit event");
    });
  },

  deleteEvent: function (req, res) {
    var id = req.body.id;
    new Event({id: id}).fetch().then(function(event){
      console.log(event)
      event.destroy();
      res.json("Event deleted.");
    }).catch(function(err){
      res.status(500).send("Unable to delete event ");
    });
  }
};


