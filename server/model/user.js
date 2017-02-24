var db = require('../config-db');
var events = require('./event.js');
var userAttendEvent = require('./userAttendEvent.js');
var userIntersetEvent = require('./userInterestEvent.js');


var knex = require('knex');

var User = db.Model.extend({
	tableName: 'users',
	hasTimestamps: true,
	event: function () {
        return this.hasMany(events, 'userId', 'id');
    },
    attend: function () {
        return this.belongsToMany(events, 'userAttendEvent', 'eventId', 'userId');
    },
    interest: function () {
        return this.belongsToMany(events, 'userInterestEvent', 'eventId', 'userId');
    }
});

module.exports = User;
