





//tttttttttttttttttttttttttttttttt
var lowerSlider = document.querySelector("#lower");
var lowerSlider = document.querySelector("#lower");
var upperSlider = document.querySelector("#upper");

document.querySelector("#two").value = upperSlider.value;
document.querySelector("#one").value = lowerSlider.value;

var lowerVal = parseInt(lowerSlider.value);
var upperVal = parseInt(upperSlider.value);

upperSlider.oninput = function () {
  lowerVal = parseInt(lowerSlider.value);
  upperVal = parseInt(upperSlider.value);

  if (upperVal < lowerVal + 4) {
    lowerSlider.value = upperVal - 4;
    if (lowerVal == lowerSlider.min) {
      upperSlider.value = 4;
    }
  }
  document.querySelector("#two").value = this.value;
};

lowerSlider.oninput = function () {
  lowerVal = parseInt(lowerSlider.value);
  upperVal = parseInt(upperSlider.value);
  if (lowerVal > upperVal - 4) {
    upperSlider.value = lowerVal + 4;
    if (upperVal == upperSlider.max) {
      lowerSlider.value = parseInt(upperSlider.max) - 4;
    }
  }
  document.querySelector("#one").value = this.value;
};
var upperSlider = document.querySelector("#upper");

document.querySelector("#two").value = upperSlider.value;
document.querySelector("#one").value = lowerSlider.value;

var lowerVal = parseInt(lowerSlider.value);
var upperVal = parseInt(upperSlider.value);

upperSlider.oninput = function () {
  lowerVal = parseInt(lowerSlider.value);
  upperVal = parseInt(upperSlider.value);

  if (upperVal < lowerVal + 4) {
    lowerSlider.value = upperVal - 4;
    if (lowerVal == lowerSlider.min) {
      upperSlider.value = 4;
    }
  }
  document.querySelector("#two").value = this.value;
};

lowerSlider.oninput = function () {
  lowerVal = parseInt(lowerSlider.value);
  upperVal = parseInt(upperSlider.value);
  if (lowerVal > upperVal - 4) {
    upperSlider.value = lowerVal + 4;
    if (upperVal == upperSlider.max) {
      lowerSlider.value = parseInt(upperSlider.max) - 4;
    }
  }
  document.querySelector("#one").value = this.value;
};

//api setter
function setUrl(text) {
  return "/aquaspace/backend/public/index.php?" + text;
}

