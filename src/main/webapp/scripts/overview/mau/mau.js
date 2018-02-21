angular.module('app')
.controller('MauOvController',function($scope,$window,$http,$state){

  $('#overview div:nth-child(3)').css('background-color','white');
  $('#overview div:nth-child(3)').css('border-top','3px solid black');
  $('#overview div:nth-child(3)').css('border-bottom','0px');
  $('#overview div:not(:nth-child(3))').css('background-color','#f0f0f0');
  $('#overview div:not(:nth-child(3))').css('border','1px solid #e0e0e0');

	$('#chart').hide();
	
	$(function () {

    	// First, let's make the colors transparent
    	Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
    		return Highcharts.Color(color)
    			.setOpacity(0.5)
    			.get('rgba');
    	});

        $('#container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'title',
                style: {
                	opacity:'0'
                }
            },
            subtitle: {
                text: null,
                style: {
                    display: 'none'
                }
            },
            credits: {
                enabled: false
            },
            exporting: {
            	enabled: false
        	},
            xAxis: {
                categories: [
                    'Sonicare Connected',
                    'Sonicare for kids',
                    'Mother and Childcare',
                    'Kitchen Aplliances'
                ]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'MAU'
                }
            },
            legend: {
                layout: 'vertical',
                backgroundColor: '#FFFFFF',
                align: 'left',
                verticalAlign: 'top',
                x: 100,
                y: 70,
                floating: true,
                shadow: true
            },
            tooltip: {
                shared: true,
                valueSuffix: ''
            },
            plotOptions: {
                column: {
                	grouping: false,
                	shadow: false
                }
            },
            series: [{
                name: 'Competitor',
                data: [300, 135, 870, 903],
                pointPadding: 0,
                color:'silver'

            }, {
                name: 'Philips',
                data: [22, 107, 17.5,42.6],
                pointPadding: 0.2,
                color:'#107ABA'

            }]
        });
    });



});