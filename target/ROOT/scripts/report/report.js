angular.module('app')
.controller('ReportController',function($scope,$window,$http,$state){
	
    $('#tabs div:nth-child(4)').css('background-color','#EAEEE9');
    $('#tabs div:nth-child(4)').css('color','#107ABA');
    $('#tabs div:not(:nth-child(4))').css('background-color','#107ABA');
    $('#tabs div:not(:nth-child(4))').css('color','#EAEEE9');

    $scope.month = {
      availableOptions: [
      {id:'1',name:"Jan-16"},{id:'2',name:"Feb-16"},{id:'3',name:"Mar-16"},{id:'4',name:"Apr-16"},
      {id:'5',name:"May-16"},{id:'6',name:"June-16"},{id:'7',name:"July-16"},{id:'8',name:"Aug-16"},
      {id:'9',name:"Sep-16"},{id:'10',name:"Oct-16"},{id:'11',name:"Nov-16"},{id:'12',name:"Dec-16"},{id:'13',name:"Jan-17"}
      ],
    selectedOption: {id: '1', name: 'Jan-16'}
    }

    $scope.data=[
      {"username":"sbr18334","email":"balchandar.reddy.sangam@philips.com","type":"admin","proposition":"sonicare"
      },{
        "username":"spcr92","email":"spcr@philips.com","type":"user","proposition":"Airfryer"
      },{
        "username":"abc123","email":"abc123@philips.com","type":"user","proposition":"uGrow"
      }
      ]
   
    $scope.table = true;
    $scope.create = function(){
    	$scope.table = false;
    }
    //$scope.user = 'admin';
    $scope.user = sessionStorage.getItem('user');
    //sessionStorage.setItem('user',$scope.user);
    
    //edit
    $scope.edit = {};
    
    for (var i = 0, length = $scope.data.length; i < length; i++) {
      $scope.edit[i] = false;
    }
    $scope.modify = function(tableData){
        $scope.edit[tableData] = true;
    };
    $scope.update = function(tableData){
        $scope.edit[tableData] = false;
    };
    //edit
    
    $scope.del = function(item){
    	$('.'+item).hide();
    }
});