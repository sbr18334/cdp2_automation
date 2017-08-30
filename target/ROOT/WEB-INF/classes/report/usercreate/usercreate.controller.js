angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider
            .state('usercreate', {
                url: '/usercreate',
                parent: 'report',
                views: {
                    'nested@report': {
                        templateUrl: 'scripts/report/usercreate/usercreate.html',
                        controller: 'usercreateController'
                    }
                },
                data: {
                      css: [
                        'scripts/report/usercreate/usercreate.css',
                        {
                          name: 'usercreate',
                          href: 'report/usercreate/usercreate.css'
                        }
                      ]
                },
                resolve: {

                }
            });
    });
