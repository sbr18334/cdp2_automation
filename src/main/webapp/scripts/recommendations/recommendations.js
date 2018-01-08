angular.module('app')
.controller('RecommendationsController',function($scope,$window,$http,$state,$compile,$rootScope){

  $('#tabs div:nth-child(3)').css('background-color','#EAEEE9');
  $('#tabs div:nth-child(3)').css('color','#107ABA');
  $('#tabs div:not(:nth-child(3))').css('background-color','#107ABA');
  $('#tabs div:not(:nth-child(3))').css('color','#EAEEE9');

  $("#recommendationPage").hide();
  $(".fa-spin").show();
  
  /////////functionality required/////////////////
  $scope.addRecommendation = function(){
    modal.style.display = "none";
    $(".fa-spin").show();
    $("#recommendationPage").hide();
      $http({
          method: 'GET',
          url: '/Redshift',
          params: {
            sql: "INSERT INTO domo.cdp2monthlyrpt.monthlyrpt_recomendation (id, month, status, prio, proposition, theme, key_insights, recommendations, rally_ticket, deadline) VALUES ((SELECT ISNULL(MAX(id) + 1, 0) FROM domo.cdp2monthlyrpt.monthlyrpt_recomendation),'"+$scope.month.selectedOption.name+"','"+$scope.status.selectedOption.name+"','"+$scope.priority.selectedOption.name+"','"+$scope.proposition.selectedOption.name+"','"+$scope.theme.selectedOption.name+"','"+$scope.key+"','"+$scope.recom+"','"+$scope.ticket+"','"+$scope.deadline+"');",
            details: ""
          }
      }).then(function(response){
          $scope.init();
      })
  }

  $scope.updateRecommendation = function(){
    if($scope.status.selectedOption.name=='Implemented' && ($scope.outcome_value == null || $scope.outcome_value == "")){
      $("#error").show();
    }
    else if($scope.status.selectedOption.name=='In Progress' && ($scope.date_value == null || $scope.date_value == "")){
      $("#error").show();
    }
    else{
      modal1.style.display = "none";
      $(".fa-spin").show();
      $("#recommendationPage").hide();
      if($scope.status.selectedOption.name=='Implemented'){
        sql = "UPDATE domo.cdp2monthlyrpt.monthlyrpt_recomendation SET status = '"+$scope.status.selectedOption.name+"', prio = "+$scope.priority.selectedOption.name+", outcome = '"+$scope.outcome_value+"' WHERE id = '"+$scope.modal.id+"'";
      }
      else if($scope.status.selectedOption.name=='In Progress'){
        sql = "UPDATE domo.cdp2monthlyrpt.monthlyrpt_recomendation SET status = '"+$scope.status.selectedOption.name+"', prio = "+$scope.priority.selectedOption.name+", deadline = '"+$scope.date_value+"' WHERE id = '"+$scope.modal.id+"'";
      }
      else{
        sql = "UPDATE domo.cdp2monthlyrpt.monthlyrpt_recomendation SET status = '"+$scope.status.selectedOption.name+"', prio = "+$scope.priority.selectedOption.name+" WHERE id = '"+$scope.modal.id+"'";
      }
        $http({
          method: 'GET',
          url: '/Redshift',
          params: {
            sql: sql,
            details: ""
          }
      }).then(function(response){
          $scope.init();
      })
    }
  }
  ////////////////////////////////////////////////////////////////////////

  ///////////////////filter functionality////////////////////////////////////

  $scope.filter=function(){
    var input, filter, table, tr, td, i;

    status_input = $scope.status_filter.selectedOption.name;
    proposition_input = $scope.proposition_filter.selectedOption.name;

    if(status_input != 'ALL' && proposition_input != 'ALL'){
      var count = 0;
      filter1 = status_input.toUpperCase();
      filter2 = proposition_input.toUpperCase();
      table = document.getElementById("table_rec");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td1 = tr[i].getElementsByTagName("td")[6];
        td2 = tr[i].getElementsByTagName("td")[3];
        if (td1) {
          if (td1.innerHTML.toUpperCase().indexOf(filter1) > -1 && td2.innerHTML.toUpperCase().indexOf(filter2) > -1) {
            tr[i].style.display = "";
            count++;
          } else {
            tr[i].style.display = "none";
          }
        }       
      }
      $scope.length = count;
    }
    else if(status_input != 'ALL' && proposition_input == 'ALL'){
      var count = 0;
      filter = status_input.toUpperCase();
      table = document.getElementById("table_rec");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[6];
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            count++;
          } else {
            tr[i].style.display = "none";
          }
        }       
      }
      $scope.length = count;
    }
    else if(status_input == 'ALL' && proposition_input != 'ALL'){
      var count = 0;
      filter = proposition_input.toUpperCase();
      table = document.getElementById("table_rec");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3];
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            count++;
          } else {
            tr[i].style.display = "none";
          }
        }       
      }
      $scope.length = count;
    }
    else{
      var count = 0;
      table = document.getElementById("table_rec");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        tr[i].style.display = "";
        count++;
      }
      $scope.length = count-1;
    }
  }

  // $(document).click(function(e) {
  //   if (e.target.id != 'fields_rec' && !$('#fields_rec').find(e.target).length && e.target.id != 'new' && !$('#new').find(e.target).length) {
  //       $('#fields_rec').hide();
  //   } 
  // });
  //////////////////////////////////////////////////////////////////////

  $scope.priority = {
    availableOptions: [
      {id:'1',name: '1'},{id:'2',name: '2'},{id:'3',name: '3'}
    ],
    selectedOption: {id: '2', name: '2'}
    };

  $scope.theme = {
    availableOptions: [
      {id:'1',name: 'Scale'},{id:'2',name: 'Health'},{id:'3',name: 'Retention'},
      {id:'4',name:'Advocacy'},{id:'5',name: 'Conversion'},{id:'6',name: 'Engagement'}
    ],
    selectedOption: {id: '1', name: 'Scale'}
    };

  $scope.status = {
    availableOptions: [
      {id:'1',name: 'Implemented'},{id:'2',name: 'Not Committed'},{id:'3',name: 'In Progress'},{id:'4',name: 'Rejected by business'}
    ],
    selectedOption: {id: '2', name: 'Not Committed'}
    };

  $scope.status_filter = {
    availableOptions: [
      {id: '0', name: 'ALL'},{id:'1',name: 'Implemented'},{id:'2',name: 'Not Committed'},{id:'3',name: 'In Progress'},{id:'4',name: 'Rejected by business'}
    ],
    selectedOption: {id: '0', name: 'ALL'}
  };

