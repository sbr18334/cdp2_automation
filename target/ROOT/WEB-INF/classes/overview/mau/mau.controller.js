angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider
            .state('mau', {
                url: '/mau',
                parent: 'overview',
                views: {
                    'nested@overview': {
                        templateUrl: 'scripts/overview/mau/mau.html',
                        controller: 'MauOvController'
                    }
                },
                data: {
                      css: [
                        'scripts/overview/mau/mau.css',
                        {
                          name: 'mau',
                          href: 'overview/mau/mau.css'
                        }
                      ]
                },
                resolve: {

                }
            });
    });
