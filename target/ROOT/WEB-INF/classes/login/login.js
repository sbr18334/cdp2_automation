
angular.module('app',[])
  .controller('LoginController', function ($scope) {
$(function(){            //to trigger login on enter
 $('#password_field').keypress(function (e) {
 var key = e.which;
 if(key == 13)
  {
    $scope.homePage();
  }
})
})   

$scope.homePage=function(){
   if(document.getElementById('login_field').value=="admin" && document.getElementById('password_field').value=="admin"
	   || document.getElementById('login_field').value=="user" && document.getElementById('password_field').value=="user"){
 	  sessionStorage.user = document.getElementById('login_field').value;
 	  window.location.href="/#/overview"
 } else{
 	alert("Invalid Credentials")
 }
}
});