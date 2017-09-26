
angular.module('app',[])
  .controller('LoginController', function ($scope) {
	  
	  $(".loader").hide();
	  
	  if(localStorage.user !=null){
		  $(".bg-wrapper").hide();
		  window.location.href="/#/overview"
	  }
	  
	  $('#error_msg').hide();
		
	  $('#login_field').on('input',function(e){
		  $('#error_msg').hide();
		  });
	  
	  $('#password_field').on('input',function(e){
		  $('#error_msg').hide();
		  });
	  
	  $scope.forgotPassword = function(){
		  document.location.href="../password/password.html";
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
			  $(".loader").show();
			  $('.bg-wrapper').hide();
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