app.controller('basketController', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {
   
   
   $scope.quantity = 0;
   $scope.totalPrice = 0;
   $scope.myCart = [];
   
   
   $http.get('products.json').then(function (data) {
      $scope.produkty = data.data;
   });
   
   
   
   $scope.deleteFromBasket = function (id) {
      this.id = id;
      angular.forEach($scope.myCart, function (value, key) {
         if (value.id === id) {
            if (value.amountOfOrder === 1) {
               $scope.myCart.splice(key, 1);
               $scope.totalPrice = $scope.totalPrice - value.price * value.amountOfOrder;
            }
            else {
               $scope.totalPrice = $scope.totalPrice - value.price;
               value.amountOfOrder = value.amountOfOrder - 1;
            }
         }
      });
   };
   
   
   $scope.addToBasket = function (produkt) {
      var amountOfOrder = this.produkt.amountOfOrder;
      var price = this.produkt.price;
      var found = false;
      
      $scope.myCart.forEach(function (item) {
         if (item.id === produkt.id) {
            item.amountOfOrder = amountOfOrder;
            $scope.quantity += amountOfOrder;
            $scope.totalPrice += price * amountOfOrder;
            found = true;
         }
      });
      if (!found) {
         if (amountOfOrder === 0) {
            console.log("Nic nie dodałeś");
         }
         else {
            $scope.quantity += amountOfOrder;
            $scope.totalPrice += price * amountOfOrder;
            $scope.myCart.push(angular.extend({
               amountOfOrder: 0
            }, produkt));
         }
      }
   };
   
   
   $scope.removeAll = function () {
      $scope.totalPrice = 0;
      $scope.quantity = 0;
      $scope.myCart.length = 0;
   };
   

   
}]);