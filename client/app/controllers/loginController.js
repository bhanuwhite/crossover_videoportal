/* 
 *  @version: 0.0.1
 *  @author : Saurabh
 *  @controller : loginController
 *  @purpose: Controller for Login Page
 */

app.controller('loginController', ['$scope', '$http', '$state', 'AuthService', 'ApiService', '$rootScope' , function ($scope, $http, $state, AuthService, ApiService, $rootScope) {

        $scope.login = function () {
            $scope.userdata = {username: $scope.username, password: $scope.password};
            /* Send the user details to create the login session if valid user*/
            ApiService.apiCall('/user/auth', 'POST', $scope.userdata).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 'error') {
                        $rootScope.errormsg = response.data.error;
                    } 
                    else {
                        /* Once the user is valid user set the session token*/
                        AuthService.setAuthSessionId(response.data.sessionId);
                        $state.go('videos');
                    }
                } else {
                }
            });

        };
        
        $scope.closeError = function(){
            $rootScope.errormsg = '';
        };

    }]);