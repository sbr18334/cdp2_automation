angular.module('app')
.controller('RecommendationOvController',function($scope,$window,$http,$state){

	$('#overview div:nth-child(2)').css('background-color','black');
	$('#overview div:not(:nth-child(2))').css('background-color','#2C5757');

	$('#chart').hide();

	google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    google.charts.setOnLoadCallback(drawChart1);

    function drawChart() {
    	   // Define the chart to be drawn.
    	   var data = google.visualization.arrayToDataTable([
    	      ['Year', 'Asia', 'Europe' ,'Africa'],
    		  ['2012',  700, 390, 220],
    	      ['2013',  600, 400, 374],
    	      ['2014',  470, 440, 120],
    	      ['2015',  650, 480,230],
    	      ['2016',  930, 340, 222],
    	      ['2013',  500, 400, 283],
    	      ['2014',  270, 440, 335],
    	      ['2015',  550, 480, 242],
    	      ['2016',  330, 240, 122]
    	      ]);

    	   var options = {
		      width: 450,
		      height: 500,
		      legend: { position: 'none' },
		      bar: { groupWidth: '75%' },
		      chartArea: {left: 50,top: 50},
		      hAxis: { textPosition: 'none' },
		      isStacked: true,
		      colors: ['#279423','#E5A9CE','#DC6464']
    	   };  

    	   // Instantiate and draw the chart.
    	   var chart = new google.visualization.BarChart(document.getElementById('barchart_material'));
    	   chart.draw(data, options);
    	}

	function drawChart1() {
    	   // Define the chart to be drawn.
    	   var data = google.visualization.arrayToDataTable([
    	      ['Year', 'Asia', 'Europe' ,'Africa'],
    		  ['2012',  100, 190, 220],
    	      ['2013',  100, 200, 174],
    	      ['2014',  170, 240, 120],
    	      ['2015',  150, 280,230],
    	      ['2016',  270, 140, 322],
    	      ['2013',  200, 200, 383],
    	      ['2014',  370, 240, 435],
    	      ['2015',  490, 380, 342],
    	      ['2016',  430, 240, 422],    	     
    	      ['2016',  630, 340, 322],
    	      ['2013',  700, 300, 383],
    	      ['2014',  670, 240, 335],
    	      ['2015',  750, 380, 242],
    	      ['2017', 740,233,421]
    	      ]);

    	   var options = {
		      width: 700,
		      height: 400,
		      backgroundColor: '#F9F9F9',
		      legend: { position:'none' },
		      bar: { groupWidth: '75%' },
		      chartArea: {left: 30,top: 50,bottom: 30},
		      hAxis: { textPosition: 'none'},
		      vAxis: { textPosition: 'none'},
		      isStacked: true,
		      colors:['#279423','#E5A9CE', '#DC6464'],
    	   };  

    	   // Instantiate and draw the chart.
    	   var chart = new google.visualization.ColumnChart(document.getElementById('barchart_material1'));
    	   chart.draw(data, options);
    	}
	
	
	/////pie chart/////
    google.charts.setOnLoadCallback(drawPie);

    function drawPie() {

      var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work',     7],
        ['Eat',      4],
        ['Commute',  2]
      ]);

      var options = {
    		  width:250,
    		  height:250,
		      legend: { position:'none' },
		      backgroundColor: '#F9F9F9',
		      colors:['#279423','#E5A9CE', '#DC6464'],
      };

      var chart = new google.visualization.PieChart(document.getElementById('piechart'));

      chart.draw(data, options);
    }
    /////pie-chart/////
});