angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider
            .state('kpi', {
                url: '/kpi',
                views: {
                    'content@': {
                        templateUrl: 'scripts/kpi/kpi.html',
                        controller: 'KpiController'
                    }
                },
                data: {
                      css: 
                        'scripts/kpi/kpi.css'
                },
                resolve: {

                }
            });
    });
