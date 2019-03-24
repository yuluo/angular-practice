describe('paymentTest', function() {
  beforeEach(module('paymentApp'));
  beforeEach(module('ngRoute'));
  var $compile, $controller, $http;

  beforeEach(inject(function(_$compile_, _$controller_) {
    $compile = _$compile_;
    $controller = _$controller_;
  }));

  describe('check validation routines', function () {
    it('check if name validation works', function () {
      var $scope = {};
      var controller = $controller('FormController', {
        $scope: $scope
       });
       $scope.cardDetails.nameOnCard = 'Tom Hardy';
      expect($scope.validateName()).toEqual(false);
		});
	});

});
