angular.module('app')
.controller('BenchmarksController',function($scope,$window,$http,$state,$rootScope){
	//styling//
	  $('#tabs div:nth-child(4)').css('background-color','#EAEEE9');
      $('#tabs div:nth-child(4)').css('color','#107ABA');
      $('#tabs div:not(:nth-child(4))').css('background-color','#107ABA');
      $('#tabs div:not(:nth-child(4))').css('color','#EAEEE9');
    //
      $("#benchmark div").css('opacity','0');
      $(".fa-spin").show();

    $scope.update = function(){
      get($scope.metric.selectedOption)
    }

    $scope.metic = $rootScope.metric;
    if($scope.metric == null){
      $http({
            method: 'GET',
            url: '/Benchmark',
            params: {
              sql: "SELECT * FROM cdp2monthlyrpt.metrics order by metric_name asc",
              details: "metric"
            }
        }).then(function(response){
            $rootScope.metric = response.data;
            $rootScope.metric.selectedOption = response.data[0];
            $scope.metric = $rootScope.metric;
            $("#benchmark div").css('opacity','1');
            $(".fa-spin").hide();
            get($scope.metric.selectedOption)
        })
      }
      else{
            $("#benchmark div").css('opacity','1');
            $(".fa-spin").hide();
      }

      /////////////////////month////////////////////////////
      function get(a){
        $http({
            method: 'GET',
            url: '/Redshift',
            params: {
              sql: "select distinct(b.month_des) from cdp2monthlyrpt.monthlyrpt_metric_all as a inner join cdp2monthlyrpt.months as b on a.month = b.month order by a.month desc;",
              details: "months"
            }
        }).then(function(response){
            $scope.month = response.data;
        })
        /////////////////////month////////////////////////////
        /////////////////////proposition//////////////////////
        $http({
            method: 'GET',
            url: '/Redshift',
            params: {
              sql: "select distinct(proposition) from cdp2monthlyrpt.monthlyrpt_metric_all where proposition<>'Total';",
              details: "proposition"
            }
        }).then(function(response){
            $scope.proposition = response.data;
            drawChart();
        })
        /////////////////////proposition//////////////////////        
        /////////////////////data//////////////////////
        $http({
            method: 'GET',
            url: '/Benchmark',
            params: {
              sql: "select  b.month_des, a.proposition, a."+a.name+" From cdp2monthlyrpt.monthlyrpt_metric_all as a inner join cdp2monthlyrpt.months as b on a.month = b.month where proposition<>'Total';",
              details: "data"
            }
        }).then(function(response){
            $scope.data = response.data;
            //drawChart();
        })
        /////////////////////data//////////////////////
      }


    ////graph////
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Year', $scope.proposition[0].name, $scope.proposition[1].name, $scope.proposition[2].name, $scope.proposition[3].name,
           $scope.proposition[4].name,$scope.proposition[5].name, $scope.proposition[6].name, $scope.proposition[7].name,
           $scope.proposition[8].name,$scope.proposition[9].name,$scope.proposition[10].name,$scope.proposition[11].name,
           $scope.proposition[12].name,$scope.proposition[13].name,$scope.proposition[14].name],
          [$scope.month[12].name,  1000,  400,  800,  200,  300,  500,  1200,  900,  690,  400,  500,  1230,  900,  690,  400],
          [$scope.month[11].name,  1150,  460,  900,  300,  440,  540,  1300,  990,  650,  600,  500,  720,  900,  690,  400],
          [$scope.month[10].name,  960,   600,  850,  400,  500,  520,  1400,  890,  780,  400,  500,  1200,  900,  690,  400],
          [$scope.month[9].name,  970,  440,  700,  340,  600,  560,  1290,  980,  800,  400,  500,  1200,  900,  690,  400],
          [$scope.month[8].name,  830,  540,  900,  390,  500,  510,  1190,   1010,  720,  400,  500,  1200,  900,  690,  400],
          [$scope.month[7].name,  1030,  640,  1000,  400,  410,  600,  1160,  1000,  800,  600,  500,  1200,  900,  690,  400],
          [$scope.month[6].name,  1230,  320,  890,  450,  490,  700,  1210,  900,  770,  400,  500,  1200,  900,  690,  400],
          [$scope.month[5].name,  1000,  400,  800,  200,  300,  500,  1200,  900,  690,  400,  500,  1200,  900,  690,  400],
          [$scope.month[4].name,  1150,  460,  900,  300,  440,  540,  1300,  990,  650,  600,  500,  1200,  900,  690,  400],
          [$scope.month[3].name,  960,   600,  850,  400,  500,  520,  1400,  890,  780,  400,  500,  1200,  900,  690,  400],
          [$scope.month[2].name,  970,  440,  700,  340,  600,  560,  1290,  980,  800,  400,  500,  1200,  900,  690,  400],
          [$scope.month[1].name,  830,  540,  900,  390,  500,  510,  1190,   1010,  720,  400,  500,  1200,  900,  690,  400],
          [$scope.month[0].name,  1030,  640,  1000,  400,  410,  600,  1160,  1000,  800,  600,  500,  1200,  900,  690,  400],
        ]);

        var options = {
          curveType: 'function',
          legend: { position: 'right' },
          backgroundColor:'#D3D3D3',
          chartArea: {top:50,left:70,bottom:40,width:'78%'},
          vAxis: { gridlines: {color:'#333', count: 4 } }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }
     //  $(window).resize(function(){
    	//   drawChart();
    	// });
      ////
});