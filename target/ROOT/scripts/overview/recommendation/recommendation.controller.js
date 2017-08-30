angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider
            .state('recommendation', {
                url: '/recommendation',
                parent: 'overview',
                views: {
                    'nested@overview': {
                        templateUrl: 'scripts/overview/recommendation/recommendation.html',
                        controller: 'RecommendationOvController'
                    }
                },
                data: {
                      css: [
                        'scripts/overview/recommendation/recommendation.css',
                        {
                          name: 'recommendation',
                          href: 'overview/recommendation/recommendation.css'
                        }
                      ]
                },
                resolve: {

                }
            });
    });
