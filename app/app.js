var app = angular.module("paymentApp", ["ngRoute"]);

app.controller('FormController', [
  '$scope',
  function($scope) {
    $scope.paymentForm = {};
    $scope.cardDetails = {
      cardNumber: '',
      nameOnCard: '',
      cvc: '',
      expiryMonth: '',
      expiryYear: ''
    };

    $scope.buttonClicked = false; // state of button click
    $scope.cardNumberValid = false;
    $scope.nameValid = false;
    $scope.cvcValid = false;
    $scope.expireValid = false;
    $scope.message;

    $scope.buttonClick = function() {
      // handle button click here
      $scope.buttonClicked = true;
      $scope.cardNumberValid = _regexValidate( /^\d{16}$/, $scope.cardDetails.cardNumber );
      $scope.nameValid = _regexValidate( /^[A-Z]+$/, $scope.cardDetails.nameOnCard );
      $scope.cvcValid = _regexValidate( /^\d{3}$/, $scope.cardDetails.cvc );
      _validateExpiration();

      if ( $scope.cardNumberValid &&
           $scope.nameValid &&
           $scope.cvcValid &&
           $scope.expireValid ) {
        $scope.message = 'Payment Successful.';
      } else {
        $scope.message = 'Payment Failed.';
      }
    }

    function _regexValidate( pattern, string ) {
      let regExPattern = new RegExp( pattern );
      return regExPattern.test( string );
    }

    function _validateExpiration() {
      $scope.expireValid = _regexValidate( /^\d{2}$/, $scope.cardDetails.expiryMonth ) &&
        _regexValidate( /^\d{2}$/, $scope.cardDetails.expiryYear );
      
      if ( $scope.expireValid ) {
        let month = parseInt( $scope.cardDetails.expiryMonth );
        $scope.expireValid = month >= 1 && month <=12;
      }
    }

  }
]);
