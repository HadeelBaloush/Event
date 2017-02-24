angular.module('event.profile', [])

.controller('ProfileController', function ($scope, $routeParams, $window, $location, Events) {
  $scope.data = {};

	Events.getUserProfile($routeParams.user).then(function(data) {
		console.log(data)
		if(data){
			$scope.data = data;	
		} else {
			$location.path('/');
		}
	});

 //  	$scope.setOrder = function(UserID, cookerID, cookNameID, FullName, cookName){
	// 	OrderService.setOrder({userID: UserID, cookerID : cookerID,
	// 		 CookNamesID: cookNameID, FullName : FullName, cookName: cookName});
	// }

	$scope.addEvent = function(){
		$scope.event.userId = JSON.parse($window.localStorage.getItem('com.event')).id;
		Events.addEvent($scope.event).then(function(data){
			console.log(data);
			if(data){
				$location.path('/');
			}
		})
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