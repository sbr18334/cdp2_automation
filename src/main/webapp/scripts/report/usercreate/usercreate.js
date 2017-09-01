angular.module('app')
.controller('usercreateController',function($scope,$window,$http,$state){
	
	$scope.user=sessionStorage.getItem('user');
	if($scope.user !=null){
		if($scope.user!='admin'){
			$state.go('report');
		}
	}
	else{
		document.location.href = "scripts/login/login.html";
	}
	$scope.createuser = function(){
		alert("User has been created succesfully");
		$state.go('report');
	}
	
    $scope.data = {
    availableOptions: [
      {id:'1',name: 'Sonicare Connected'},{id:'2',name: 'AirFryer'},{id:'3',name: 'Easy Weaning'},
      {id:'4',name:'Lumea IPL'},{id:'5',name: 'Sonicare for kids'},{id:'6',name:'uGrow'},
      {id:'7',name:'Grooming'},{id:'8',name:'Health Drinks'},{id:'9',name:'Smart baby monitor'}
    ],
    selectedOption: {id: '1', name: 'Sonicare Connected'} //This sets the default value of the select in the ui
    };
    
    $scope.type = {
    	    availableOptions: [
    	      {id:'1',name: 'User'},{id:'2',name: 'Admin'}
    	    ],
    	    selectedOption: {id: '1', name: 'User'} //This sets the default value of the select in the ui
    	    };
});