
angular.module('app',[])
  .controller('LoginController', function ($scope) {
	  
	  if(localStorage.user !=null){
		  $(".bg-wrapper").hide();
		  window.location.href="/#/overview"
	  }
	  
	  $('#error_msg').hide();
		
	  $scope.error = function(){
		  $('#error_msg').hide();
		  }
	    
	  $(function(){
		  $('#password_field').keypress(function (e) {
			  var key = e.which;
			  if(key == 13){
				  $scope.homePage();
				  }
			  })
		  })
		  
	  $scope.homePage=function(){
		  if(document.getElementById('login_field').value=="admin" && document.getElementById('password_field').value=="admin"
		   || document.getElementById('login_field').value=="user" && document.getElementById('password_field').value=="user"){
			  localStorage.user = document.getElementById('login_field').value;
	 	  	  window.location.href="/#/overview";
	 	  	  }
		  else{
			  if($scope.username!=null && $scope.password!=null){
				  $('#error_msg').show();
				  }
			  }
		  }
	  });