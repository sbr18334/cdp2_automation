angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider
            .state('recommendations', {
                url: '/recommendations',
                views: {
                    'content@': {
                        templateUrl: 'scripts/recommendations/recommendations.html',
                        controller: 'RecommendationsController'
                    }
                },
                data: {
                      css: 
                        'scripts/recommendations/recommendations.css'
                },
                resolve: {

                }
            });
    });
