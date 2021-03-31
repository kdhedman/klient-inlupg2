var productArray = [];
$(document).ready(function () {
  $("#email").on("keyup", function(){
    validateEmail();
  });
  $("#phone").on("keyup",function (){
    validatePhone();
  });
  $("#name").on("keyup",function (){
    validateName();
  });
  $("#adress").on("keyup",function (){
    validateAdress();
  });
  $("#areacode").on("keyup",function (){
    validateAreacode();
  });
  $("#city").on("keyup",function (){
    validateCity();
  });
  $("#orderbutton").on("click", function () {
    if (validate()) {
      order();
    }
  });
  updateCart();
});

function updateCart() {
  productArray = JSON.parse(localStorage.getItem("products"));
  if(isLocalStorageEmpty) {
    productArray.forEach((product) => {
      $("#cart").append(`
      <li class="list-group-item justify-content-between" id="${product.id}">
        <span id="amount${product.id}"class="h4">${product.amount}x</span>
        <img class="img-thumbnail" style="height: 100px" src="${product.image}">
        ${product.title}
        <span class="float-right">$${parseFloat(product.price).toFixed(2)}
          <button id="remove${
            product.id
          }" class="btn btn-secondary">Ta bort</button>
          <br>
          <button id="plus${
            product.id
          }" class="float-right btn btn-secondary">+</button>
          <button id="minus${
            product.id
          }" class="float-right btn btn-secondary">-</button>
        </span>
      </li>`);
      $(`#remove${product.id}`).on("click", function () {
        removeProduct(product);
        $(this).parent().parent().slideUp(400);
      });
      $(`#plus${product.id}`).on("click", function () {
        modifyAmount(product, 1);
      });
      $(`#minus${product.id}`).on("click", function () {
        modifyAmount(product, -1);
      });
    });
  }
  $("#cart").append(`
  <li class="list-group-item active text-justify-center">
    <span class="float-right h1">
    Summa: $<span id="total">
    </span>
    </span>
    </li>`);
  updateTotalSum();
}

function modifyAmount(product, amount) {
  if (product.amount + amount <= 0) {
    alert(`Använd "Ta bort"-knappen för att ta bort vara`);
    return false;
  } else {
    product.amount += amount;
  }
  $(`#amount${product.id}`).html(`${product.amount}x`);

  productArray.forEach((element) => {
    if (product.id == element.id) {
      element.amount = product.amount;
    }
  });
  updateTotalSum();
  localStorage.setItem("products", JSON.stringify(productArray));
}

function updateTotalSum() {
  if(isLocalStorageEmpty) {
    var total = productArray.reduce(
      (acc, product) => acc + product.price * product.amount,
      0
    );
    $(`#total`).html(parseFloat(total).toFixed(2));
  } else {
    $(`#total`).html(parseFloat(0).toFixed(2));
  }
}

function removeProduct(product) {
  for (var i = productArray.length - 1; i >= 0; i--) {
    if (productArray[i].id == product.id) {
      productArray.splice(i, 1);
      break;
    }
  }
  updateTotalSum();
  localStorage.setItem("products", JSON.stringify(productArray));
}

function validate() {
  var validated = true;
  if (
    !validateEmail() ||
    !validatePhone() ||
    !validateName() ||
    !validateAdress() ||
    !validateAreacode() ||
    !validateCity()
  ) {
    validated = false;
  }
  return validated;
}

function renderInvalid(object) {
  object.removeClass("is-valid");
  object.addClass("is-invalid");
}

function renderValid(object) {
  object.removeClass("is-invalid");
  object.addClass("is-valid");
}

function validateEmail() {
  var input = document.createElement("input");
  input.type = "email";
  input.value = $("#email").val();
  if (!(input.checkValidity() && input.value.length > 3)) {
    renderInvalid($("#email"));
    return false;
  }
  renderValid($("#email"));
  return true;
}

function validatePhone() {
  const regex = /^0\d{6,}/g;
  if (!regex.test($("#phone").val())) {
    renderInvalid($("#phone"));
    return false;
  }
  renderValid($("#phone"));
  return true;
}

function validateName() {
  const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  if (!regex.test($("#name").val())) {
    renderInvalid($("#name"));
    return false;
  }
  renderValid($("#name"));
  return true;
}

function validateAdress() {
  const regex = /^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  if (!regex.test($("#adress").val())) {
    renderInvalid($("#adress"));
    return false;
  }
  renderValid($("#adress"));
  return true;
}

function validateAreacode() {
  const regex = /(^[1-9])(\d)(\d)(\d)(\d)/g;
  if (!regex.test($("#areacode").val())) {
    renderInvalid($("#areacode"));
    return false;
  }
  renderValid($("#areacode"));
  return true;
}

function validateCity() {
  const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  if (!regex.test($("#city").val())) {
    renderInvalid($("#city"));
    return false;
  }
  renderValid($("#city"));
  return true;
}

function validateLength(object, length) {
  if (object.val().length >= length) {
    renderValid(object);
  } else {
    renderInvalid(object);
    return false;
  }
  return true;
}

/**
 * Kontrollerar om det finns något i efterfrågad "key" i localStorage
 * @param {String} key
 * @returns {boolean} true 
 */
function isLocalStorageEmpty(key) {
  return (localStorage.getItem(key) === null ||
    localStorage.getItem(key).length() == 0)
}

function validatePhoneNumber() {}

function order() {
  if (JSON.parse(localStorage.getItem("products")).length < 1) {
    $("#products").append(``);
    return false;
  }
  window.location.href = "./completed.html";
}
