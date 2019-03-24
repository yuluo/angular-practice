describe('paymentTest', function() {
    beforeEach(module('paymentApp'));
    beforeEach(module('ngRoute'));
    beforeEach(module('foo'));
    var $compile,
        $controller,
        $http,
        scope,
        form;

    beforeEach(inject(function(_$compile_, _$controller_, _$rootScope_) {
        $compile = _$compile_;
        $controller = _$controller_;
        $rootScope = _$rootScope_;
    }));

    describe('check validation routines', function() {
         beforeEach(inject(function($rootScope, $controller, $templateCache, $compile) {
             scope = $rootScope.$new()
             ctrl = $controller('FormController', {"$scope": scope});
             templateHtml = $templateCache.get('app/index.html');

             scope.cardDetails = {
                cardNumber: '1234341423423432421341234234',
                nameOnCard: 'xyz',
                cvc: '123',
                expiryMonth: '11',
                expiryYear: '23'
            };
         }));

        it('check if validateForm works', function() {
            scope.buttonClick();

            expect(scope.buttonClicked).toEqual(true);
        });

        it('should return false for card number less than 16', function () {
            scope.cardDetails.cardNumber = '1234'; 
            scope.buttonClick();

            expect(scope.cardNumberValid).toEqual(false);
        });
      
        it('should return false for card number contains character', function () {
            scope.cardDetails.cardNumber = '1234123a12341234';
            scope.buttonClick();

            expect(scope.cardNumberValid).toEqual(false);
        });

        it('should return true for valid card number', function () {
            scope.cardDetails.cardNumber = '1234123412341234';
            scope.buttonClick();

            expect(scope.cardNumberValid).toEqual(true);
        });

        it('should return false for name has lower case', function () {
            scope.cardDetails.nameOnCard = 'Johny';
            scope.buttonClick();

            expect(scope.nameValid).toEqual(false);
        });

        it('should return true for uppercase name', function () {
            scope.cardDetails.nameOnCard = 'JOHN';
            scope.buttonClick();

            expect(scope.nameValid).toEqual(true);
        });

        it('should return false for cvc longer than 3', function () {
            scope.cardDetails.cvc = '1234'; 
            scope.buttonClick();

            expect(scope.cvcValid).toEqual(false);
        });
      
        it('should return false for cvc contains character', function () {
            scope.cardDetails.cvc = '12a';
            scope.buttonClick();

            expect(scope.cvcValid).toEqual(false);
        });

        it('should return true for valid cvc', function () {
            scope.cardDetails.cvc = '123';
            scope.buttonClick();

            expect(scope.cvcValid).toEqual(true);
        });

        it('should return false when expieration contains character', function () {
            scope.cardDetails.expiryYear = '23a';
            scope.buttonClick();

            expect(scope.expireValid).toEqual(false);
        });

        it('should return false when expieration months in not in rnage', function () {
            scope.cardDetails.expiryMonth = '13';
            scope.buttonClick();

            expect(scope.expireValid).toEqual(false);
        });

        it('should return true for valid expiration', function () {
            scope.cardDetails.expiryMonth = '11';
            scope.cardDetails.expiryYear = '23';
            scope.buttonClick();

            expect(scope.expireValid).toEqual(true);
        });

    });

    // e2e tests begin here
    describe('Check UI', function() {
        var compile,
            scope,
            tc,
            template,
            controller,
            httpGuy;
        beforeEach(inject(function($compile, $rootScope, $templateCache, $controller, $httpBackend) {
            scope = $rootScope.$new();
            controller = $controller('FormController', {'$scope': scope});
            compile = $compile;
            template = $templateCache.get('app/index.html');
        }));

        it('check title', function() {
            var html_template = compile(template)(scope);
            scope.$digest();
            expect(html_template.find("h1").text()).toEqual("Payment Validation");
        });

        it('check if card number input exists', function() {
            var html_template = compile(template)(scope);
            scope.$digest();
            expect(angular.element(html_template.find("input")[0]).attr('ng-model')).toEqual('cardDetails.cardNumber');
        });

        it('check if name input exists', function() {
            var html_template = compile(template)(scope);
            scope.$digest();
            expect(angular.element(html_template.find("input")[1]).attr('ng-model')).toEqual('cardDetails.nameOnCard');
        });

        it('check if date input exists', function() {
            var html_template = compile(template)(scope);
            scope.$digest();
            expect(angular.element(html_template.find("input")[2]).attr('ng-model')).toEqual('cardDetails.expiryMonth');
            expect(angular.element(html_template.find("input")[3]).attr('ng-model')).toEqual('cardDetails.expiryYear');
        });

        it('check if cvc input exists', function() {
            var html_template = compile(template)(scope);
            scope.$digest();
            expect(angular.element(html_template.find("input")[4]).attr('ng-model')).toEqual('cardDetails.cvc');
        });
        it('check if verify button exists', function() {
            var html_template = compile(template)(scope);
            scope.$digest();
            expect(html_template.find('button').length).toEqual(1);
        });

    });

});
