/* 
 *  @version: 0.0.1
 *  @author : Saurabh
 *  @controller : videosController
 *  @purpose: Controller for Videos Page
 */

app.controller('videosController', ['$scope', '$http', 'AuthService', 'ApiService', '$state', '$rootScope',function ($scope, $http, AuthService, ApiService, $state, $rootScope) {


        /* Set intial fetch limit and skip records*/
        $scope.videoFetch = {
            skip: 0,
            limit: 8
        };
        $scope.videos = [];

        /*
         *  Get the Videos from API
         */
        $scope.loadingVideos = function () {
            /* Get the session Id from the AuthService*/
            var authId = AuthService.getAuthSessionId();
            ApiService.apiCall('/videos?sessionId=' + authId + '&skip=' + $scope.videoFetch.skip + '&limit=' + $scope.videoFetch.limit, 'GET').then(function (response) {
                if (response.status == 200) {
                    /* If request is successful*/
                    angular.forEach(response.data.data, function (key, value) {
                        $scope.videos.push(key);
                        var ratingCalc = $scope.calcAvgRating(key.ratings) / key.ratings.length;
                        key['showRating'] = Math.floor(ratingCalc);
                        key['showRatingFloat'] = ((ratingCalc - Math.floor(ratingCalc)) == 0 ? false : true);
                    });
                    /* For lazyloading the videos to be skipped*/
                    $scope.videoFetch.skip = $scope.videos.length;
                } else {
                    /* If response is unauthorized redirect to login page*/
                    if (response.status == 401) {
                        $state.go('login');
                    }
                }
            });
        };
        $scope.loadingVideos();

        /* 
         * Calculate the Average of Rating for each video
         * @returns averagrate to be displayed
         */
        $scope.calcAvgRating = function (ratings) {
            var avg = 0;
            angular.forEach(ratings, function (key, value) {
                avg = avg + key;
            });
            return avg;
        };

        /* 
         * When user rates a video post it to the API
         */
        $scope.rateVideo = function (videoId, rating) {
            var authId = AuthService.getAuthSessionId();
            var data = {
                videoId: videoId,
                rating: rating
            };
            ApiService.apiCall('/video/ratings?sessionId=' + authId, 'POST', data).then(function (response) {
                if(response.status==200){
                  if(response.data.status=="success"){
                    console.log(response, 'rating');
                  }
                }
            });

        };

        /*
         *  For playing only one video at a time and pausing all other videos
         */
        $scope.playVideo = function (event, elementId) {
            event.preventDefault();
            
            /* Get all the videos*/
            $scope.playingVideos = document.getElementsByTagName("video");
            var elementClicked = document.getElementById(elementId);
            
            /* Pause all the videos other than the one clicked*/
            angular.forEach($scope.playingVideos, function (key, value) {
                if (!(elementId == key.id)) {
                    key.pause();
                } else {
                    if (elementClicked.paused) {
                        document.getElementById(elementId).play()
                    } else {
                        document.getElementById(elementId).pause()
                    }
                }
            });
        };


        /*
         *  Lazyloading on window scroll
         */
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();
            var scrollDown = $(document).height() - $(window).height();
            if (scroll == scrollDown) {
                $scope.loadingVideos();
            }
        });

    }]);