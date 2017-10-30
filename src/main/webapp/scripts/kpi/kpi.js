angular.module('app')
.controller('KpiController',function($scope,$window,$http,$state,$compile,$rootScope){

/////////////////////////////////functions to be implemented on kpi page load/////////////////////////////////
  $("#kpi").css('opacity','0');
  $(".fa-spin").show();
  $scope.$on('$viewContentLoaded', function() {
    $scope.month = $rootScope.month;
    $scope.proposition = $rootScope.proposition;

    if($scope.month == null || $scope.proposition == null){
      $http({
          method: 'GET',
          url: '/Redshift',
          params: {
            sql: "SELECT * FROM cdp2monthlyrpt.months order by month desc",
            details: "months"
          }
      }).then(function(response){
          $rootScope.month = response.data;
          $rootScope.month.selectedOption = response.data[0];
          $scope.month = $rootScope.month;
      })
      $http({
          method: 'GET',
          url: '/Redshift',
          params: {
            sql: "SELECT * FROM cdp2monthlyrpt.proposition",
            details: "proposition"
          }
      }).then(function(response){
          $rootScope.proposition = response.data;
          $rootScope.proposition.selectedOption = response.data[0];
          $scope.proposition = $rootScope.proposition;
          $("#kpi").css('opacity','1');
          $(".fa-spin").hide();
      })
    }
    else{
      $("#kpi").css('opacity','1');
      $(".fa-spin").hide();
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////various css for kpi page///////////////////////////////////////////////
  $scope.edit1 = 0;

	$('#tabs div:nth-child(2)').css('background-color','#EAEEE9');
    $('#tabs div:nth-child(2)').css('color','#107ABA');
    $('#tabs div:not(:nth-child(2))').css('background-color','#107ABA');
    $('#tabs div:not(:nth-child(2))').css('color','#EAEEE9');

    $('#view').css('border-bottom','3px solid green');
    $('#view').css('font-weight','bold');

    $('#data div #eddlt').hide();

    $('#data div').mouseover(function(){
      if($scope.edit1 == 1){$('#data div #eddlt').show();}
    })
    $("#data div").mouseout(function(){
      if($scope.edit1 == 1){$('#data div #eddlt').hide();}
    })

  $("#goedit").hide();

  $scope.deleteSuggestion = function(){
    //deleting the suggestion
  }

  $scope.editSuggestion = function(){
    //editing the suggestion
      $("#goedit").show();
      $("#focus").hide();
  }

  $scope.updateSuggestion = function(){
    //updating the suggestion
    alert("Suggestion has been updated succesfully");
    location.reload();
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  $scope.priority = {
    availableOptions: [
      {id:'1',name: '1'},{id:'2',name: '2'}
    ],
    selectedOption: {id: '1', name: '1'}
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
      {id:'1',name: 'Implemented'},{id:'2',name: 'Not Committed'},{id:'3',name: 'In Progress'}
    ],
    selectedOption: {id: '1', name: 'Implemented'}
    };

  ///functions///////
  $scope.edit = function(){
  $('#graphs').hide();
  $('#graphs').css('opacity','0');
  $('#graphs').css('transition','linear 0.5s')
  $('#edit').css('border-bottom','3px solid green');
  $('#edit').css('font-weight','bold');
  $('#view').css('font-weight','normal');
  $('#view').css('border-bottom','0px');
  $scope.edit1 = 1;
  }
  $scope.view = function(){
  $('#graphs').show()
  location.reload();
  $('#graphs').css('opacity','1');
  $('#view').css('border-bottom','3px solid green');
  $('#view').css('font-weight','bold');
  $('#edit').css('font-weight','normal');
  $('#edit').css('border-bottom','0px'); 
  $scope.edit1 = 0;
  }

  $http.get('/src/main/webapp/resources/data.json').then(function(response){
    $scope.data3 = response.data;
  })

  $scope.addData = function(metric){
    //alert(v);alert($scope.data1+"   "+$scope.data2);
    //$("#data").append($compile('<br>{{data1}}')($scope));
    //http post to local json
    $http({
      method: 'GET',
      url: '/Suggestions',
      params: {
        summary: $scope.data1,
        details: $scope.data2
        //metric: $scope.metric
      }
    }).then(function(response){
  	  
    })
    location.reload();
  }

  $('.fa-plus-circle').click(function(){
      if($scope.edit1!=0){
        $(window).scrollTop(210);
        $("#goedit").show();
        $("#focus").hide();
        $('.fa-plus-circle').css('display','none');
        //alert($scope.month.selectedOption.name);
        //alert('You clicked row '+ ($(this).index()+1) );
        //$scope.metric = $(this).find('td:nth-child(2)').text();
        $('#data').append($compile('<span style="font-weight:bold;">New Suggestion:</span><br><input autofocus="autofocus" type="text" id="current Name" value=""'
          +'ng-model="data1" style="margin-bottom:2px;width:100%;font-weight:bold;text-transform: capitalize"/><br><textarea'
          +' ng-model ="data2" rows="2" style="width:100%;"/>&nbsp;<i ng-click="addData(metric)" class="fa fa-plus-circle fa-lg"' 
          +'aria-hidden="true"></i>')($scope));
      }

  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////graphs/////////////////////////////////////////////////////////

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawpie);
google.charts.setOnLoadCallback(drawline);

function drawpie() {

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
    ['5star', 4],
    ['4star', 2],
    ['3star', 2],
    ['2star', 3],
    ['1star', 1]
  ]);

  var options = {title:'Overall app rating',
                 width:185,
                 height:120,
                 legend:'left',
                 backgroundColor:'#D3D3D3'};

  var chart = new google.visualization.PieChart(document.getElementById('draw_pie'));
  chart.draw(data, options);

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
    ['5star', 4],
    ['4star', 2],
    ['3star', 2],
    ['2star', 3],
    ['1star', 1]
  ]);

  var options = {title:'IOS app rating',
                 width:185,
                 height:120,
                 legend:'left',
                 backgroundColor:'#D3D3D3'};

  var chart = new google.visualization.PieChart(document.getElementById('draw_pie1'));
  chart.draw(data, options);

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
    ['5star', 4],
    ['4star', 2],
    ['3star', 2],
    ['2star', 3],
    ['1star', 1]
  ]);

  var options = {title:'Android app rating',
                 width:185,
                 height:120,
                 titlePosition:'right',
                 legend:'left',
                 backgroundColor:'#D3D3D3'};

  var chart = new google.visualization.PieChart(document.getElementById('draw_pie2'));
  chart.draw(data, options);
}

function drawline() {

  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
    ['2004',  1000,      400],
    ['2005',  1170,      460],
    ['2006',  660,       1120],
    ['2007',  1030,      540]
  ]);

  var options = {
    title: 'Company Performance',
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('draw_line'));

  var options = {
    title: 'Company Performance',
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  chart.draw(data, options);
}
  ///////
})
.config(function ($httpProvider, $httpParamSerializerJQLikeProvider){
  $httpProvider.defaults.transformRequest.unshift($httpParamSerializerJQLikeProvider.$get());
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
});