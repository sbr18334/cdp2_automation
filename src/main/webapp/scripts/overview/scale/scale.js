angular.module('app')
.controller('ScaleOvController',function($scope,$window,$http,$state){

  $('#overview div:nth-child(4)').css('background-color','white');
  $('#overview div:nth-child(4)').css('border-top','3px solid black');
  $('#overview div:nth-child(4)').css('border-bottom','0px');
  $('#overview div:not(:nth-child(4))').css('background-color','#f0f0f0');
  $('#overview div:not(:nth-child(4))').css('border','1px solid #e0e0e0');

	$('#chart').hide();
  $("#columnchart_material").hide();
  $(".fa-spin").show();

  $http({
      method: 'GET',
      url: '/Overview',
      params: {
        sql: "select b.month_des, a.total_unique_visitors, a.total_unique_visitors_delta, a.thirty_day_retention,  a.thirty_day_retention_delta,  a.ninty_day_retention,  a.ninty_day_retention_delta,  a.engaged_visitors,  a.engaged_visitors_delta,  0 as marketable_optin,0 as marketable_optin_delta, a.buybuttonclicks, a.buybuttonclicks_delta From cdp2monthlyrpt.monthlyrpt_metric_all as a inner join domo.cdp2monthlyrpt.months as b on a.month=b.month where a.proposition='Total' and a.month between (select CAST(DATE_TRUNC('month',max(month)-1)AS DATE) from cdp2monthlyrpt.monthlyrpt_metric_all) and (select max(month)from cdp2monthlyrpt.monthlyrpt_metric_all)",
        details: "scale"
      }
  }).then(function(response){
      $scope.m0 = response.data[0].month; $scope.m1 = response.data[1].month;
      $scope.scale_0 = response.data[0].total_unique_visitors;
      $scope.scale_1 = response.data[1].total_unique_visitors;
      $scope.scale_2 = response.data[0].thirty_day_retention;
      $scope.scale_3 = response.data[1].thirty_day_retention;
      $scope.scale_4 = response.data[0].ninty_day_retention;
      $scope.scale_5 = response.data[1].ninty_day_retention;
      $scope.scale_6 = response.data[0].engaged_visitors;
      $scope.scale_7 = response.data[1].engaged_visitors;
      $scope.scale_8 = response.data[0].marketable_optin;
      $scope.scale_9 = response.data[1].marketable_optin;
      $scope.scale_10 = response.data[0].buybuttonclicks;
      $scope.scale_11 = response.data[1].buybuttonclicks;
      $("#columnchart_material").show();
      $(".fa-spin").hide();
      drawChart();

  })
	
	google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ['Metric', $scope.m0, $scope.m1],
        ['MAU', $scope.scale_0, $scope.scale_1],
        ['30-Day Continuos users', $scope.scale_2, $scope.scale_3],
        ['90+ Day Continuos users', $scope.scale_4, $scope.scale_5],
        ['Engaged users', $scope.scale_6, $scope.scale_7],
        ['Users opting in for marketing', $scope.scale_8, $scope.scale_9],
        ['Users purchase intent', $scope.scale_10, $scope.scale_11]
      ]);

      var options = {
        chart: {
          title: '..'
        },
        chartArea:{left:100,right:20,width:"70%",height:"100%"},
        backgroundColor: '#156CA1',
        colors: ['white','#D3D8DC'],
        hAxis: {
            textStyle:{color: 'white'}
        },
        vAxis: {
            textStyle:{color: 'white'}
        },
        legend: {
        	textStyle: {color: 'white'}
        }
      };

      var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

      chart.draw(data, google.charts.Bar.convertOptions(options));
    }
    $(window).resize(function(){
  	  drawChart();
  	});
});