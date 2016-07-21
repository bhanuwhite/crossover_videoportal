describe('Test For Video Detail Controller', function () {
    var ApiService,ctrl,$scope;

    beforeEach(module('crossoverVideoPortal'));
    
    /*mock Application to allow us to inject our own dependencies*/
    beforeEach(inject(function ($q, $rootScope, $controller, _ApiService_) {
         ApiService = _ApiService_;
        spyOn(ApiService, 'apiCall').and.returnValue($q.when({}));
        $scope = $rootScope.$new();
        ctrl = $controller('videoDetailController', {
            $scope: $scope
        });
    }));

    it('Controller should exist', function () {
        expect(ctrl).toBeDefined();
        expect($scope.loadingVideos).toBeDefined();
    });
    
    it('On page load apiCall should be called after successful login', function() {
        expect(ApiService.apiCall).toHaveBeenCalled();
    });

});