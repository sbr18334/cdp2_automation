angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider
            .state('benchmarks', {
                url: '/benchmarks',
                views: {
                    'content@': {
                        templateUrl: 'scripts/benchmarks/benchmarks.html',
                        controller: 'BenchmarksController'
                    }
                },
                data: {
                      css: 
                        'scripts/benchmarks/benchmarks.css'
                },
                resolve: {

                }
            });
    });
