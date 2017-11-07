angular.module('app')
.controller('KpiController',function($scope,$window,$http,$state,$compile,$rootScope){

/////////////////////////////////functions to be implemented on kpi page load/////////////////////////////////
  $("#kpi").hide();
  $(".fa-spin").show();
  // $scope.$on('$viewContentLoaded', function() {
    $scope.update = function(){
      get($scope.month.selectedOption,$scope.proposition.selectedOption)
    }

    if($scope.month == null || $scope.proposition == null){
      ////////////////////////
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
          if($rootScope.proposition != null){
            get($rootScope.month.selectedOption,$rootScope.proposition.selectedOption);
          } 
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
          $("#kpi").show();
          $(".fa-spin").hide();
          if($rootScope.month != null){
            get($rootScope.month.selectedOption,$rootScope.proposition.selectedOption);
          } 
      });
        //////////////////////
     }
    else{
      get($rootScope.month.selectedOption,$rootScope.proposition.selectedOption);
      $("#kpi").show();
      $(".fa-spin").hide();
     }
// });
  function get(a,b){

    //$scope.month = a;
    $scope.month.selectedOption = a;
    //$scope.proposition = b;
    $scope.proposition.selectedOption = b

      $http({
          method: 'GET',
          url: '/Redshift',
          params: {
            sql: "SELECT a.ios_1star, a.ios_2star, a.ios_3star, a.ios_4star, a.ios_5star, a.android_1star, a.android_2star, a.android_3star, a.android_4star, a.android_5star, a.total_1star, a.total_2star, a.total_3star, a.total_4star, a.total_5star FROM domo.cdp2semantic.appannie_dataset_av as a inner join domo.cdp2monthlyrpt.months as b on a.month = b.month where b.month_des='"+$scope.month.selectedOption.name+"' and a.proposition='"+$scope.proposition.selectedOption.name+"'",
            details: "rating"
          }
      }).then(function(response){
          if(response.data.length == '1'){
          $scope.ios_1 = response.data[0].ios_1;$scope.android_1 = response.data[0].android_1;$scope.total_1 = response.data[0].total_1;
          $scope.ios_2 = response.data[0].ios_2;$scope.android_2 = response.data[0].android_2;$scope.total_2 = response.data[0].total_2;
          $scope.ios_3 = response.data[0].ios_3;$scope.android_3 = response.data[0].android_3;$scope.total_3 = response.data[0].total_3;
          $scope.ios_4 = response.data[0].ios_4;$scope.android_4 = response.data[0].android_4;$scope.total_4 = response.data[0].total_4;
          $scope.ios_5 = response.data[0].ios_5;$scope.android_5 = response.data[0].android_5;$scope.total_5 = response.data[0].total_5;
          drawpie();
        }
        else{
          $scope.ios_1 = 0;$scope.android_1 = 0;$scope.total_1 = 0;
          $scope.ios_2 = 0;$scope.android_2 = 0;$scope.total_2 = 0;
          $scope.ios_3 = 0;$scope.android_3 = 0;$scope.total_3 = 0;
          $scope.ios_4 = 0;$scope.android_4 = 0;$scope.total_4 = 0;
          $scope.ios_5 = 0;$scope.android_5 = 0;$scope.total_5 = 0;
          //drawpie();
          $('#draw_pie').html('<br><span style="font-weight:bold;font-size:13px;">Overall app rating:</span><br><br><i style="color:rgb(202,64,64)" class="fa fa-exclamation-triangle fa-2x" aria-hidden="true"></i><br><span style="font-size:13px">NO data!!!</span>');
          $('#draw_pie1').html('<br><span style="font-weight:bold;font-size:13px;">IOS app rating:</span><br><br><i style="color:rgb(202,64,64)" class="fa fa-exclamation-triangle fa-2x" aria-hidden="true"></i><br><span style="font-size:13px">NO data!!!</span>');
          $('#draw_pie2').html('<br><span style="font-weight:bold;font-size:13px;">ANDROID app rating:</span><br><br><i style="color:rgb(202,64,64)" class="fa fa-exclamation-triangle fa-2x" aria-hidden="true"></i><br><span style="font-size:13px">NO data!!!</span>');
        }
      })


      $http({
          method: 'GET',
          url: '/Redshift',
          params: {
            sql: "select cdp2monthlyrpt.monthlyrpt_recomendation.status,cdp2monthlyrpt.monthlyrpt_recomendation.prio,cdp2monthlyrpt.monthlyrpt_recomendation.theme,cdp2monthlyrpt.monthlyrpt_recomendation.key_insights,cdp2monthlyrpt.monthlyrpt_recomendation.recommendations from cdp2monthlyrpt.monthlyrpt_recomendation inner join cdp2monthlyrpt.months on cdp2monthlyrpt.monthlyrpt_recomendation.month = cdp2monthlyrpt.months.month inner join cdp2monthlyrpt.proposition_mapping on cdp2monthlyrpt.monthlyrpt_recomendation.proposition = cdp2monthlyrpt.proposition_mapping.proposition_recommendation where cdp2monthlyrpt.months.month_des='"+$scope.month.selectedOption.name+"' and cdp2monthlyrpt.proposition_mapping.proposition_domo ='"+$scope.proposition.selectedOption.name+"'",
            details: "suggestion"
          }
      }).then(function(response){
          $scope.suggestionData = response.data;
          console.log($scope.suggestionData);
      })

      $http({
          method: 'GET',
          url: '/Redshift',
          params: {
            sql: "select a.errorrate, a.errorrate_delta, a.crashrate, a.crashrate_delta, a.firstlaunches, a.firstlaunches_delta, a.total_unique_visitors, a.total_unique_visitors_delta, a.thirty_ret_rate_prospect,  a.thirty_day_retention_prospect_delta,  a.thirty_ret_rate_owner,a.thirty_day_retention_owner_delta, a.ninty_ret_rate, a.ninty_ret_rate_delta, a.avg_weekly_launch_per_user, a.avg_weekly_launch_per_user_delta, a.\"%engaged\", a.\"%engaged_delta\", a.total_avg_rating, a.total_avg_rating_delta, 0 as mat_avg_product_rating,0 as mat_avg_product_rating_delta,0 as marketable_reg_rate,0 as marketable_reg_rate_delta,a.buybuttonclicks, a.buybuttonclicks_delta From cdp2monthlyrpt.monthlyrpt_metric_all as a inner join cdp2monthlyrpt.months as b on a.month = b.month inner join cdp2monthlyrpt.proposition_mapping as c on a.proposition = c.proposition_domo where b.month_des='"+$scope.month.selectedOption.name+"' and c.proposition_domo='" +$scope.proposition.selectedOption.name+"'",
            details: "metric"
          }
      }).then(function(response){
        if(response.data.length > '0'){
          $scope.metricData_0 = Math.round(response.data[0].errorrate * 100) / 100;
          $scope.metricData_1 = Math.round(response.data[0].errorrate_delta * 100) / 100;
          $scope.metricData_2 = Math.round(response.data[0].crashrate * 100) / 100;
          $scope.metricData_3 = Math.round(response.data[0].crashrate_delta * 100) / 100;
          $scope.metricData_4 = Math.round(response.data[0].firstlaunches * 100) / 100;
          $scope.metricData_5 = Math.round(response.data[0].firstlaunches_delta * 100) / 100;
          $scope.metricData_6 = Math.round(response.data[0].total_unique_visitors * 100) / 100;
          $scope.metricData_7 = Math.round(response.data[0].total_unique_visitors_delta * 100) / 100;
          $scope.metricData_8 = Math.round(response.data[0].thirty_ret_rate_owner * 100) / 100;
          $scope.metricData_9 = Math.round(response.data[0].thirty_ret_rate_owner_delta * 100) / 100;
          $scope.metricData_10 = Math.round(response.data[0].thirty_ret_rate * 100) / 100;
          $scope.metricData_11 = Math.round(response.data[0].thirty_ret_rate_delta * 100) / 100;
          $scope.metricData_12 = Math.round(response.data[0].ninty_ret_rate * 100) / 100;
          $scope.metricData_13 = Math.round(response.data[0].ninty_ret_rate_delta * 100) / 100;
          $scope.metricData_14 = Math.round(response.data[0].avg_weekly_launch_per_user * 100) / 100;
          $scope.metricData_15 = Math.round(response.data[0].avg_weekly_launch_per_user_delta * 100) / 100;
          $scope.metricData_16 = Math.round(response.data[0].engaged * 100) / 100;
          $scope.metricData_17 = Math.round(response.data[0].engaged_delta * 100) / 100;
          $scope.metricData_18 = Math.round(response.data[0].total_avg_rating * 100) / 100;
          $scope.metricData_19 = Math.round(response.data[0].total_avg_rating_delta * 100) / 100;
          $scope.metricData_20 = Math.round(response.data[0].mat_avg_product_rating * 100) / 100;
          $scope.metricData_21 = Math.round(response.data[0].mat_avg_product_rating_delta * 100) / 100;
          $scope.metricData_22 = Math.round(response.data[0].marketable_reg_rate * 100) / 100;
          $scope.metricData_23 = Math.round(response.data[0].marketable_reg_rate_delta * 100) / 100;
          $scope.metricData_24 = Math.round(response.data[0].buybuttonclicks * 100) / 100;
          $scope.metricData_25 = Math.round(response.data[0].buybuttonclicks_delta * 100) / 100;
          console.log(response.data)
          $("#kpi").show();
          $(".fa-spin").hide();
        }
        else{
          $scope.metricData_0 = $scope.metricData_1 = $scope.metricData_2 = $scope.metricData_3 = 
          $scope.metricData_4 = $scope.metricData_5 = $scope.metricData_6 = $scope.metricData_7 = 
          $scope.metricData_8 = $scope.metricData_9 = $scope.metricData_10 = $scope.metricData_11 = 
          $scope.metricData_12 = $scope.metricData_13 = $scope.metricData_14 = $scope.metricData_15 =  
          $scope.metricData_16 = $scope.metricData_17 = $scope.metricData_18 = $scope.metricData_19 = 
          $scope.metricData_20 = $scope.metricData_21 = $scope.metricData_22 = $scope.metricData_23 = 
          $scope.metricData_24 = $scope.metricData_25 = "N/A"
        }
      })

    }
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
    ['5star', $scope.total_5],
    ['4star', $scope.total_4],
    ['3star', $scope.total_3],
    ['2star', $scope.total_2],
    ['1star', $scope.total_1]
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
    ['5star', $scope.ios_5],
    ['4star', $scope.ios_4],
    ['3star', $scope.ios_3],
    ['2star', $scope.ios_2],
    ['1star', $scope.ios_1]
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
    ['5star', $scope.android_5],
    ['4star', $scope.android_4],
    ['3star', $scope.android_3],
    ['2star', $scope.android_2],
    ['1star', $scope.android_1]
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