describe('Test For Videos Controller', function () {
    var ApiService,ctrl,$q,$scope;

    beforeEach(module('crossoverVideoPortal'));

//var inject = function(self) {
//    var dependencies = arguments;
//    arguments.forEach(function(dependency) {
//        inject(function(dependency) {
//            self[dependency] = dependency;
//        });
//    });
//}
     /*mock Application to allow us to inject our own dependencies*/
    beforeEach(inject(function ($q, $rootScope, $controller, _ApiService_) {
         ApiService = _ApiService_;
        spyOn(ApiService, 'apiCall').and.returnValue($q.when({}));
        $scope = $rootScope.$new();
        ctrl = $controller('videosController', {
            $scope: $scope
        });
    }));

    it('Controller should exist', function () {
        expect(ctrl).toBeDefined();
        expect($scope.loadingVideos).toBeDefined();

    });
    
    it('Initial records to be Fetched',function(){
        expect($scope.videoFetch).toEqual({skip: 0,limit: 8});
        expect($scope.videos).toBeDefined();
    });
    
    it('On page load apiCall should be called after successful login', function() {
        expect(ApiService.apiCall).toHaveBeenCalled();
    });

});