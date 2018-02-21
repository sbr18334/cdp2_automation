angular.module('app')
.controller('RecommendationOvController',function($scope,$window,$http,$state){

  $('#overview div:nth-child(2)').css('background-color','white');
  $('#overview div:nth-child(2)').css('border-top','3px solid black');
  $('#overview div:nth-child(2)').css('border-bottom','0px');
  $('#overview div:not(:nth-child(2))').css('background-color','#f0f0f0');
  $('#overview div:not(:nth-child(2))').css('border','1px solid #e0e0e0');

	$('#chart').hide();
    $scope.info = '';

    /////////////////////////////////db calls for all three charts///////////////////////////////////
    $scope.$on('$viewContentLoaded', function() {
        $http({
          method: 'GET',
          url: '/Overview',
          params: {
            sql: "SELECT case when status = 'Implemented' then 'Implemented'"+
                         "when status = 'implemented' then 'Implemented'"+
                         "when status = 'Not Committed' then 'Not Committed'"+
                         "when status = 'in progress' then 'In progress'"+
                         "when status = 'In progress' then 'In progress'"+
                         "when status = 'Not committed' then 'Not Committed'"+
                  "else status end"+
           ", count(recommendations)"+
            "FROM cdp2monthlyrpt.monthlyrpt_recomendation a,cdp2monthlyrpt.proposition_mapping b where a.proposition=b.proposition_recommendation and inc_flg=1 and status<>'Rejected by business' group by 1;",
            details: "pie"
        }
        }).then(function(response){//imp//notcom//inpro
          for(var i=0;i<response.data.length;i++){
            if(response.data[i].status=="In progress"){$scope.prog = response.data[i].count;}
            else if(response.data[i].status=="Implemented"){$scope.imp = response.data[i].count;}
            else if(response.data[i].status=="Not Committed"){$scope.not_com = response.data[i].count;}
            drawPie();
          } 
        })
        $http({
          method: 'GET',
          url: '/Overview',
          params: {
            sql: "SELECT proposition, NVL(max(case when status = 'Implemented' then cnt end),0) as Implemented, NVL(max(case when status = 'Not Committed' then cnt end),0) as Not_Committed, NVL(max(case when status = 'In progress' then cnt end),0) as In_progress from (SELECT proposition_domo as proposition, case when status = 'Implemented' then 'Implemented' when status = 'implemented' then 'Implemented' when status = 'Not Committed' then 'Not Committed' when status = 'in progress' then 'In progress' when status = 'In progress' then 'In progress' when status = 'Not committed' then 'Not Committed' else status end as status, count(recommendations) cnt FROM cdp2monthlyrpt.monthlyrpt_recomendation a,cdp2monthlyrpt.proposition_mapping b where a.proposition=b.proposition_recommendation and inc_flg=1 and status<>'Rejected by business' group by 1,2)d group by 1;",
            details: "horizontal"
        }
        }).then(function(response){
              $scope.info = {};
              var i = 0;
              while(i<response.data.length){
                    var ang = [];
                    ang[0] = response.data[i].proposition;
                    ang[1] = response.data[i].in_progress;
                    ang[2] = response.data[i].not_committed;
                    ang[3] = response.data[i].implemented;
                    $scope.info[i]= ang;
                    i++;
              }
              drawChart(i);
        })
        $http({
          method: 'GET',
          url: '/Overview',
          params: {
            sql: "SELECT month, NVL(max(case when status = 'Implemented' then cnt end),0) as Implemented, NVL(max(case when status = 'Not Committed' then cnt end),0) as Not_Committed, NVL(max(case when status = 'In progress' then cnt end),0) as In_progress from ( SELECT month, case when status = 'Implemented' then 'Implemented' when status = 'implemented' then 'Implemented' when status = 'Not Committed' then 'Not Committed' when status = 'in progress' then 'In progress' when status = 'In progress' then 'In progress' when status = 'Not committed' then 'Not Committed'else status end as status, count(recommendations) as cnt FROM cdp2monthlyrpt.monthlyrpt_recomendation a,cdp2monthlyrpt.proposition_mapping c where  a.proposition=c.proposition_recommendation and inc_flg=1 and status<>'Rejected by business' group by 1,2)d group by 1;",
            details: "vertical"
        }
        }).then(function(response){
              $scope.info = {};
              var i = 0;
              while(i<response.data.length){
                    var ang = [];
                    ang[0] = response.data[i].month;
                    ang[1] = response.data[i].in_progress;
                    ang[2] = response.data[i].not_committed;
                    ang[3] = response.data[i].implemented;
                    $scope.info[i]= ang;
                    i++;
              }

              drawChart1(i);

        })
    })
    ///////////////////////////////////////////////////////////////////////////////////////////////////////


    	google.charts.load('current', {packages: ['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        google.charts.setOnLoadCallback(drawChart1);

        function drawChart(j) {
        
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Proposition');
            data.addColumn('number', 'In Progress');
            data.addColumn('number', 'Not Committed');
            data.addColumn('number', 'Implemented');

            for (var i = 0; i < j; i++) {
                 data.addRow([$scope.info[i][0],$scope.info[i][1],$scope.info[i][2],$scope.info[i][3]]);
            }


        	   var options = {
    		      width: 450,
    		      height: 500,
    		      legend: { position: 'none' },
    		      bar: { groupWidth: '75%' },
    		      chartArea: {left: 50,top: 50},
    		      hAxis: { textPosition: 'none' },
    		      isStacked: true,
    		      colors: ['#DC6464','#E5A9CE','#279423']
        	   };  

        	   // Instantiate and draw the chart.
        	   var chart = new google.visualization.BarChart(document.getElementById('barchart_material'));
        	   chart.draw(data, options);
        	}

    	function drawChart1(j) {
        	   // Define the chart to be drawn.
          var data = new google.visualization.DataTable();
            data.addColumn('string', 'Month');
            data.addColumn('number', 'In Progress');
            data.addColumn('number', 'Not Committed');
            data.addColumn('number', 'Implemented');

            for (var i = 0; i < j; i++) {
                 data.addRow([$scope.info[i][0],$scope.info[i][1],$scope.info[i][2],$scope.info[i][3]]);
            }

        	   var options = {
    		      width: 700,
    		      height: 400,
    		      backgroundColor: '#F9F9F9',
    		      legend: { position:'none' },
    		      bar: { groupWidth: '75%' },
    		      chartArea: {left: 30,top: 50,bottom: 30},
    		      // hAxis: { textPosition: 'none'},
    		      // vAxis: { textPosition: 'none'},
    		      isStacked: true,
    		      colors:['#DC6464','#E5A9CE', '#279423'],
        	   };  

        	   // Instantiate and draw the chart.
        	   var chart = new google.visualization.ColumnChart(document.getElementById('barchart_material1'));
        	   chart.draw(data, options);
        	}
    	
    	
    	/////pie chart/////
        google.charts.setOnLoadCallback(drawPie);

        function drawPie() {

          var data = google.visualization.arrayToDataTable([
            ['status', 'Count'],
            ['Implemented',     $scope.imp],
            ['Not Committed',     $scope.not_com],
            ['In progress',      $scope.prog]
          ]);

          var options = {
        		  width:320,
        		  height:320,
    		      legend: { position:'none' },
    		      backgroundColor: '#F9F9F9',
    		      colors:['#279423','#E5A9CE', '#DC6464'],
          };

          var chart = new google.visualization.PieChart(document.getElementById('piechart'));

          chart.draw(data, options);
        }
        /////pie-chart/////
});