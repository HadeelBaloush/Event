angular.module('event.auth', [])

.controller('AuthController', function ($scope, $rootScope, $window, $location, Auth) {
  // $scope.eventType =[
  //        "Music",
  //        "Tech",
  //        "Sport"
  // ];
   
  $scope.signout = function () {
    Auth.signout()
  };


  $scope.signin = function () {

    Auth.signin($scope.user)
    .then(function (data) {
      $window.localStorage.setItem('com.event', JSON.stringify(data));
      $rootScope.username = data.username;
      $rootScope.isLoggedIn = true;
      $location.path('/users/'+data.username);
    })
    .catch(function (error) {
      console.error(error);
    });

  };

  $scope.signup = function () {
    
    Auth.signup($scope.user)
      .then(function (data) {
        $window.localStorage.setItem('com.event', JSON.stringify(data));
        $rootScope.username = data.username;
        $rootScope.isLoggedIn = true;
        $location.path('/users/'+data.username);
      })
      .catch(function (error) {
        console.error(error);
      });

  };


});