//////////////////////////////////////////////////
// Get the modal1
var modal = document.getElementById('myModal');
modal.style.display = "none";

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

//m0dal2
var modal1 = document.getElementById('myModal1');
modal.style.display = "none";



// When the user clicks the button, open the modal 
$scope.openmodal = function() {
  modal1.style.display = "block";
  $("#go1").css('pointer-events','none');
  $("#go1").css('opacity','0.3');
  $("#outcome").hide();
  $("#deadline").hide();
  $("#error").hide();
  $scope.modal = this.n;
  $scope.priority.selectedOption.name = $scope.modal.priority;
  $scope.priority.selectedOption.id = $scope.modal.priority;
  $scope.status.selectedOption.name = $scope.modal.status;
  if($scope.modal.status == 'Implemented'){$scope.status.selectedOption.id = '1';}
  else if($scope.modal.status == 'Not committed'){$scope.status.selectedOption.id = '2';}
  else if($scope.modal.status == 'In progress'){$scope.status.selectedOption.id = '3';}
  else if($scope.modal.status == 'Rejected by business'){$scope.status.selectedOption.id = '4';}
}

// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
  modal.style.display = "none";
}

span2.onclick = function() {
  modal1.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
    }
  else if(event.target == modal1){
      modal1.style.display = "none";
  }
}

$scope.enableButton = function(a){
  $("#error").hide();
  $("#go1").css('pointer-events','auto');
  $("#go1").css('opacity','1');
  if(a=='status'){
    if($scope.status.selectedOption.name=='Implemented'){
      $('#deadline').hide();
      $('#outcome').show();
    }
    else if($scope.status.selectedOption.name=='In Progress'){
      $('#outcome').hide();
      $('#deadline').show();
    }
    else{
      $('#deadline').hide();
      $('#outcome').hide();
    }
  }
}
$("#top").hide();

$scope.toTop = function(){
  $window.scroll({top: 0, left: 0, behavior: 'smooth' });
}

$(document).scroll(function() { 
   if($(window).scrollTop() === 0) {
     $("#top").hide();
   }
   else{
     $("#top").show();
   }
});

  ////////////////////////////////////////////////
    $http({
          method: 'GET',
          url: '/Redshift',
          params: {
            sql: "SELECT * FROM cdp2monthlyrpt.months order by month desc",
            details: "months"
          }
      }).then(function(response){
          //$window.scroll({top: 0, left: 0, behavior: 'smooth' });
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
      $http({
          method: 'GET',
          url: '/Redshift',
          params: {
            sql: "select distinct(proposition) from cdp2monthlyrpt.monthlyrpt_recomendation where proposition not in(select min(proposition) from cdp2monthlyrpt.monthlyrpt_recomendation)",
            details: "proposition"
          }
      }).then(function(response){
          $scope.proposition_filter = [{}];
          for(i=response.data.length-1;i>0;i--){
            $scope.proposition_filter[i] = response.data[i-1];
          }
          $scope.proposition_filter[0] = {name: "ALL", id: 0};
          $scope.proposition_filter.selectedOption = $scope.proposition_filter[0];
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
      	      $("#recommendationPage").show();
      			  $(".fa-spin").hide();
      	  })
      }
    $scope.init();

});