$(document).ready(function () {
  /*-------------------------view products on loading the category page------------------------*/
  $.ajax({
    type: "GET",
    url: setUrl("Common/getCategoryPost"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      console.log(data);
      //append new posts

      data.allPost.forEach((element) => {

        $("#row").append(`
           <div class="category-col-3 col-3">
           <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
           <img src=".../../../../images/product/${element.img1}" alt="" />
           <h4>${element.product_name}</h4>
           <p>${element.price}</p>
       </div>`);
      });
    },
    error: function (errMsg) {
      window.location.replace(
        "/aquaspace/frontend/src/Error/" + errMsg.status + ".html"
      );
    },
  });

  /*-----------------------------filter by post type------------------------------ */

  $(
    "#post-type1, #post-type2, #post-type3, #post-type4, #post-type5, #delivery1, #delivery2, #delivery3"
  ).change(function () {
    /*-------------------------get the values of the other filters------------------------ */

    let delivery = document.querySelector(
      'input[name = "delivery"]:checked'
    ).value;
    let lower = $("#one").val();
    let upper = $("#two").val();
    let distance = $("#distance").val();
    // console.log(lower);
    // console.log(upper);
    // console.log(distance);

    $.ajax({
      type: "GET",
      url: setUrl("Common/getCategoryPost"),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        console.log(data.fishPost);
        console.log(delivery);
        //append new posts
        $("#no-results-div").hide();
        $("#row").html(``);

        /*-----------------if the user selects post type "all"---------------- */

        if ($("#post-type1").is(":checked")) {
          let i = 0;
          data.allPost.forEach((element) => {
            if (
              parseInt(element.price) >= lower &&
              parseInt(element.price) <= upper
            ) {
              console.log(element.id + "price checked");
              if (delivery == 0 || element.delivery == delivery) {
                i++;

                $("#row").append(`
                   <div class="category-col-3 col-3">
                   <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
                   <img src=".../../../../images/product/${element.img1}" alt="" />
                   <h4>${element.product_name}</h4>
                   <p>${element.price}</p>
               </div>`);
              }
            }
          });
          if (i == 0) {
            $("#no-results-div").show();
          }
        }

        if ($("#post-type2").is(":checked")) {
          let i = 0;
          data.adoptPost.forEach((element) => {
            if (delivery == 0 || element.delivery == delivery) {
              i++;
              $("#row").append(`
                                <div class="category-col-3 col-3">
                                <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
                                <div class="img-wrapper">
                                                  <div class="ribbon-wrapper-red">
                                                      <div class="ribbon-red">ADOPT</div>
                                                  </div>
                                                  <img src="/aquaspace/frontend/images/product/${element.img1}" alt="product image" />
                                              </div>
                      
                                  <h4>${element.product_name}</h4>
                      
                              </div>`);
            }
          });
          if (i == 0) {
            $("#no-results-div").show();
          }
        }

        if ($("#post-type3").is(":checked")) {
          let i = 0;
          data.fishPost.forEach((element) => {
            if (
              parseInt(element.price) >= lower &&
              parseInt(element.price) <= upper
            ) {
              console.log(element.id + "price checked");
              if (delivery == 0 || element.delivery == delivery) {
                i++;

                $("#row").append(`
                   <div class="category-col-3 col-3">
                   <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
                   <img src=".../../../../images/product/${element.img1}" alt="" />
                   <h4>${element.product_name}</h4>
                   <p>${element.price}</p>
               </div>`);
              }
            }
          });
          if (i == 0) {
            $("#no-results-div").show();
          }
        }

        if ($("#post-type4").is(":checked")) {
          let i = 0;
          data.plantPost.forEach((element) => {
            if (
              parseInt(element.price) >= lower &&
              parseInt(element.price) <= upper
            ) {
              console.log(element.id + "price checked");
              if (delivery == 0 || element.delivery == delivery) {
                i++;

                $("#row").append(`
                   <div class="category-col-3 col-3">
                   <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
                   <img src=".../../../../images/product/${element.img1}" alt="" />
                   <h4>${element.product_name}</h4>
                   <p>${element.price}</p>
               </div>`);
              }
            }
          });
          if (i == 0) {
            $("#no-results-div").show();
          }
        }

        if ($("#post-type5").is(":checked")) {
          let i = 0;
          data.eqPost.forEach((element) => {
            if (
              parseInt(element.price) >= lower &&
              parseInt(element.price) <= upper
            ) {
              console.log(element.id + "price checked");
              if (delivery == 0 || element.delivery == delivery) {
                i++;
                $("#row").append(
                  `
                   <div class="category-col-3 col-3">
                   <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
                   <img src=".../../../../images/product/${element.img1}" alt="" />
                   <h4>${element.product_name}</h4>
                   <p>${element.price}</p>
               </div>
               `
                );
              }
            }
          });
          if (i == 0) {
            $("#no-results-div").show();
          }
        }
      },
      error: function (errMsg) {
        window.location.replace(
          "/aquaspace/frontend/src/Error/" + errMsg.status + ".html"
        );
      },
    });
  });

  /*---------------------- filter by distance --------------------------*/
  $("#distance").keyup(function () {
    /*-------------------------get the values of the other filters------------------------ */

    let delivery = document.querySelector(
      'input[name = "delivery"]:checked'
    ).value;
    let lower = $("#one").val();
    let upper = $("#two").val();
    let distance = $("#distance").val();

    $.ajax({
      type: "GET",
      url: setUrl("Common/getCategoryPost"),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        console.log(data.fishPost);
        console.log(delivery);
        //append new posts
        $("#row").html(``);

        /*-----------------if the user selects post type "all"---------------- */

        if ($("#post-type1").is(":checked")) {
          data.allPost.forEach((element) => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(function (position) {
                let user_lat = position.coords.latitude;
                let user_lng = position.coords.longitude;

                let product_lat = parseFloat(element.lat);
                let product_lng = parseFloat(element.lan);

                var map;
                function initMap() {
                  const user_location = {
                    lat: user_lat,
                    lng: user_lng,
                  };
                  const product_location = {
                    lat: product_lat,
                    lng: product_lng,
                  };
                  // console.log(user_location);
                  // console.log(product_location);

                  let directionsService = new google.maps.DirectionsService();
                  let directionsRenderer = new google.maps.DirectionsRenderer();
                  // Create route from existing points used for markers
                  const route = {
                    origin: user_location,
                    destination: product_location,
                    travelMode: "DRIVING",
                  };

                  directionsService.route(route, function (response, status) {
                    // anonymous function to capture directions
                    if (status !== "OK") {
                      window.alert(
                        "Directions request failed due to " + status
                      );
                      return;
                    } else {
                      directionsRenderer.setDirections(response); // Add route to the map
                      var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
                      if (!directionsData) {
                        window.alert("Directions request failed");
                        return;
                      } else {
                        let actual_distance =
                          directionsData.distance.value / 1000;

                        if (distance == "" || actual_distance <= distance) {
                          console.log(
                            element.id +
                              "distance checked" +
                              " " +
                              actual_distance
                          );
                          if (
                            parseInt(element.price) >= lower &&
                            parseInt(element.price) <= upper
                          ) {
                            console.log(element.id + "price checked");
                            if (delivery == 0 || element.delivery == delivery) {
                              console.log(element.id + "delivery checked");

                              $("#row").append(`
                   <div class="category-col-3 col-3">
                   <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
                   <img src=".../../../../images/product/${element.img1}" alt="" />
                   <h4>${element.product_name}</h4>
                   <p>${element.price}</p>
               </div>`);
                            }
                          }
                        }
                      }
                    }
                  });
                }

                initMap();
              });
            } else {
              console.log("Browser doesn't support geolocation!");
            }
          });
        }

        if ($("#post-type2").is(":checked")) {
          data.adoptPost.forEach((element) => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(function (position) {
                let user_lat = position.coords.latitude;
                let user_lng = position.coords.longitude;

                let product_lat = parseFloat(element.lat);
                let product_lng = parseFloat(element.lan);

                var map;
                function initMap() {
                  const user_location = {
                    lat: user_lat,
                    lng: user_lng,
                  };
                  const product_location = {
                    lat: product_lat,
                    lng: product_lng,
                  };
                  // console.log(user_location);
                  // console.log(product_location);

                  let directionsService = new google.maps.DirectionsService();
                  let directionsRenderer = new google.maps.DirectionsRenderer();
                  // Create route from existing points used for markers
                  const route = {
                    origin: user_location,
                    destination: product_location,
                    travelMode: "DRIVING",
                  };

                  directionsService.route(route, function (response, status) {
                    // anonymous function to capture directions
                    if (status !== "OK") {
                      window.alert(
                        "Directions request failed due to " + status
                      );
                      return;
                    } else {
                      directionsRenderer.setDirections(response); // Add route to the map
                      var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
                      if (!directionsData) {
                        window.alert("Directions request failed");
                        return;
                      } else {
                        let actual_distance =
                          directionsData.distance.value / 1000;

                        if (distance == "" || actual_distance <= distance) {
                          console.log(
                            element.id +
                              "distance checked" +
                              " " +
                              actual_distance
                          );
                          if (delivery == 0 || element.delivery == delivery) {
                            console.log(element.id + "delivery checked");

                            $("#row").append(`
                                <div class="category-col-3 col-3">
                                <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
                                <div class="img-wrapper">
                                                  <div class="ribbon-wrapper-red">
                                                      <div class="ribbon-red">ADOPT</div>
                                                  </div>
                                                  <img src="/aquaspace/frontend/images/product/${element.img1}" alt="product image" />
                                              </div>
                      
                                  <h4>${element.product_name}</h4>
                      
                              </div>`);
                          }
                        }
                      }
                    }
                  });
                }

                initMap();
              });
            } else {
              console.log("Browser doesn't support geolocation!");
            }
          });
        }

        if ($("#post-type3").is(":checked")) {
          data.fishPost.forEach((element) => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(function (position) {
                let user_lat = position.coords.latitude;
                let user_lng = position.coords.longitude;

                let product_lat = parseFloat(element.lat);
                let product_lng = parseFloat(element.lan);

                var map;
                function initMap() {
                  const user_location = {
                    lat: user_lat,
                    lng: user_lng,
                  };
                  const product_location = {
                    lat: product_lat,
                    lng: product_lng,
                  };
                  // console.log(user_location);
                  // console.log(product_location);

                  let directionsService = new google.maps.DirectionsService();
                  let directionsRenderer = new google.maps.DirectionsRenderer();
                  // Create route from existing points used for markers
                  const route = {
                    origin: user_location,
                    destination: product_location,
                    travelMode: "DRIVING",
                  };

                  directionsService.route(route, function (response, status) {
                    // anonymous function to capture directions
                    if (status !== "OK") {
                      window.alert(
                        "Directions request failed due to " + status
                      );
                      return;
                    } else {
                      directionsRenderer.setDirections(response); // Add route to the map
                      var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
                      if (!directionsData) {
                        window.alert("Directions request failed");
                        return;
                      } else {
                        let actual_distance =
                          directionsData.distance.value / 1000;

                        if (distance == "" || actual_distance <= distance) {
                          console.log(
                            element.id +
                              "distance checked" +
                              " " +
                              actual_distance
                          );
                          if (
                            parseInt(element.price) >= lower &&
                            parseInt(element.price) <= upper
                          ) {
                            console.log(element.id + "price checked");
                            if (delivery == 0 || element.delivery == delivery) {
                              console.log(element.id + "delivery checked");

                              $("#row").append(`
                   <div class="category-col-3 col-3">
                   <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
                   <img src=".../../../../images/product/${element.img1}" alt="" />
                   <h4>${element.product_name}</h4>
                   <p>${element.price}</p>
               </div>`);
                            }
                          }
                        }
                      }
                    }
                  });
                }

                initMap();
              });
            } else {
              console.log("Browser doesn't support geolocation!");
            }
          });
        }

        if ($("#post-type4").is(":checked")) {
          data.plantPost.forEach((element) => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(function (position) {
                let user_lat = position.coords.latitude;
                let user_lng = position.coords.longitude;

                let product_lat = parseFloat(element.lat);
                let product_lng = parseFloat(element.lan);

                var map;
                function initMap() {
                  const user_location = {
                    lat: user_lat,
                    lng: user_lng,
                  };
                  const product_location = {
                    lat: product_lat,
                    lng: product_lng,
                  };
                  // console.log(user_location);
                  // console.log(product_location);

                  let directionsService = new google.maps.DirectionsService();
                  let directionsRenderer = new google.maps.DirectionsRenderer();
                  // Create route from existing points used for markers
                  const route = {
                    origin: user_location,
                    destination: product_location,
                    travelMode: "DRIVING",
                  };

                  directionsService.route(route, function (response, status) {
                    // anonymous function to capture directions
                    if (status !== "OK") {
                      window.alert(
                        "Directions request failed due to " + status
                      );
                      return;
                    } else {
                      directionsRenderer.setDirections(response); // Add route to the map
                      var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
                      if (!directionsData) {
                        window.alert("Directions request failed");
                        return;
                      } else {
                        let actual_distance =
                          directionsData.distance.value / 1000;

                        if (distance == "" || actual_distance <= distance) {
                          console.log(
                            element.id +
                              "distance checked" +
                              " " +
                              actual_distance
                          );
                          if (
                            parseInt(element.price) >= lower &&
                            parseInt(element.price) <= upper
                          ) {
                            console.log(element.id + "price checked");
                            if (delivery == 0 || element.delivery == delivery) {
                              console.log(element.id + "delivery checked");

                              $("#row").append(`
                   <div class="category-col-3 col-3">
                   <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
                   <img src=".../../../../images/product/${element.img1}" alt="" />
                   <h4>${element.product_name}</h4>
                   <p>${element.price}</p>
               </div>`);
                            }
                          }
                        }
                      }
                    }
                  });
                }

                initMap();
              });
            } else {
              console.log("Browser doesn't support geolocation!");
            }
          });
        }

        if ($("#post-type5").is(":checked")) {
          data.eqPost.forEach((element) => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(function (position) {
                let user_lat = position.coords.latitude;
                let user_lng = position.coords.longitude;

                let product_lat = parseFloat(element.lat);
                let product_lng = parseFloat(element.lan);

                var map;
                function initMap() {
                  const user_location = {
                    lat: user_lat,
                    lng: user_lng,
                  };
                  const product_location = {
                    lat: product_lat,
                    lng: product_lng,
                  };
                  // console.log(user_location);
                  // console.log(product_location);

                  let directionsService = new google.maps.DirectionsService();
                  let directionsRenderer = new google.maps.DirectionsRenderer();
                  // Create route from existing points used for markers
                  const route = {
                    origin: user_location,
                    destination: product_location,
                    travelMode: "DRIVING",
                  };

                  directionsService.route(route, function (response, status) {
                    // anonymous function to capture directions
                    if (status !== "OK") {
                      window.alert(
                        "Directions request failed due to " + status
                      );
                      return;
                    } else {
                      directionsRenderer.setDirections(response); // Add route to the map
                      var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
                      if (!directionsData) {
                        window.alert("Directions request failed");
                        return;
                      } else {
                        let actual_distance =
                          directionsData.distance.value / 1000;

                        if (distance == "" || actual_distance <= distance) {
                          console.log(
                            element.id +
                              "distance checked" +
                              " " +
                              actual_distance
                          );
                          if (
                            parseInt(element.price) >= lower &&
                            parseInt(element.price) <= upper
                          ) {
                            console.log(element.id + "price checked");
                            if (delivery == 0 || element.delivery == delivery) {
                              console.log(element.id + "delivery checked");

                              $("#row").append(
                                `
                   <div class="category-col-3 col-3">
                   <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
                   <img src=".../../../../images/product/${element.img1}" alt="" />
                   <h4>${element.product_name}</h4>
                   <p>${element.price}</p>
               </div>
               `
                              );
                            }
                          }
                        }
                      }
                    }
                  });
                }

                initMap();
              });
            } else {
              console.log("Browser doesn't support geolocation!");
            }
          });
        }
      },
      error: function (errMsg) {
        window.location.replace(
          "/aquaspace/frontend/src/Error/" + errMsg.status + ".html"
        );
      },
    });
  });

  $("#one,#two").change(function () {
    /*-------------------------get the values of the other filters------------------------ */

    console.log("priceeeeee");
    let delivery = document.querySelector(
      'input[name = "delivery"]:checked'
    ).value;
    let lower = $("#one").val();
    let upper = $("#two").val();
    let distance = $("#distance").val();

    $.ajax({
      type: "GET",
      url: setUrl("Common/getCategoryPost"),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        console.log(data.fishPost);
        console.log(delivery);
        //append new posts
        $("#row").html(``);

        /*-----------------if the user selects post type "all"---------------- */

        if ($("#post-type1").is(":checked")) {
          data.allPost.forEach((element) => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(function (position) {
                let user_lat = position.coords.latitude;
                let user_lng = position.coords.longitude;

                let product_lat = parseFloat(element.lat);
                let product_lng = parseFloat(element.lan);

                var map;
                function initMap() {
                  const user_location = {
                    lat: user_lat,
                    lng: user_lng,
                  };
                  const product_location = {
                    lat: product_lat,
                    lng: product_lng,
                  };
                  // console.log(user_location);
                  // console.log(product_location);

                  let directionsService = new google.maps.DirectionsService();
                  let directionsRenderer = new google.maps.DirectionsRenderer();
                  // Create route from existing points used for markers
                  const route = {
                    origin: user_location,
                    destination: product_location,
                    travelMode: "DRIVING",
                  };

                  directionsService.route(route, function (response, status) {
                    // anonymous function to capture directions
                    if (status !== "OK") {
                      window.alert(
                        "Directions request failed due to " + status
                      );
                      return;
                    } else {
                      directionsRenderer.setDirections(response); // Add route to the map
                      var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
                      if (!directionsData) {
                        window.alert("Directions request failed");
                        return;
                      } else {
                        let actual_distance =
                          directionsData.distance.value / 1000;

                        if (distance == "" || actual_distance <= distance) {
                          console.log(
                            element.id +
                              "distance checked" +
                              " " +
                              actual_distance
                          );
                          if (
                            parseInt(element.price) >= lower &&
                            parseInt(element.price) <= upper
                          ) {
                            console.log(element.id + "price checked");
                            if (delivery == 0 || element.delivery == delivery) {
                              console.log(element.id + "delivery checked");

                              $("#row").append(`
                   <div class="category-col-3 col-3">
                   <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
                   <img src=".../../../../images/product/${element.img1}" alt="" />
                   <h4>${element.product_name}</h4>
                   <p>${element.price}</p>
               </div>`);
                            }
                          }
                        }
                      }
                    }
                  });
                }

                initMap();
              });
            } else {
              console.log("Browser doesn't support geolocation!");
            }
          });
        }

        if ($("#post-type2").is(":checked")) {
          data.adoptPost.forEach((element) => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(function (position) {
                let user_lat = position.coords.latitude;
                let user_lng = position.coords.longitude;

                let product_lat = parseFloat(element.lat);
                let product_lng = parseFloat(element.lan);

                var map;
                function initMap() {
                  const user_location = {
                    lat: user_lat,
                    lng: user_lng,
                  };
                  const product_location = {
                    lat: product_lat,
                    lng: product_lng,
                  };
                  // console.log(user_location);
                  // console.log(product_location);

                  let directionsService = new google.maps.DirectionsService();
                  let directionsRenderer = new google.maps.DirectionsRenderer();
                  // Create route from existing points used for markers
                  const route = {
                    origin: user_location,
                    destination: product_location,
                    travelMode: "DRIVING",
                  };

                  directionsService.route(route, function (response, status) {
                    // anonymous function to capture directions
                    if (status !== "OK") {
                      window.alert(
                        "Directions request failed due to " + status
                      );
                      return;
                    } else {
                      directionsRenderer.setDirections(response); // Add route to the map
                      var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
                      if (!directionsData) {
                        window.alert("Directions request failed");
                        return;
                      } else {
                        let actual_distance =
                          directionsData.distance.value / 1000;

                        if (distance == "" || actual_distance <= distance) {
                          console.log(
                            element.id +
                              "distance checked" +
                              " " +
                              actual_distance
                          );
                          if (delivery == 0 || element.delivery == delivery) {
                            console.log(element.id + "delivery checked");

                            $("#row").append(`
                                <div class="category-col-3 col-3">
                                <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
                                <div class="img-wrapper">
                                                  <div class="ribbon-wrapper-red">
                                                      <div class="ribbon-red">ADOPT</div>
                                                  </div>
                                                  <img src="/aquaspace/frontend/images/product/${element.img1}" alt="product image" />
                                              </div>
                      
                                  <h4>${element.product_name}</h4>
                      
                              </div>`);
                          }
                        }
                      }
                    }
                  });
                }

                initMap();
              });
            } else {
              console.log("Browser doesn't support geolocation!");
            }
          });
        }

        if ($("#post-type3").is(":checked")) {
          data.fishPost.forEach((element) => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(function (position) {
                let user_lat = position.coords.latitude;
                let user_lng = position.coords.longitude;

                let product_lat = parseFloat(element.lat);
                let product_lng = parseFloat(element.lan);

                var map;
                function initMap() {
                  const user_location = {
                    lat: user_lat,
                    lng: user_lng,
                  };
                  const product_location = {
                    lat: product_lat,
                    lng: product_lng,
                  };
                  // console.log(user_location);
                  // console.log(product_location);

                  let directionsService = new google.maps.DirectionsService();
                  let directionsRenderer = new google.maps.DirectionsRenderer();
                  // Create route from existing points used for markers
                  const route = {
                    origin: user_location,
                    destination: product_location,
                    travelMode: "DRIVING",
                  };

                  directionsService.route(route, function (response, status) {
                    // anonymous function to capture directions
                    if (status !== "OK") {
                      window.alert(
                        "Directions request failed due to " + status
                      );
                      return;
                    } else {
                      directionsRenderer.setDirections(response); // Add route to the map
                      var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
                      if (!directionsData) {
                        window.alert("Directions request failed");
                        return;
                      } else {
                        let actual_distance =
                          directionsData.distance.value / 1000;

                        if (distance == "" || actual_distance <= distance) {
                          console.log(
                            element.id +
                              "distance checked" +
                              " " +
                              actual_distance
                          );
                          if (
                            parseInt(element.price) >= lower &&
                            parseInt(element.price) <= upper
                          ) {
                            console.log(element.id + "price checked");
                            if (delivery == 0 || element.delivery == delivery) {
                              console.log(element.id + "delivery checked");

                              $("#row").append(`
                   <div class="category-col-3 col-3">
                   <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
                   <img src=".../../../../images/product/${element.img1}" alt="" />
                   <h4>${element.product_name}</h4>
                   <p>${element.price}</p>
               </div>`);
                            }
                          }
                        }
                      }
                    }
                  });
                }

                initMap();
              });
            } else {
              console.log("Browser doesn't support geolocation!");
            }
          });
        }

        if ($("#post-type4").is(":checked")) {
          data.plantPost.forEach((element) => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(function (position) {
                let user_lat = position.coords.latitude;
                let user_lng = position.coords.longitude;

                let product_lat = parseFloat(element.lat);
                let product_lng = parseFloat(element.lan);

                var map;
                function initMap() {
                  const user_location = {
                    lat: user_lat,
                    lng: user_lng,
                  };
                  const product_location = {
                    lat: product_lat,
                    lng: product_lng,
                  };
                  // console.log(user_location);
                  // console.log(product_location);

                  let directionsService = new google.maps.DirectionsService();
                  let directionsRenderer = new google.maps.DirectionsRenderer();
                  // Create route from existing points used for markers
                  const route = {
                    origin: user_location,
                    destination: product_location,
                    travelMode: "DRIVING",
                  };

                  directionsService.route(route, function (response, status) {
                    // anonymous function to capture directions
                    if (status !== "OK") {
                      window.alert(
                        "Directions request failed due to " + status
                      );
                      return;
                    } else {
                      directionsRenderer.setDirections(response); // Add route to the map
                      var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
                      if (!directionsData) {
                        window.alert("Directions request failed");
                        return;
                      } else {
                        let actual_distance =
                          directionsData.distance.value / 1000;

                        if (distance == "" || actual_distance <= distance) {
                          console.log(
                            element.id +
                              "distance checked" +
                              " " +
                              actual_distance
                          );
                          if (
                            parseInt(element.price) >= lower &&
                            parseInt(element.price) <= upper
                          ) {
                            console.log(element.id + "price checked");
                            if (delivery == 0 || element.delivery == delivery) {
                              console.log(element.id + "delivery checked");

                              $("#row").append(`
                   <div class="category-col-3 col-3">
                   <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
                   <img src=".../../../../images/product/${element.img1}" alt="" />
                   <h4>${element.product_name}</h4>
                   <p>${element.price}</p>
               </div>`);
                            }
                          }
                        }
                      }
                    }
                  });
                }

                initMap();
              });
            } else {
              console.log("Browser doesn't support geolocation!");
            }
          });
        }

        if ($("#post-type5").is(":checked")) {
          data.eqPost.forEach((element) => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(function (position) {
                let user_lat = position.coords.latitude;
                let user_lng = position.coords.longitude;

                let product_lat = parseFloat(element.lat);
                let product_lng = parseFloat(element.lan);

                var map;
                function initMap() {
                  const user_location = {
                    lat: user_lat,
                    lng: user_lng,
                  };
                  const product_location = {
                    lat: product_lat,
                    lng: product_lng,
                  };
                  // console.log(user_location);
                  // console.log(product_location);

                  let directionsService = new google.maps.DirectionsService();
                  let directionsRenderer = new google.maps.DirectionsRenderer();
                  // Create route from existing points used for markers
                  const route = {
                    origin: user_location,
                    destination: product_location,
                    travelMode: "DRIVING",
                  };

                  directionsService.route(route, function (response, status) {
                    // anonymous function to capture directions
                    if (status !== "OK") {
                      window.alert(
                        "Directions request failed due to " + status
                      );
                      return;
                    } else {
                      directionsRenderer.setDirections(response); // Add route to the map
                      var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
                      if (!directionsData) {
                        window.alert("Directions request failed");
                        return;
                      } else {
                        let actual_distance =
                          directionsData.distance.value / 1000;

                        if (distance == "" || actual_distance <= distance) {
                          console.log(
                            element.id +
                              "distance checked" +
                              " " +
                              actual_distance
                          );
                          if (
                            parseInt(element.price) >= lower &&
                            parseInt(element.price) <= upper
                          ) {
                            console.log(element.id + "price checked");
                            if (delivery == 0 || element.delivery == delivery) {
                              console.log(element.id + "delivery checked");

                              $("#row").append(
                                `
                   <div class="category-col-3 col-3">
                   <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
                   <img src=".../../../../images/product/${element.img1}" alt="" />
                   <h4>${element.product_name}</h4>
                   <p>${element.price}</p>
               </div>
               `
                              );
                            }
                          }
                        }
                      }
                    }
                  });
                }

                initMap();
              });
            } else {
              console.log("Browser doesn't support geolocation!");
            }
          });
        }
      },
      error: function (errMsg) {
        window.location.replace(
          "/aquaspace/frontend/src/Error/" + errMsg.status + ".html"
        );
      },
    });
  });

  $("#upper,#lower").change(function () {
    /*-------------------------get the values of the other filters------------------------ */

    console.log("priceeeeee");
    let delivery = document.querySelector(
      'input[name = "delivery"]:checked'
    ).value;
    let lower = $("#one").val();
    let upper = $("#two").val();
    let distance = $("#distance").val();

    $.ajax({
      type: "GET",
      url: setUrl("Common/getCategoryPost"),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        console.log(data.fishPost);
        console.log(delivery);
        //append new posts
        $("#row").html(``);

        /*-----------------if the user selects post type "all"---------------- */

        if ($("#post-type1").is(":checked")) {
          data.allPost.forEach((element) => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(function (position) {
                let user_lat = position.coords.latitude;
                let user_lng = position.coords.longitude;

                let product_lat = parseFloat(element.lat);
                let product_lng = parseFloat(element.lan);

                var map;
                function initMap() {
                  const user_location = {
                    lat: user_lat,
                    lng: user_lng,
                  };
                  const product_location = {
                    lat: product_lat,
                    lng: product_lng,
                  };
                  // console.log(user_location);
                  // console.log(product_location);

                  let directionsService = new google.maps.DirectionsService();
                  let directionsRenderer = new google.maps.DirectionsRenderer();
                  // Create route from existing points used for markers
                  const route = {
                    origin: user_location,
                    destination: product_location,
                    travelMode: "DRIVING",
                  };

                  directionsService.route(route, function (response, status) {
                    // anonymous function to capture directions
                    if (status !== "OK") {
                      window.alert(
                        "Directions request failed due to " + status
                      );
                      return;
                    } else {
                      directionsRenderer.setDirections(response); // Add route to the map
                      var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
                      if (!directionsData) {
                        window.alert("Directions request failed");
                        return;
                      } else {
                        let actual_distance =
                          directionsData.distance.value / 1000;

                        if (distance == "" || actual_distance <= distance) {
                          console.log(
                            element.id +
                              "distance checked" +
                              " " +
                              actual_distance
                          );
                          if (
                            parseInt(element.price) >= lower &&
                            parseInt(element.price) <= upper
                          ) {
                            console.log(element.id + "price checked");
                            if (delivery == 0 || element.delivery == delivery) {
                              console.log(element.id + "delivery checked");

                              $("#row").append(`
                   <div class="category-col-3 col-3">
                   <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
                   <img src=".../../../../images/product/${element.img1}" alt="" />
                   <h4>${element.product_name}</h4>
                   <p>${element.price}</p>
               </div>`);
                            }
                          }
                        }
                      }
                    }
                  });
                }

                initMap();
              });
            } else {
              console.log("Browser doesn't support geolocation!");
            }
          });
        }

        if ($("#post-type2").is(":checked")) {
          data.adoptPost.forEach((element) => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(function (position) {
                let user_lat = position.coords.latitude;
                let user_lng = position.coords.longitude;

                let product_lat = parseFloat(element.lat);
                let product_lng = parseFloat(element.lan);

                var map;
                function initMap() {
                  const user_location = {
                    lat: user_lat,
                    lng: user_lng,
                  };
                  const product_location = {
                    lat: product_lat,
                    lng: product_lng,
                  };
                  // console.log(user_location);
                  // console.log(product_location);

                  let directionsService = new google.maps.DirectionsService();
                  let directionsRenderer = new google.maps.DirectionsRenderer();
                  // Create route from existing points used for markers
                  const route = {
                    origin: user_location,
                    destination: product_location,
                    travelMode: "DRIVING",
                  };

                  directionsService.route(route, function (response, status) {
                    // anonymous function to capture directions
                    if (status !== "OK") {
                      window.alert(
                        "Directions request failed due to " + status
                      );
                      return;
                    } else {
                      directionsRenderer.setDirections(response); // Add route to the map
                      var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
                      if (!directionsData) {
                        window.alert("Directions request failed");
                        return;
                      } else {
                        let actual_distance =
                          directionsData.distance.value / 1000;

                        if (distance == "" || actual_distance <= distance) {
                          console.log(
                            element.id +
                              "distance checked" +
                              " " +
                              actual_distance
                          );
                          if (delivery == 0 || element.delivery == delivery) {
                            console.log(element.id + "delivery checked");

                            $("#row").append(`
                                <div class="category-col-3 col-3">
                                <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
                                <div class="img-wrapper">
                                                  <div class="ribbon-wrapper-red">
                                                      <div class="ribbon-red">ADOPT</div>
                                                  </div>
                                                  <img src="/aquaspace/frontend/images/product/${element.img1}" alt="product image" />
                                              </div>
                      
                                  <h4>${element.product_name}</h4>
                      
                              </div>`);
                          }
                        }
                      }
                    }
                  });
                }

                initMap();
              });
            } else {
              console.log("Browser doesn't support geolocation!");
            }
          });
        }

        if ($("#post-type3").is(":checked")) {
          data.fishPost.forEach((element) => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(function (position) {
                let user_lat = position.coords.latitude;
                let user_lng = position.coords.longitude;

                let product_lat = parseFloat(element.lat);
                let product_lng = parseFloat(element.lan);

                var map;
                function initMap() {
                  const user_location = {
                    lat: user_lat,
                    lng: user_lng,
                  };
                  const product_location = {
                    lat: product_lat,
                    lng: product_lng,
                  };
                  // console.log(user_location);
                  // console.log(product_location);

                  let directionsService = new google.maps.DirectionsService();
                  let directionsRenderer = new google.maps.DirectionsRenderer();
                  // Create route from existing points used for markers
                  const route = {
                    origin: user_location,
                    destination: product_location,
                    travelMode: "DRIVING",
                  };

                  directionsService.route(route, function (response, status) {
                    // anonymous function to capture directions
                    if (status !== "OK") {
                      window.alert(
                        "Directions request failed due to " + status
                      );
                      return;
                    } else {
                      directionsRenderer.setDirections(response); // Add route to the map
                      var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
                      if (!directionsData) {
                        window.alert("Directions request failed");
                        return;
                      } else {
                        let actual_distance =
                          directionsData.distance.value / 1000;

                        if (distance == "" || actual_distance <= distance) {
                          console.log(
                            element.id +
                              "distance checked" +
                              " " +
                              actual_distance
                          );
                          if (
                            parseInt(element.price) >= lower &&
                            parseInt(element.price) <= upper
                          ) {
                            console.log(element.id + "price checked");
                            if (delivery == 0 || element.delivery == delivery) {
                              console.log(element.id + "delivery checked");

                              $("#row").append(`
                   <div class="category-col-3 col-3">
                   <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
                   <img src=".../../../../images/product/${element.img1}" alt="" />
                   <h4>${element.product_name}</h4>
                   <p>${element.price}</p>
               </div>`);
                            }
                          }
                        }
                      }
                    }
                  });
                }

                initMap();
              });
            } else {
              console.log("Browser doesn't support geolocation!");
            }
          });
        }

        if ($("#post-type4").is(":checked")) {
          data.plantPost.forEach((element) => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(function (position) {
                let user_lat = position.coords.latitude;
                let user_lng = position.coords.longitude;

                let product_lat = parseFloat(element.lat);
                let product_lng = parseFloat(element.lan);

                var map;
                function initMap() {
                  const user_location = {
                    lat: user_lat,
                    lng: user_lng,
                  };
                  const product_location = {
                    lat: product_lat,
                    lng: product_lng,
                  };
                  // console.log(user_location);
                  // console.log(product_location);

                  let directionsService = new google.maps.DirectionsService();
                  let directionsRenderer = new google.maps.DirectionsRenderer();
                  // Create route from existing points used for markers
                  const route = {
                    origin: user_location,
                    destination: product_location,
                    travelMode: "DRIVING",
                  };

                  directionsService.route(route, function (response, status) {
                    // anonymous function to capture directions
                    if (status !== "OK") {
                      window.alert(
                        "Directions request failed due to " + status
                      );
                      return;
                    } else {
                      directionsRenderer.setDirections(response); // Add route to the map
                      var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
                      if (!directionsData) {
                        window.alert("Directions request failed");
                        return;
                      } else {
                        let actual_distance =
                          directionsData.distance.value / 1000;

                        if (distance == "" || actual_distance <= distance) {
                          console.log(
                            element.id +
                              "distance checked" +
                              " " +
                              actual_distance
                          );
                          if (
                            parseInt(element.price) >= lower &&
                            parseInt(element.price) <= upper
                          ) {
                            console.log(element.id + "price checked");
                            if (delivery == 0 || element.delivery == delivery) {
                              console.log(element.id + "delivery checked");

                              $("#row").append(`
                   <div class="category-col-3 col-3">
                   <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
                   <img src=".../../../../images/product/${element.img1}" alt="" />
                   <h4>${element.product_name}</h4>
                   <p>${element.price}</p>
               </div>`);
                            }
                          }
                        }
                      }
                    }
                  });
                }

                initMap();
              });
            } else {
              console.log("Browser doesn't support geolocation!");
            }
          });
        }

        if ($("#post-type5").is(":checked")) {
          data.eqPost.forEach((element) => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(function (position) {
                let user_lat = position.coords.latitude;
                let user_lng = position.coords.longitude;

                let product_lat = parseFloat(element.lat);
                let product_lng = parseFloat(element.lan);

                var map;
                function initMap() {
                  const user_location = {
                    lat: user_lat,
                    lng: user_lng,
                  };
                  const product_location = {
                    lat: product_lat,
                    lng: product_lng,
                  };
                  // console.log(user_location);
                  // console.log(product_location);

                  let directionsService = new google.maps.DirectionsService();
                  let directionsRenderer = new google.maps.DirectionsRenderer();
                  // Create route from existing points used for markers
                  const route = {
                    origin: user_location,
                    destination: product_location,
                    travelMode: "DRIVING",
                  };

                  directionsService.route(route, function (response, status) {
                    // anonymous function to capture directions
                    if (status !== "OK") {
                      window.alert(
                        "Directions request failed due to " + status
                      );
                      return;
                    } else {
                      directionsRenderer.setDirections(response); // Add route to the map
                      var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
                      if (!directionsData) {
                        window.alert("Directions request failed");
                        return;
                      } else {
                        let actual_distance =
                          directionsData.distance.value / 1000;

                        if (distance == "" || actual_distance <= distance) {
                          console.log(
                            element.id +
                              "distance checked" +
                              " " +
                              actual_distance
                          );
                          if (
                            parseInt(element.price) >= lower &&
                            parseInt(element.price) <= upper
                          ) {
                            console.log(element.id + "price checked");
                            if (delivery == 0 || element.delivery == delivery) {
                              console.log(element.id + "delivery checked");

                              $("#row").append(
                                `
                   <div class="category-col-3 col-3">
                   <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
                   <img src=".../../../../images/product/${element.img1}" alt="" />
                   <h4>${element.product_name}</h4>
                   <p>${element.price}</p>
               </div>
               `
                              );
                            }
                          }
                        }
                      }
                    }
                  });
                }

                initMap();
              });
            } else {
              console.log("Browser doesn't support geolocation!");
            }
          });
        }
      },
      error: function (errMsg) {
        window.location.replace(
          "/aquaspace/frontend/src/Error/" + errMsg.status + ".html"
        );
      },
    });
  });

  $("#search").keyup(function () {
      $("#no-results-div").hide();
    $("#row").html(``);
    $.ajax({
      type: "GET",
      url: setUrl("Common/getCategoryPost"),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
          let i =0;
        data.allPost.forEach((element) => {
          let keyword = $("#search").val().toLowerCase();
          if (element.product_name.toLowerCase().includes(keyword)){
              i++;
            $("#row").append(
                `
                        <div class="category-col-3 col-3">
                        <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
                        <img src=".../../../../images/product/${element.img1}" alt="" />
                        <h4>${element.product_name}</h4>
                        <p>${element.price}</p>
                        </div>
                `
              );

          }

        });
        if(i==0){
            $("#no-results-div").show();
        }
      },
      error: function (errMsg) {
        window.location.replace(
          "/aquaspace/frontend/src/Error/" + errMsg.status + ".html"
        );
      },
    });
  });
});
