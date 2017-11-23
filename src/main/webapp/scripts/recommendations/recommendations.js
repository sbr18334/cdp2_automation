angular.module('app')
.controller('RecommendationsController',function($scope,$window,$http,$state,$compile,$rootScope){

  $('#tabs div:nth-child(3)').css('background-color','#EAEEE9');
  $('#tabs div:nth-child(3)').css('color','#107ABA');
  $('#tabs div:not(:nth-child(3))').css('background-color','#107ABA');
  $('#tabs div:not(:nth-child(3))').css('color','#EAEEE9');

  $("#recommendationPage").hide();
  $(".fa-spin").show();
  $("#fields_rec").hide();

  /////////functionality required/////////////////
  $scope.addRecommendation = function(){
  	$("#fields_rec").show();
  }
  $scope.close = function(){
  	$("#fields_rec").hide();
  }
  $scope.updateRecommendaiton = function(){
    $("#fields_rec").hide();
    $(".fa-spin").show();
    $("#recommendationPage").hide();
        $http({
          method: 'GET',
          url: '/Redshift',
          params: {
            sql: "INSERT INTO domo.cdp2monthlyrpt.monthlyrpt_recomendation (id, month, status, prio, proposition, theme, key_insights, recommendations) VALUES ((SELECT ISNULL(MAX(id) + 1, 0) FROM domo.cdp2monthlyrpt.monthlyrpt_recomendation),(SELECT month from domo.cdp2monthlyrpt.months where month_des='"+$scope.month.selectedOption.name+"'),'"+$scope.status.selectedOption.name+"','"+$scope.priority.selectedOption.name+"','"+$scope.proposition.selectedOption.name+"','"+$scope.theme.selectedOption.name+"','"+$scope.key+"','"+$scope.recom+"');",
            details: ""
          }
      }).then(function(response){
          $scope.init();
      })
  }

  $scope.priority = {
    availableOptions: [
      {id:'1',name: '1'},{id:'2',name: '2'},{id:'3',name: '3'}
    ],
    selectedOption: {id: '2', name: '2'}
    };

  $scope.theme = {
    availableOptions: [
      {id:'1',name: 'Scale'},{id:'2',name: 'Health'},{id:'3',name: 'Retention'},
      {id:'4',name:'Advocacy'}
    ],
    selectedOption: {id: '1', name: 'Scale'}
    };

  $scope.status = {
    availableOptions: [
      {id:'1',name: 'Implemented'},{id:'2',name: 'Not Committed'},{id:'3',name: 'In Progress'},{id:'4',name: 'Rejected'}
    ],
    selectedOption: {id: '2', name: 'Not Committed'}
    };

  ////////////////////////////////////////////////
    $http({
          method: 'GET',
          url: '/Redshift',
          params: {
            sql: "SELECT * FROM cdp2monthlyrpt.months order by month desc",
            details: "months"
          }
      }).then(function(response){
          $scope.month = response.data;
          $scope.month.selectedOption = response.data[0];
      })
      $http({
          method: 'GET',
          url: '/Redshift',
          params: {
            sql: "SELECT * FROM cdp2monthlyrpt.proposition",
            details: "proposition"
          }
      }).then(function(response){
          $scope.proposition = response.data;
          $scope.proposition.selectedOption = response.data[0];
      });
      $scope.init = function(){
      	$http({
      	      method: 'GET',
      	      url: '/Benchmark',
      	      params: {
      	        sql: "select * from cdp2monthlyrpt.monthlyrpt_recomendation order by id asc;",
      	        details: "recommendation"
      	      }
      	  }).then(function(response){
      	      $scope.suggestionData = response.data;
      	      $scope.length = response.data.length;
      	      console.log($scope.suggestionData);
      	      $("#recommendationPage").show();
      			  $(".fa-spin").hide();
      	  })
      }
    $scope.init();

});