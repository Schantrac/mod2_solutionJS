(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService)

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  //var emptyMessage = "";
 var boughtList = this;
 boughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();
console.log("the bought list", boughtList.length);

}

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buyList = this;

  buyList.itemName = "";
  buyList.itemQuantity = "";
  buyList.buyItems = ShoppingListCheckOffService.getToBuyItems();
  buyList.removebuyItem = function(itemIndex) {
    try {
      ShoppingListCheckOffService.removeBuyItem(itemIndex);
    }catch (error) {
      buyList.errorMessage = error.message;
    }
  }

}
function ShoppingListCheckOffService() {
 var service = this;
 var toBuyItems = [
   { name: "cookies", quantity: 10}, {name: "donuts", quantity: 10}, {name: "pepto", quantity: 10}, {name: "chips", quantity: 20}, {name: "sweets", quantity: 15}
 ];
 var boughtItems = [];
console.log(toBuyItems[0].name);
 service.getBoughtItems = function () {
   return boughtItems;
 };
 service.getToBuyItems = function () {
   return toBuyItems;
 };
 service.removeBuyItem = function (itemIndex) {
   var item = {
     name: toBuyItems[itemIndex].name,
     quantity: toBuyItems[itemIndex].quantity
   };

   boughtItems.push(item);
   boughtItems.emptyMessage = "test";
   toBuyItems.splice(itemIndex,1);
   console.log(toBuyItems);
   if (toBuyItems.length == 0)
   {
     throw new Error("All Items Bought");
   }
   console.log("loggin");
   //console.log(boughtItems(itemIndex).name);

 };
}
})();
