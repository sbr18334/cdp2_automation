angular.module('app')
.controller('KpiController',function($scope,$window,$http,$state,$compile){

	  $('#tabs div:nth-child(2)').css('background-color','#EAEEE9');
    $('#tabs div:nth-child(2)').css('color','#107ABA');
    $('#tabs div:not(:nth-child(2))').css('background-color','#107ABA');
    $('#tabs div:not(:nth-child(2))').css('color','#EAEEE9');

    $('#view').css('border-bottom','3px solid green');
    $('#view').css('font-weight','bold');

    $scope.edit1 = 0;

    $scope.data = {
    availableOptions: [
      {id:'1',name: 'Sonicare Connected'},{id:'2',name: 'AirFryer'},{id:'3',name: 'Easy Weaning'},
      {id:'4',name:'Lumea IPL'},{id:'5',name: 'Sonicare for kids'},{id:'6',name:'uGrow'},
      {id:'7',name:'Grooming'},{id:'8',name:'Health Drinks'},{id:'9',name:'Smart baby monitor'}
    ],
    selectedOption: {id: '1', name: 'Sonicare Connected'} //This sets the default value of the select in the ui
    };

    $scope.month = {
      availableOptions: [
      {id:'1',name:"Jan-16"},{id:'2',name:"Feb-16"},{id:'3',name:"Mar-16"},{id:'4',name:"Apr-16"},
      {id:'5',name:"May-16"},{id:'6',name:"June-16"},{id:'7',name:"July-16"},{id:'8',name:"Aug-16"},
      {id:'9',name:"Sep-16"},{id:'10',name:"Oct-16"},{id:'11',name:"Nov-16"},{id:'12',name:"Dec-16"},{id:'13',name:"Jan-17"}
      ],
    selectedOption: {id: '1', name: 'Jan-16'}
    }

    ///functions///////
    $scope.edit = function(){
    // $('#graphs').hide();
    $('#graphs').css('opacity','0');
    $('#graphs').css('transition','linear 0.5s')
    $('#edit').css('border-bottom','3px solid green');
    $('#edit').css('font-weight','bold');
    $('#view').css('font-weight','normal');
    $('#view').css('border-bottom','0px');
    $scope.edit1 = 1;
    }
    $scope.view = function(){
      // $('#graphs').show()
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
          details: $scope.data2,
          metric: $scope.metric
        }
      }).then(function(response){
    	  
      })
      location.reload();


    }

    $('.fa-plus-circle').click( function(){
        if($scope.edit1!=0){
          $(window).scrollTop(210);
          $('.fa-plus-circle').css('opacity','0');
          //alert($scope.month.selectedOption.name);
          //alert('You clicked row '+ ($(this).index()+1) );
          //$scope.metric = $(this).find('td:nth-child(2)').text();
          $('#data').append($compile('<input autofocus="autofocus" type="text" id="current Name" value=""'
            +'ng-model="data1" style="margin-bottom:2px;width:100%;font-weight:bold;text-transform: capitalize"/><br><textarea'
            +' ng-model ="data2" rows="2" style="width:100%;"/>&nbsp;<i ng-click="addData(metric)" class="fa fa-plus-circle fa-lg"' 
            +'aria-hidden="true"></i>')($scope));
        }

    });
    //////////////

    /////graphs///////////////

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawpie);
  google.charts.setOnLoadCallback(drawline);

  function drawpie() {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['5star', 4],
      ['4star', 2],
      ['3star', 2],
      ['2star', 3],
      ['1star', 1]
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
      ['5star', 4],
      ['4star', 2],
      ['3star', 2],
      ['2star', 3],
      ['1star', 1]
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
      ['5star', 4],
      ['4star', 2],
      ['3star', 2],
      ['2star', 3],
      ['1star', 1]
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