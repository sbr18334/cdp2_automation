angular.module('app',[])
  .controller('PasswordController', function ($scope,$http,$location) {
	  
	  $('#success').hide();
	  $('#error').hide();
	  
	  $('#login_field').on('input',function(e){
		  $('#success').hide();
		  $('#error').hide();
	  });
	  
	  $scope.homePage=function(){
	      $http({
	          method: 'GET',
	          url: '/download',
	          params: {
	        	  config: location.origin,
	        	  email: $scope.username
	          }
	        }).then(function(response){
	      	  console.log(response);
	        })
		  $('#success').show();
	  };
  });