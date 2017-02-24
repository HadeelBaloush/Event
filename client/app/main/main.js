angular.module('event.main', [])

.controller('MainController', function ($scope, $window, $location, Events) {
  $scope.data = {};

  	// Users.getTodayCookings().then(function(data){
  	// 	$scope.data.cookings = data;
  	// });

  	$scope.getCityEvents = function(city){
  		Events.getAllEvents().then(function(data){
  			console.log(data);
  			$scope.data.events = data;
  		});
  		$('#citySelect').slideToggle();
  		$('#eventList').slideToggle();
  	}

  	$scope.attendEvent = function(eventId){
  		if($window.localStorage.getItem('com.event') !== null){
  			var userId = JSON.parse($window.localStorage.getItem('com.event')).id;
  			Events.attendEvent(eventId, userId).then(function(data){
  				// console.log(data);
  				if(data.status === 500){
  					alert('you are already attending');
  				} else {
  					alert('Great! your are attending this event now');
  				}
  			})
  		} else {
  			$location.path('/signin');
  		}
  	}

  	$scope.interestEvent = function(eventId){
  		if($window.localStorage.getItem('com.event')){
  			var userId = JSON.parse($window.localStorage.getItem('com.event')).id;
  			Events.interestEvent(eventId, userId).then(function(data){
 				// console.log(data);
  				if(data.status === 500){
  					alert('you are already interested');
  				} else {
  					alert('Great! your are intersted in this event now');
  				}
  			})
  		} else {
  			$location.path('/signin');
  		}
  	}

});