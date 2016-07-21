describe('Test For Login Controller', function () {
    var ApiService,ctrl;

    beforeEach(module('crossoverVideoPortal'));
    /*mock Application to allow us to inject our own dependencies*/
    beforeEach(inject(function ($q, $rootScope, $controller, _ApiService_) {
         ApiService = _ApiService_;
        spyOn(ApiService, 'apiCall').and.returnValue($q.when({}));
        $scope = $rootScope.$new();
        ctrl = $controller('loginController', {
            $scope: $scope
        });
    }));

    it('Controller Should exist', function () {
        expect(ctrl).toBeDefined();
    });
    
    it('Error Function Should be defined', function () {
        expect($scope.closeError).toBeDefined();
    });
    
    it('Login Function Should be defined', function () {
        expect($scope.login).toBeDefined();
    });
});