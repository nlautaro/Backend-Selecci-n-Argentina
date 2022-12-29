async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
  
      headers: {
        "Content-Type": "application/json",
      },
  
      body: JSON.stringify(data),
    });
    return response.json();
  }
  
  document.getElementById("productos-menu").addEventListener("click", function () {
    let productosDiv = document.getElementById("productos-div");
    postData("/api/products", {
      title: productosDiv.title.value,
      thumbnail: productosDiv.thumbnail.value,
      price: productosDiv.price.value,º 
    }).then((data) => {
      console.log(data);
    });
    productosDiv.submit();
  });

  document.getElementById("productos-menu").addEventListener("click", function () {
    let productosDiv = document.getElementById("productos-div");
    postData("/api/carts", {
      title: productosDiv.title.value,
      thumbnail: productosDiv.thumbnail.value,
      price: productosDiv.price.value,
    }).then((data) => {
      console.log(data);
    });
    productosDiv.submit();
  });
  
  fetch("/products")
    .then((response) => response.json())
    .then((data) => {
      let select = document.getElementById("product");
      data.forEach((product) => {
        let option = document.createElement("option");
        option.value = product.id;
        option.innerHTML = product.title;
        select.appendChild(option);
      });
    });