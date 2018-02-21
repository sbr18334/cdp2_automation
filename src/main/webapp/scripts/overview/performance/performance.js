angular.module('app')
.controller('PerformanceOvController',function($scope,$window,$http,$state,$rootScope){

	$('#overview div:first-child').css('background-color','white');
  $('#overview div:first-child').css('border-top','3px solid black');
  $('#overview div:first-child').css('border-bottom','0px');
	$('#overview div:not(:nth-child(1))').css('background-color','#f0f0f0');
  $('#overview div:not(:nth-child(1))').css('border','1px solid #e0e0e0');

	$('#chart').show();

  $('.fa-spin').show();
  $('#content').show();
  $('table').hide();

  $http({
      method: 'GET',
      url: '/Overview',
      params: {
        sql: "select b.month_des,a.proposition,CAST(a.crashrate*100 as decimal(18,2)) as crashrate, CAST(a.crashrate_delta*100 as decimal(18,2)) as crashrate_delta, a.firstlaunches,CAST(a.firstlaunches_delta*100 as decimal(18,2)) as firstlaunches_delta, a.total_unique_visitors, CAST(a.total_unique_visitors_delta*100 as decimal(18,2)) as total_unique_visitors_delta, CAST(a.thirty_ret_rate as decimal(18,2)), CAST(a.thirty_ret_rate_delta*100 as decimal(18,2)) as thirty_ret_rate_delta, CAST(a.avg_weekly_launch_per_user as decimal(18,2)), CAST(a.avg_weekly_launch_per_user_delta*100 as decimal(18,2)) as avg_weekly_launch_per_user_delta, CAST(a.total_avg_rating as decimal(18,2)), CAST(a.total_avg_rating_delta as decimal(18,2)), 0 as marketable_reg_rate,0 as marketable_reg_rate_delta From cdp2monthlyrpt.monthlyrpt_metric_all as a inner join cdp2monthlyrpt.months as b on a.month = b.month where a.month=(select max(month)from cdp2monthlyrpt.monthlyrpt_metric_all);",
        details: "performance"
      }
  }).then(function(response){
      for(var i=0;i<response.data.length;i++){
        if(response.data[i].proposition == 'Total'){
            $scope.total = response.data[i];
            // $rootScope.total = $scope.total;
            response.data.splice(i,1);
        }
      }
      $scope.data = response.data;
      // $rootScope.data = $scope.data;
      $scope.month = response.data[0].month;
      // $rootScope.current_month = $scope.month;
      $('.fa-spin').hide();
      $('table').show();
  })

});