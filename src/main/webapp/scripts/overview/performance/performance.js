angular.module('app')
.controller('PerformanceOvController',function($scope,$window,$http,$state,$rootScope){

	$('#overview div:first-child').css('background-color','black');
	$('#overview div:not(:nth-child(1))').css('background-color','#2C5757');

	$('#chart').show();

    // $scope.data = $rootScope.data;
    // $scope.month = $rootScope.current_month;
    // $scope.total = $rootScope.total;

    $('.fa-spin').show();
    $('table').hide();

	//data

    // if($rootScope.data == null || $rootScope.total == null){
	
      $http({
          method: 'GET',
          url: '/Overview',
          params: {
            sql: "select b.month_des, a.proposition, a.crashrate, a.crashrate_delta, a.firstlaunches, a.firstlaunches_delta, a.total_unique_visitors, a.total_unique_visitors_delta, a.thirty_ret_rate, a.thirty_ret_rate_delta, a.avg_weekly_launch_per_user, a.avg_weekly_launch_per_user_delta, a.total_avg_rating, a.total_avg_rating_delta, 0 as marketable_reg_rate,0 as marketable_reg_rate_delta From cdp2monthlyrpt.monthlyrpt_metric_all as a inner join cdp2monthlyrpt.months as b on a.month = b.month where a.month=(select max(month)from cdp2monthlyrpt.monthlyrpt_metric_all);",
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
    // }
    // else{
    //     $('.fa-spin').hide();
    //     $('table').show();
    // }

});