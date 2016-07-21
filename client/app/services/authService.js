/* 
 *  @version: 0.0.1
 *  @author : Saurabh
 *  @service : AuthService
 *  @purpose: For Session and auth handling
 */

app.factory('AuthService', ['$localStorage', '$sessionStorage', function ($localStorage, $sessionStorage) {
    var AuthService = {
        /* To set the session token once the user is valid*/
        setAuthSessionId: function (sessionId) {
            $localStorage.sessionUser = sessionId;
        },
        /* Using the session token throughout the session for API calls*/
        getAuthSessionId: function () {
            return $localStorage.sessionUser;
        },
        /* Clear the session on Logout*/
        clearSessionId:function(){
            delete $localStorage.sessionUser;

        }
    };

    return (AuthService);
}]);