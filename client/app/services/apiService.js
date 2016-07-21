/* 
 *  @version: 0.0.1
 *  @author : Saurabh
 *  @service : ApiService
 *  @purpose: For handling API calls 
 */

app.factory('ApiService',['$http', '$q', function ($http, $q) {
    var ApiService = {
        apiCall: function (url, method, data) {
            /* For Promise Based Calls */
                var deferred = $q.defer();

                /* Calling the REST API using $http Provider and return the promise once the call is completed */
                return $http({url: url, method: method, data: data}).then(function (response) {
                    /* If the API call is successful*/
                    deferred.resolve(response);
                    return response;
                }, function (status) {
                    /* If the API call is not successful return the reject*/
                    deferred.reject(status);
                    return status;
                });
        }

    };

    return (ApiService);
}]);