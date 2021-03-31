$(document).ready(function(){
    updateCartNavText();
})


/**
 * Uppdaterar texten där det står hur många artiklar som finns i varukoren
 */
function updateCartNavText() {
  if (
    localStorage.getItem("products") === null ||
    localStorage.getItem("products").length < 1
  ) {
    $("#cartNavText").html(`0`);
  } else {
    productArray = JSON.parse(localStorage.getItem("products"));
    var itemsInCart = 0;
    productArray.map(function (product) {
      itemsInCart += product.amount;
    });
    $("#cartNavText").html(`${itemsInCart}`);
  }
}

/*
* Nedanstående kod är en variant för att override:a localstorage.setitem
* för den här sidan, anledningen till det är att uppdatera varukorg vid ändring
* inte den finaste lösningen, men rolig!
* Koden är en modifierad variant av den jag hittade på nedanstående URL. 
* https://forums.asp.net/t/2164818.aspx?How+to+detect+if+localstorage+has+been+changed
*/

var originalSetItem = localStorage.setItem;

localStorage.setItem = function (key, value) {
  var event = new Event('itemInserted');
  event.value = value; 
  event.key = key; 
  document.dispatchEvent(event);
  originalSetItem.apply(this, arguments);
  updateCartNavText();
};