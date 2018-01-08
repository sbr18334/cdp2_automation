angular.module('app')
.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
		.state('404', {
			url: '/error',	
			views: {
	            'error@': {
	        		template: "<div><br><b>ERROR</b><br><br>Page with the given URL Doesn't exist</div><img style='height:80%;margin-top:20px;' src='assets/404.png'>",
	        		controller: "ErrorController"
	            }
	        },
	});
    $urlRouterProvider.otherwise(function($injector, $location){
        var state = $injector.get('$state');
        state.go('404');
        return $location.path();
     });
})