angular.module('app')
.controller('BenchmarksController',function($scope,$window,$http,$state){
	//styling//
	  $('#tabs div:nth-child(3)').css('background-color','#EAEEE9');
      $('#tabs div:nth-child(3)').css('color','#107ABA');
      $('#tabs div:not(:nth-child(3))').css('background-color','#107ABA');
      $('#tabs div:not(:nth-child(3))').css('color','#EAEEE9');
    //

    $scope.data = {
      availableOptions: [
      {id:'1',name:"Error rate"},{id:'2',name:"Crash rate"},{id:'3',name:"First Launches"},{id:'4',name:"MAU"},
      {id:'5',name:"Owner 30-day retention"},{id:'6',name:"Buy Clicks"},{id:'7',name:"MAT avg. Rating"},
      {id:'8',name:"% of engaged users"}
      ],
    selectedOption: {id: '1', name: 'Error rate'}
    }

    ////graph////
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Sonicare for kids', 'Airfryer', 'Grooming Guide', 'Smart Baby Monitor', 'uGrowth Healthy Baby',
           'Healthy Drinks', 'Easy Weaning', 'Lumea IPL', 'Sonicare Connected', 'Average'],
          ['Jun-16',  1000,  400,  800,  200,  300,  500,  1200,  900,  690,  400],
          ['July-16',  1150,  460,  900,  300,  440,  540,  1300,  990,  650,  600],
          ['Aug-16',  960,   600,  850,  400,  500,  520,  1400,  890,  780,  400],
          ['Sep-16',  970,  440,  700,  340,  600,  560,  1290,  980,  800,  400],
          ['Oct-16',  830,  540,  900,  390,  500,  510,  1190,   1010,  720,  400],
          ['Nov-16',  1030,  640,  1000,  400,  410,  600,  1160,  1000,  800,  600],
          ['Dec-16',  1230,  320,  890,  450,  490,  700,  1210,  900,  770,  400],
          ['Jan-17',  1000,  400,  800,  200,  300,  500,  1200,  900,  690,  400],
          ['Feb-17',  1150,  460,  900,  300,  440,  540,  1300,  990,  650,  600],
          ['Mar-17',  960,   600,  850,  400,  500,  520,  1400,  890,  780,  400],
          ['Apr-17',  970,  440,  700,  340,  600,  560,  1290,  980,  800,  400],
          ['May-17',  830,  540,  900,  390,  500,  510,  1190,   1010,  720,  400],
          ['Jun-17',  1030,  640,  1000,  400,  410,  600,  1160,  1000,  800,  600],
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
      $(window).resize(function(){
    	  drawChart();
    	});
      ////
});