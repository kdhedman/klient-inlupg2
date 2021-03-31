var productArray = [];
$(document).ready(function () {
  localStorage.setItem("products", JSON.stringify(productArray)); //för att populera localstorage oavsett vad som händer härifrån.
  fetch("https://fakestoreapi.com/products")
  //fetch("./json/store-backup.json") //For testing
    .then((response) => response.json())
    .then((jsonData) => jsonData.forEach(listItems))
    .catch((error) => console.log(error));
  updateCartNavText();
});

function listItems(product, index) {
  $("#products").append(`
  <div class="card border-primary mb-3" style="max-width: 15rem;">
    <div class="card-header"><h4>${product.title}</h4></div>
    <div class="card-body">
      <img class="img-thumbnail img-fluid" src="${product.image}" alt="" />
      <p class="card-text">${product.description}</p>
      <h6 class="card-subtitle mb-2 text-muted">$ ${product.price}</h6>
      <button type="button" id="button${product.id}" class="btn btn-primary btn-md btn-block">
      Lägg till i varukorg</button>
    </div>
  </div>`);
  $(`#button${product.id}`).on("click", function () {
    addItem(product);
  });
}

function addItem(newProduct) {
  var tempProducts = JSON.parse(localStorage.getItem("products"));
  var found = false;
  if (!(tempProducts == null)) {
    tempProducts.forEach((product) => {
      if (!found) {
        if (newProduct.id == product.id) {
          product.amount += 1;
          found = true;
        }
      }
    });
  } else {
    tempProducts = [];
  }
  if (!found) {
    newProduct.amount = 1;
    tempProducts.push(newProduct);
  }
  localStorage.setItem("products", JSON.stringify(tempProducts));
}