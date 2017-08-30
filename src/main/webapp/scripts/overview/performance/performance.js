angular.module('app')
.controller('PerformanceOvController',function($scope,$window,$http,$state){

	$('#overview div:first-child').css('background-color','green');
	$('#overview div:not(:nth-child(1))').css('background-color','black');

	$('#chart').show();

	    //data
    $scope.data=[
    	{
    	"one":"Average/Total","two":"9.3","three":"-7%","four":"37.2k","five":"+11%","six":"217.1k",
    	"seven":"+3%","eight":"35%","nine":"-7%","ten":"13.48",
    	"eleven":"-14%","twelve":"9.54","thirteen":"-1.03","fourteen":"4%","fifteen":"-12%"
    	},{
    	"one":"Sonicare for kids","two":"1.3","three":"-4%","four":"29.4k","five":"+7%","six":"107.1k",
    	"seven":"+0%","eight":"55%","nine":"-2%","ten":"3.48",
    	"eleven":"-4%","twelve":"3.54","thirteen":"-0.03","fourteen":"1%","fifteen":"-2%"
    	},{
    	"one":"Airfryer","two":"1.3","three":"-4%","four":"29.4k","five":"+7%","six":"107.1k",
    	"seven":"+0%","eight":"55%","nine":"-2%","ten":"3.48",
    	"eleven":"-4%","twelve":"3.54","thirteen":"-0.03","fourteen":"1%","fifteen":"-2%"
    	},{
    	"one":"Easy weaning","two":"1.3","three":"-4%","four":"29.4k","five":"+7%","six":"107.1k",
    	"seven":"+0%","eight":"55%","nine":"-2%","ten":"3.48",
    	"eleven":"-4%","twelve":"3.54","thirteen":"-0.03","fourteen":"1%","fifteen":"-2%"
    	},{
    	"one":"Lumea IPL","two":"1.3","three":"-4%","four":"29.4k","five":"+7%","six":"107.1k",
    	"seven":"+0%","eight":"55%","nine":"-2%","ten":"3.48",
    	"eleven":"-4%","twelve":"3.54","thirteen":"-0.03","fourteen":"1%","fifteen":"-2%"
    	},{
    	"one":"Sonicare Connected","two":"1.3","three":"-4%","four":"29.4k","five":"+7%","six":"107.1k",
    	"seven":"+0%","eight":"55%","nine":"-2%","ten":"3.48",
    	"eleven":"-4%","twelve":"3.54","thirteen":"-0.03","fourteen":"1%","fifteen":"-2%"
    	},{
    	"one":"uGrow(beta)","two":"1.3","three":"-4%","four":"29.4k","five":"+7%","six":"107.1k",
    	"seven":"+0%","eight":"55%","nine":"-2%","ten":"3.48",
    	"eleven":"-4%","twelve":"3.54","thirteen":"-0.03","fourteen":"1%","fifteen":"-2%"
    	},{
    	"one":"Grooming","two":"1.3","three":"-4%","four":"29.4k","five":"+7%","six":"107.1k",
    	"seven":"+0%","eight":"55%","nine":"-2%","ten":"3.48",
    	"eleven":"-4%","twelve":"3.54","thirteen":"-0.03","fourteen":"1%","fifteen":"-2%"
    	},{
    	"one":"Smart Baby Monitor","two":"1.3","three":"-4%","four":"29.4k","five":"+7%","six":"107.1k",
    	"seven":"+0%","eight":"55%","nine":"-2%","ten":"3.48",
    	"eleven":"-4%","twelve":"3.54","thirteen":"-0.03","fourteen":"1%","fifteen":"-2%"
    	},{
    	"one":"Healthy Drinks","two":"1.3","three":"-4%","four":"29.4k","five":"+7%","six":"107.1k",
    	"seven":"+0%","eight":"55%","nine":"-2%","ten":"3.48",
    	"eleven":"-4%","twelve":"3.54","thirteen":"-0.03","fourteen":"1%","fifteen":"-2%"
    	}
    ]
    //data//

});