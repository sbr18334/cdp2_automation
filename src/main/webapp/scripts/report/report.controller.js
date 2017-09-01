angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider
            .state('report', {
                url: '/report',
                views: {
                    'content@': {
                        templateUrl: 'scripts/report/report.html',
                        controller: 'ReportController'
                    }
                },                
                data: {
                      css: 
                    	  'scripts/report/report.css'
                },
                resolve: {

                }
            });
    });
