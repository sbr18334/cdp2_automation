angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider
            .state('performance', {
                url: '/performance',
                parent: 'overview',
                views: {
                    'nested@overview': {
                        templateUrl: 'scripts/overview/performance/performance.html',
                        controller: 'PerformanceOvController'
                    }
                },
                data: {
                      css: [
                        'scripts/overview/performance/performance.css',
                        {
                          name: 'performance',
                          href: 'overview/performance/performance.css'
                        }
                      ]
                },
                resolve: {

                }
            });
    });
