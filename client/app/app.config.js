/* 
 *  @version: 0.0.1
 *  @author : Saurabh
 *  @purpose: Frontend Routing
 */
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('login', {
                    url: '/',
                    templateUrl: '/partials/login.html',
                    controller: 'loginController'
                })
                .state('videos', {
                    url: '/videos',
                    templateUrl: '/partials/videos.html',
                    controller: 'videosController'
                })
                .state('videoDetail', {
                    url: '/video/:id',
                    templateUrl: '/partials/videoDetail.html',
                    controller: 'videoDetailController'
                });
        $urlRouterProvider.otherwise('/');
    }]);