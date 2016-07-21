/* 
 *  @version: 0.0.1
 *  @author : Saurabh
 *  @purpose: Module run Configuration
 */
app.run(['$rootScope' , '$state', 'AuthService', function($rootScope, $state, AuthService){
    /* State to be available throughout the module*/
    $rootScope.$state = $state;
    $rootScope.errormsg = '';
    /* Function for logout*/
    $rootScope.logout= function(){
        AuthService.clearSessionId();
        $state.go('login');
    }
}]);