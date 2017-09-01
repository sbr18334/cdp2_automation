angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider
            .state('scale', {
                url: '/scale',
                parent: 'overview',
                views: {
                    'nested@overview': {
                        templateUrl: 'scripts/overview/scale/scale.html',
                        controller: 'ScaleOvController'
                    }
                },
                data: {
                      css: 
                        'scripts/overview/scale/scale.css'
                },
                resolve: {

                }
            });
    });
