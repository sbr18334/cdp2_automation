angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider
            .state('overview', {
                url: '/overview',
                views: {
                    'content@': {
                        templateUrl: 'scripts/overview/overview.html',
                        controller: 'OverviewController'
                    }
                },
                data: {
                      css: 
                        'scripts/overview/overview.css'
                },
                resolve: {

                }
            });
    });
