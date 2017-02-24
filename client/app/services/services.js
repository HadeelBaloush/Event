angular.module('event.services', [])


.factory('Auth', function ($http, $location, $window) {
 
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var signup = function (user) {
  console.log(user)
    return $http({
      method: 'POST',
      url: '/api/signup',
      data: user
    })
    .then(function (resp) {
     return resp.data;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.event');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.event');
    $rootScope.isLoggedIn = false;
    $location.path('/');
  };

  return {
    signin : signin,
    signup : signup,
    isAuth: isAuth,
    signout: signout
  };
})

.factory('Events', function($http){

  var addEvent = function(event){
    return $http({
      method : 'POST',
      url :'/api/events',
      data : event
    })
    .then(function(event){
      return event
    });
  };


  var getUserProfile = function (username){
    return $http ({
      method : 'GET',
      url : '/api/users/' + username
    }).then(function (resp) {
      return resp.data;
    });
  };


  var getAllEvents = function (){
    return $http ({
      method : 'GET',
      url : '/api/events'
      // params:{tok:tok}
    }).then(function (resp) {
      return resp.data;
    });
  };

  var getAllCityEvents = function (city){
    return $http ({
      method : 'GET',
      url : '/api/events/'+city
      // params:{tok:tok}
    }).then(function (resp) {
      return resp.data;
    });
  };

  var attendEvent = function(eventId, userId){
    return $http ({
      method : 'POST',
      url : '/api/events/attending',
      data : {eventId: eventId, userId : userId}
    }).then(function (resp) {
      return resp;
    }).catch(function (err) {
      if(err)
      return {status:500};
    });
  }

  var interestEvent = function(eventId, userId){
    return $http ({
      method : 'POST',
      url : '/api/events/interested',
      data : {eventId: eventId, userId : userId}
    }).then(function (resp) {
      return resp;
    }).catch(function (err) {
      if(err)
      return {status:500};
    });
  }

  return {
    addEvent : addEvent,
    getUserProfile : getUserProfile,
    getAllEvents : getAllEvents,
    getAllCityEvents : getAllCityEvents,
    attendEvent : attendEvent,
    interestEvent : interestEvent
  }
  
})