angular.module('app')
.controller('ScaleOvController',function($scope,$window,$http,$state){

	$('#overview div:nth-child(4)').css('background-color','green');
	$('#overview div:not(:nth-child(4))').css('background-color','black');

	$('#chart').hide();
	
	google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ['Metric', 'May-17', 'June-17'],
        ['MAU', 1000, 400],
        ['30-Day Continuos users', 1170, 460],
        ['90+ Day Continuos users', 660, 1120],
        ['Engaged users', 1030, 540],
        ['Users opting in for marketing', 72,40],
        ['Users purchase intent', 73, 22]
      ]);

      var options = {
        chart: {
          title: '..'
        },
        chartArea:{left:100,right:20,width:"70%",height:"100%"},
        backgroundColor: '#204C90',
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