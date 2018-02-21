angular.module('app')
.controller('KpiController',function($scope,$window,$http,$state,$compile,$rootScope){

/////////////////////////////////functions to be implemented on kpi page load/////////////////////////////////
  $(".spin-1").show();
  $(".spin-2").hide();
  $("#kpi").hide();
  // $scope.$on('$viewContentLoaded', function() {
    $scope.update = function(){
      $(".spin-2").show();
      $("#kpi_info").css('opacity','0');
      $("#table").css('opacity','0');
      get($scope.month.selectedOption,$scope.proposition.selectedOption);
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
          $(".spin-1").hide();
          $(".spin-2").show();
          $("#kpi_info").css('opacity','0');
          $("#table").css('opacity','0');
          if($rootScope.month != null){
            get($rootScope.month.selectedOption,$rootScope.proposition.selectedOption);
          } 
      });
        //////////////////////
     }
    else{
      get($rootScope.month.selectedOption,$rootScope.proposition.selectedOption);
      $("#kpi").show();
      $(".spin-1").hide();
      $(".spin-2").show();
      $("#kpi_info").css('opacity','0');
      $("#table").css('opacity','0');
     }
// });
  function get(a,b){

    $scope.month.selectedOption = a;
    $scope.proposition.selectedOption = b

      $http({
          method: 'GET',
          url: '/Redshift',
          params: {
            sql: "SELECT a.ios_1star, a.ios_2star, a.ios_3star, a.ios_4star, a.ios_5star, a.android_1star, a.android_2star, a.android_3star, a.android_4star, a.android_5star, a.total_1star, a.total_2star, a.total_3star, a.total_4star, a.total_5star FROM domo.cdp2semantic.appannie_dataset_av as a inner join domo.cdp2monthlyrpt.months as b on a.month = b.month inner join cdp2monthlyrpt.proposition_mapping as c on a.proposition = c.proposition_domo where b.month_des='"+$scope.month.selectedOption.name+"' and c.proposition_recommendation='"+$scope.proposition.selectedOption.name+"'",
            details: "rating"
          }
      }).then(function(response){
          if(response.data.length >= '1'){
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
            sql: "select cdp2monthlyrpt.monthlyrpt_recomendation.id,cdp2monthlyrpt.monthlyrpt_recomendation.status,cdp2monthlyrpt.monthlyrpt_recomendation.prio,cdp2monthlyrpt.monthlyrpt_recomendation.theme,cdp2monthlyrpt.monthlyrpt_recomendation.key_insights,cdp2monthlyrpt.monthlyrpt_recomendation.recommendations from cdp2monthlyrpt.monthlyrpt_recomendation where upper(cdp2monthlyrpt.monthlyrpt_recomendation.month)='"+$scope.month.selectedOption.name+"' and cdp2monthlyrpt.monthlyrpt_recomendation.proposition ='"+$scope.proposition.selectedOption.name+"'",
            details: "suggestion"
          }
      }).then(function(response){
          $scope.suggestionData = response.data;
          if(response.data.length == '0'){
            $scope.suggestionData=[{"key_insights":"No suggestions Available!!!"}]
            //$("#data").html("<span style='margin-left:30%;padding:10px;'>No suggestions Available!!!</span>");
          };
      })

      $http({
          method: 'GET',
          url: '/Redshift',
          params: {
            sql: "select a.errorrate, a.errorrate_delta, a.crashrate, a.crashrate_delta, a.firstlaunches, a.firstlaunches_delta, a.total_unique_visitors, a.total_unique_visitors_delta, a.thirty_ret_rate_prospect,  a.thirty_day_retention_prospect_delta,  a.thirty_ret_rate_owner,a.thirty_day_retention_owner_delta, a.ninty_ret_rate, a.ninty_ret_rate_delta, a.avg_weekly_launch_per_user, a.avg_weekly_launch_per_user_delta, a.\"%engaged\", a.\"%engaged_delta\", a.total_avg_rating, a.total_avg_rating_delta, 0 as mat_avg_product_rating,0 as mat_avg_product_rating_delta,0 as marketable_reg_rate,0 as marketable_reg_rate_delta,a.buybuttonclicks, a.buybuttonclicks_delta From cdp2monthlyrpt.monthlyrpt_metric_all as a inner join cdp2monthlyrpt.months as b on a.month = b.month inner join cdp2monthlyrpt.proposition_mapping as c on a.proposition = c.proposition_domo where b.month_des='"+$scope.month.selectedOption.name+"' and c.proposition_recommendation='" +$scope.proposition.selectedOption.name+"'",
            details: "metric"
          }
      }).then(function(response){
        if(response.data.length > '0'){
          $scope.metricData_0 = (response.data[0].errorrate * 100).toFixed(2).concat("%");
          $scope.metricData_1 = (response.data[0].errorrate_delta * 100).toFixed(2).concat("%");
          $scope.metricData_2 = (response.data[0].crashrate * 100).toFixed(2).concat("%");
          $scope.metricData_3 = (response.data[0].crashrate_delta * 100).toFixed(2).concat("%");
          $scope.metricData_4 = Math.round(response.data[0].firstlaunches * 100) / 100;
          $scope.metricData_5 = (response.data[0].firstlaunches_delta * 100).toFixed(2).concat("%");
          $scope.metricData_6 = Math.round(response.data[0].total_unique_visitors * 100) / 100;
          $scope.metricData_7 = (response.data[0].total_unique_visitors_delta * 100).toFixed(2).concat("%");
          $scope.metricData_8 = Math.round(response.data[0].thirty_ret_rate_owner * 100) / 100;
          $scope.metricData_9 = (response.data[0].thirty_ret_rate_owner_delta * 100).toFixed(2).concat("%");
          $scope.metricData_10 = Math.round(response.data[0].thirty_ret_rate * 100) / 100;
          $scope.metricData_11 = (response.data[0].thirty_ret_rate_delta * 100).toFixed(2).concat("%");
          $scope.metricData_12 = Math.round(response.data[0].ninty_ret_rate * 100) / 100;
          $scope.metricData_13 = (response.data[0].ninty_ret_rate_delta * 100).toFixed(2).concat("%");
          $scope.metricData_14 = Math.round(response.data[0].avg_weekly_launch_per_user * 100) / 100;
          $scope.metricData_15 = (response.data[0].avg_weekly_launch_per_user_delta * 100).toFixed(2).concat("%");
          $scope.metricData_16 = Math.round(response.data[0].engaged * 100) / 100;
          $scope.metricData_17 = (response.data[0].engaged_delta * 100).toFixed(2).concat("%");
          $scope.metricData_18 = Math.round(response.data[0].total_avg_rating * 100) / 100;
          $scope.metricData_19 = Math.round(response.data[0].total_avg_rating_delta * 100) / 100;
          $scope.metricData_20 = Math.round(response.data[0].mat_avg_product_rating * 100) / 100;
          $scope.metricData_21 = Math.round(response.data[0].mat_avg_product_rating_delta * 100) / 100;
          $scope.metricData_22 = Math.round(response.data[0].marketable_reg_rate * 100) / 100;
          $scope.metricData_23 = (response.data[0].marketable_reg_rate_delta * 100).toFixed(1).concat("%");
          $scope.metricData_24 = Math.round(response.data[0].buybuttonclicks * 100) / 100;
          $scope.metricData_25 = (response.data[0].buybuttonclicks_delta * 100).toFixed(1).concat("%");
          $("#kpi").show();
          $("#kpi_info").css('opacity','1');
          $("#table").css('opacity','1');
          $(".spin-2").hide();
        }
        else{
          $scope.metricData_0 = $scope.metricData_1 = $scope.metricData_2 = $scope.metricData_3 = 
          $scope.metricData_4 = $scope.metricData_5 = $scope.metricData_6 = $scope.metricData_7 = 
          $scope.metricData_8 = $scope.metricData_9 = $scope.metricData_10 = $scope.metricData_11 = 
          $scope.metricData_12 = $scope.metricData_13 = $scope.metricData_14 = $scope.metricData_15 =  
          $scope.metricData_16 = $scope.metricData_17 = $scope.metricData_18 = $scope.metricData_19 = 
          $scope.metricData_20 = $scope.metricData_21 = $scope.metricData_22 = $scope.metricData_23 = 
          $scope.metricData_24 = $scope.metricData_25 = "N/A";
          $("#kpi").show();
          $("#kpi_info").css('opacity','1');
          $("#table").css('opacity','1');
          $(".spin-2").hide();
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

  $("#goedit").hide();
  $scope.prev = 1;

  $scope.hoverIn = function(n){
    // if($scope.edit1 == 1){
    //   $('#'+n+' #eddlt').css('display','block');
    //   $('#'+n+' #eddlt').css('backgroundColor','white');
    // }
  }
  $scope.hoverOut = function(n){
    // if($scope.edit1 == 1){
    //   $('#'+n+' #eddlt').css('display','none');
    // }
  }
  $scope.click = function(n){
    if($scope.edit1 == 1){
      $('#'+$scope.prev+' #eddlt').css('display', 'none');
      $('#'+n).css('backgroundColor','white');
      $('#'+n+' #eddlt').css('display','block');
      //$('#data:not(#'+n+')').css('backgroundColor', '#D3D3D3');
      $('#data > div').not('#'+n).css('backgroundColor', '#D3D3D3');
      //$('#data > div #eddlt').not('#'+n).css('display', 'none');
      $("#goedit").hide();
      $("#focus").show();
      $scope.prev = n;
    }
    else{
      alert("switch to edit tab to edit the suggestion");
    }
  }
  $(document).click(function(e) {
    if (e.target.id != 'suggestions' && !$('#suggestions').find(e.target).length) {
        $("#goedit").hide();
        $("#focus").show();
        $('#data > div').css('backgroundColor', '#D3D3D3');
        $('#'+$scope.prev+' #eddlt').css('display', 'none');
        $('#addButton').css('display','inline');
        $('#fields').remove();
        $('#sug_info').html('Suggestions:');
        // $window.scroll({
        //   top: 0, 
        //   left: 0, 
        //   behavior: 'smooth' 
        // });
    }
  });

  $scope.deleteSuggestion = function(index,n){
    //deleting the suggestion
    $(".spin-2").show();
    $("#kpi_info").css('opacity','0');
    $("#goedit").hide();
    $("#focus").show();
      $http({
          method: 'GET',
          url: '/Redshift',
          params: {
            sql: "delete from cdp2monthlyrpt.monthlyrpt_recomendation where cdp2monthlyrpt.monthlyrpt_recomendation.recommendations='"+n.recommendations+"' and cdp2monthlyrpt.monthlyrpt_recomendation.key_insights='"+n.key_insights+"'",
            details: ""
          }
      }).then(function(response){
        $('#'+index).remove();
        $("#kpi_info").css('opacity','1');
        $(".spin-2").hide();
        alert("deleted succesfully");
      })
  }

  $scope.editSuggestion = function(index,n){
    //editing the suggestion
    $scope.n = n;
    $scope.id = n.id;
    $("#goedit").show();
    $("#focus").hide();
    //$('#mySelect').val(n.prio);
    $scope.priority.selectedOption.id = n.prio;
    $scope.priority.selectedOption.name = n.prio;
    if(n.theme == 'Scale'){$scope.theme.selectedOption.id = '1';}
    else if(n.theme == 'Health'){$scope.theme.selectedOption.id = '2';}
    else if(n.theme == 'Retention'){$scope.theme.selectedOption.id = '3';}
    else if(n.theme == 'Advocacy'){$scope.theme.selectedOption.id = '4';}
    else if(n.theme == 'Conversion'){$scope.theme.selectedOption.id = '5';}
    else if(n.theme == 'Engagement'){$scope.theme.selectedOption.id = '6';}
    if(n.status == 'Implemented'){$scope.status.selectedOption.id = '1';}
    else if(n.status == 'Not Committed'){$scope.status.selectedOption.id = '2';}
    else if(n.status == 'In Progress'){$scope.status.selectedOption.id = '3';}
    else if(n.status == 'Rejected by business'){$scope.status.selectedOption.id = '4';}
  }

  $scope.updateSuggestion = function(){
    $(".spin-2").show();
    $("#kpi_info").css('opacity','0');
    $("#goedit").hide();
    $("#focus").show();
    $('#'+$scope.prev+' #eddlt').css('display', 'none');
    $http({
          method: 'GET',
          url: '/Redshift',
          params: {
            sql: "UPDATE domo.cdp2monthlyrpt.monthlyrpt_recomendation SET status = '"+$scope.status.selectedOption.name+"', prio = "+$scope.priority.selectedOption.name+" WHERE id = '"+$scope.n.id+"'",
            details: ""
          }
      }).then(function(response){
          get($scope.month.selectedOption,$scope.proposition.selectedOption);
      })
  }

  $scope.addSuggestion = function(){
    //updating the suggestion

    $(".spin-2").show();
    $("#kpi_info").css('opacity','0');
      $http({
          method: 'GET',
          url: '/Redshift',
          params: {
            sql: "INSERT INTO domo.cdp2monthlyrpt.monthlyrpt_recomendation (id, month, status, prio, proposition, theme, key_insights, recommendations, rally_ticket, deadline) VALUES ((SELECT ISNULL(MAX(id) + 1, 0) FROM domo.cdp2monthlyrpt.monthlyrpt_recomendation),'"+$scope.month.selectedOption.name+"','"+$scope.status.selectedOption.name+"','"+$scope.priority.selectedOption.name+"','"+$scope.proposition.selectedOption.name+"','"+$scope.theme.selectedOption.name+"','"+$scope.key+"','"+$scope.recom+"','"+$scope.ticket+"','"+$scope.deadline+"');",
            details: ""
          }
      }).then(function(response){
        console.log(response.data);
        $('#addButton').css('display','inline');
        $('#fields').remove();
        $('#sug_info').html('Suggestions:');
        get($scope.month.selectedOption,$scope.proposition.selectedOption);
        })
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
      {id:'1',name: 'Implemented'},{id:'2',name: 'Not Committed'},{id:'3',name: 'In Progress'},{id:'4',name: 'Rejected'}
    ],
    selectedOption: {id: '2', name: 'Not Committed'}
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
    $('#graphs').show();
    //location.reload();
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

  $('#addButton').click(function(){
      if($scope.edit1!=0){
        $('#sug_info').html('Add Suggestion:');
        $window.scroll({
          top: 210, 
          left: 0, 
          behavior: 'smooth' 
        });
        $('#addButton').css('display','none');
        //alert($scope.month.selectedOption.name);
        //alert('You clicked row '+ ($(this).index()+1) );
        //$scope.metric = $(this).find('td:nth-child(2)').text();
        $('#add').append($compile('<div id="fields" style="margin-top:-20px;"><br><input autofocus="autofocus" type="text" id="current Name" value=""'
          +'ng-model="key" placeholder="key_insight" style="margin:15px 0px 3px 10px;border-radius:8px;padding-left:5px;width:95%;font-weight:bold;text-transform: capitalize"/><br>'
          +'<textarea ng-model ="recom" placeholder="recommendation" rows="2" style="margin-left:10px;width:95%;border-radius:8px;padding-left:5px;"/><br>'
          +'<div><div id="theme_drpdown"><select ng-options="option.name for option in theme.availableOptions track by option.id" ng-model="theme.selectedOption"></select></div>'
          +'<div id="status_drpdown"><select name="mySelect" id="mySelect" ng-options="option.name for option in status.availableOptions track by option.id" ng-model="status.selectedOption"></select></div>'
          +'<div id="priority_drpdown"><select name="mySelect" id="mySelect" ng-options="option.name for option in priority.availableOptions track by option.id" ng-model="priority.selectedOption"></select></div><br>'
          +'<span style="margin-left:10px;">Ticket:</span><input autofocus="autofocus" type="text" id="current Name" ng-model="ticket" style="margin:10px 10px 3px 5px;border-radius:8px;padding:6px;width:280px;font-weight:bold;text-transform: capitalize"/><br>'
          +'<span style="margin-left:10px;">Deadline:</span><input id="date" type="date" style="border-radius:5px;margin:5px 0px 0px 5px;" ng-model="deadline"><div id="go"><i class="fa fa-arrow-right" aria-hidden="true" ng-click="addSuggestion()"></i></div></div></div>')($scope));
      }
      else{
        alert("switch to edit tab to add the suggestion");
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