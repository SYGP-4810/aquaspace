function setUrl(text) {
    return "/aquaspace/backend/public/index.php?" + text;
  }
  
  $(document).ready(function () {
    // jQuery methods go here...
  
    $("#cart").click(function () {
      $(".shopping-cart").css("display", "block");
      $("#cart").css("color", "rgb(61, 61, 61)");
      $(".checkout").css("display", "none");
      $("#checkout").css("color", "#aaaaaa");
      $(".complete").css("display", "none");
      $("#complete").css("color", "#aaaaaa");
    });
  
    $("#checkout").click(function () {
      $(".checkout").css("display", "block");
      $("#checkout").css("color", "rgb(61, 61, 61)");
      $(".shopping-cart").css("display", "none");
      $("#cart").css("color", "#aaaaaa");
      $(".complete").css("display", "none");
      $("#complete").css("color", "#aaaaaa");
    });
  
    $("#complete").click(function () {
      $(".complete").css("display", "block");
      $("#complete").css("color", "rgb(61, 61, 61)");
      $(".shopping-cart").css("display", "none");
      $("#cart").css("color", "#aaaaaa");
      $(".checkout").css("display", "none");
      $("#checkout").css("color", "#aaaaaa");
    });
  
    $("#proceed").click(function () {
      $(".checkout").css("display", "block");
      $("#checkout").css("color", "rgb(61, 61, 61)");
      $(".shopping-cart").css("display", "none");
      $("#cart").css("color", "#aaaaaa");
      $(".complete").css("display", "none");
      $("#complete").css("color", "#aaaaaa");
    });
  
    $("#order").click(function () {
      $(".complete").css("display", "block");
      $("#complete").css("color", "rgb(61, 61, 61)");
      $(".cart").css("display", "none");
      $("#cart").css("color", "#aaaaaa");
      $(".checkout").css("display", "none");
      $("#checkout").css("color", "#aaaaaa");
    });
  
    $.ajax({
      type: "GET",
      url: setUrl("Reg/Reg/showCart"),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        console.log(JSON.stringify(data));
  
        data.forEach((element) => {
          let total = element.price * element.quantity;
          $(".shopping-cart .table-responsive tbody").append(
            `
                                     <tr>
                                        <td><input type="checkbox" class="chkbox" id="${element.id}" value="${element.product_id}"></td>
                                        <td>${element.product_name}</td>
                                        <td>${element.price}</td>
                                        <td>${element.quantity}</td>
                                        <td>${total}</td>
                                        <td><i class="far fa-trash-alt"></i></td>
                                    </tr>
                `
          );
        });
      },
      // error: function (errMsg) {
      //   window.location.replace("../src/Error" + errMsg.status + ".html");
      // },
    });
  
    /*--------- when proceed button is clicked, this function would take all the ids and push it into
    an array for all the checked items in the shopping cart---------- */
    $("#proceed").click(function () {
      let array = [];
      $("input[type=checkbox]").each(function () {
        if (this.checked) {
          // array.push($(this).attr("id"));
          var req1 = { id: $(this).attr("value") };
          var item_id = $(this).attr("id");
  
          $.ajax({
            type: "POST",
            async: false,
            url: setUrl("Reg/Reg/getProduct"),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(req1),
            success: function (data) {
              let id = item_id;
              let product_id = req1.id;
              let auth_id = data.auth_id;
              let result = { id, product_id, auth_id };
  
              array.push(result);
            },
            error: function (errMsg) {
              window.location.replace("../src/Error" + errMsg.status + ".html");
            },
          });
        }
      });
  
      console.log(array);
      /*-------------- take the array with the ids of the shopping cart items in the json form and group
      them by the sellers id-------------*/
  
      var o = {};
      var map = array.reduce(function (r, el) {
        if (!o[el.auth_id]) {
          o[el.auth_id] = {
            auth_id: el.auth_id,
            id: [],
            product_id: [],
          };
          r.push(o[el.auth_id]);
        }
        o[el.auth_id].id.push(el.id);
        o[el.auth_id].product_id.push(el.product_id);
        return r;
      }, []);
  
      console.log(map);
  
  
      let i;
      for (i = 0; i < map.length; i++) {
        $("#order-list").append(`
          <tr>
              <th colspan="2">Order ${i + 1}</th>
          </tr>
        `);
        let shipping = 0;
        let amount = 0;
        let j;
        let l = map[i].id.length;
        for (j = 0; j < map[i].id.length; j++) {
          let req2 = {
            id: map[i].id[j],
          };
          $.ajax({
            type: "POST",
            async: false,
            url: setUrl("Reg/Reg/getProductFromCart"),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(req2),
            success: function (data) {
              console.log(data);
              $("#order-list").append(`
                <tr>
                  <td>${data.product_name} x ${data.quantity}(Qty)</td>
                  <td>${data.quantity * data.price}</td>
                </tr>
  
             `);
              amount = amount + data.quantity * data.price;
  
              function getDistance(callback) {
                if ("geolocation" in navigator) {
                  navigator.geolocation.getCurrentPosition(function (position) {
                    let user_lat = position.coords.latitude;
                    let user_lng = position.coords.longitude;
  
                    let product_lat = parseFloat(data.lat);
                    let product_lng = parseFloat(data.lan);
                    const user_location = {
                      lat: user_lat,
                      lng: user_lng,
                    };
                    const product_location = {
                      lat: product_lat,
                      lng: product_lng,
                    };
  
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
                          callback(directionsData.distance.value / 1000);
                        }
                      }
                    });
                  });
                }
              }
  
              if (data.delivery != 0) {
                getDistance(function (distance) {
                  console.log(distance);
                  let req3 = {
                    product_id: data.product_id,
                    delivery: data.delivery,
                    quantity: data.quantity,
                    weight: data.weight,
                    distance: distance,
                    seller: data.auth_id,
                  };
  
                  console.log(req3);
                  $.ajax({
                    type: "POST",
                    url: setUrl("Reg/Reg/getShipping"),
                    async: false,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify(req3),
                    success: function (data) {
                      // console.log(data);
                      shipping = shipping + data;
                      console.log(shipping);
                    },
                    error: function (errMsg) {
                      window.location.replace(
                        "../src/Error" + errMsg.status + ".html"
                      );
                    },
                  });
                });
              }
  
              if (data.delivery != 0) {
                if ("geolocation" in navigator) {
                  navigator.geolocation.getCurrentPosition(function (position) {
                    let user_lat = position.coords.latitude;
                    let user_lng = position.coords.longitude;
  
                    let product_lat = parseFloat(data.lat);
                    let product_lng = parseFloat(data.lan);
                      const user_location = {
                        lat: user_lat,
                        lng: user_lng,
                      };
                      const product_location = {
                        lat: product_lat,
                        lng: product_lng,
                      };
  
                      let directionsService = new google.maps.DirectionsService();
                      let directionsRenderer =
                        new google.maps.DirectionsRenderer();
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
  
                            let req3 = {
                              product_id: data.product_id,
                              delivery: data.delivery,
                              quantity: data.quantity,
                              weight: data.weight,
                              distance : actual_distance,
                              seller : data.auth_id,
                            };
  
                            console.log(req3);
                            $.ajax({
                              type: "POST",
                              url: setUrl("Reg/Reg/getShipping"),
                              contentType: "application/json; charset=utf-8",
                              dataType: "json",
                              data: JSON.stringify(req3),
                              success: function (data) {
                                // console.log(data);
                                shipping = shipping + data;
                                console.log(shipping)
                              },
                              error: function (errMsg) {
                                window.location.replace(
                                  "../src/Error" + errMsg.status + ".html"
                                );
                              },
  
                            });
  
                          }
                        }
                      });
  
                  });
                }
              }
            },
            error: function (errMsg) {
              window.location.replace("../src/Error" + errMsg.status + ".html");
            },
          });
        }
        $("#order-list").append(`
        <tr>
              <td>Subtotal</td>
              <td>${amount}</td>
        </tr>
                              `);
        $("#order-list").append(`
        <tr>
              <td>Shipping</td>
              <td>${shipping}</td>
        </tr>
                              `);
  
        console.log(shipping);
      }
  
      /*----------- $.ajax({
        type: "POST",
        async: false,
        url: setUrl("Reg/Reg/makeOrder"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(map),
        success: function (data) {
  
          console.log("ys yes")
  
          console.log(data);
  
        },
        // error: function (errMsg) {
        //   window.location.replace("../src/Error" + errMsg.status + ".html");
        // },
      });
      -------------*/
    });
  });
  
  // djskfsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
  
  // function setUrl(text) {
  //   return "/aquaspace/backend/public/index.php?" + text;
  // }
  
  // $(document).ready(function () {
  //   // jQuery methods go here...
  
  //   $("#cart").click(function () {
  //     $(".shopping-cart").css("display", "block");
  //     $("#cart").css("color", "rgb(61, 61, 61)");
  //     $(".checkout").css("display", "none");
  //     $("#checkout").css("color", "#aaaaaa");
  //     $(".complete").css("display", "none");
  //     $("#complete").css("color", "#aaaaaa");
  //   });
  
  //   $("#checkout").click(function () {
  //     $(".checkout").css("display", "block");
  //     $("#checkout").css("color", "rgb(61, 61, 61)");
  //     $(".shopping-cart").css("display", "none");
  //     $("#cart").css("color", "#aaaaaa");
  //     $(".complete").css("display", "none");
  //     $("#complete").css("color", "#aaaaaa");
  //   });
  
  //   $("#complete").click(function () {
  //     $(".complete").css("display", "block");
  //     $("#complete").css("color", "rgb(61, 61, 61)");
  //     $(".shopping-cart").css("display", "none");
  //     $("#cart").css("color", "#aaaaaa");
  //     $(".checkout").css("display", "none");
  //     $("#checkout").css("color", "#aaaaaa");
  //   });
  
  //   $("#proceed").click(function () {
  //     $(".checkout").css("display", "block");
  //     $("#checkout").css("color", "rgb(61, 61, 61)");
  //     $(".shopping-cart").css("display", "none");
  //     $("#cart").css("color", "#aaaaaa");
  //     $(".complete").css("display", "none");
  //     $("#complete").css("color", "#aaaaaa");
  //   });
  
  //   $("#order").click(function () {
  //     $(".complete").css("display", "block");
  //     $("#complete").css("color", "rgb(61, 61, 61)");
  //     $(".cart").css("display", "none");
  //     $("#cart").css("color", "#aaaaaa");
  //     $(".checkout").css("display", "none");
  //     $("#checkout").css("color", "#aaaaaa");
  //   });
  
  //   $.ajax({
  //     type: "GET",
  //     url: setUrl("Reg/Reg/showCart"),
  //     contentType: "application/json; charset=utf-8",
  //     dataType: "json",
  //     success: function (data) {
  //       console.log(JSON.stringify(data));
  
  //       data.forEach((element) => {
  //         let total = element.price * element.quantity;
  //         $(".shopping-cart .table-responsive tbody").append(
  //           `
  //                                    <tr>
  //                                       <td><input type="checkbox" class="chkbox" id="${element.id}" value="${element.product_id}"></td>
  //                                       <td>${element.product_name}</td>
  //                                       <td>${element.price}</td>
  //                                       <td>${element.quantity}</td>
  //                                       <td>${total}</td>
  //                                       <td><i class="far fa-trash-alt"></i></td>
  //                                   </tr>
  //               `
  //         );
  //       });
  //     },
  //     // error: function (errMsg) {
  //     //   window.location.replace("../src/Error" + errMsg.status + ".html");
  //     // },
  //   });
  
  //   /*--------- when proceed button is clicked, this function would take all the ids and push it into
  //   an array for all the checked items in the shopping cart---------- */
  //   $("#proceed").click(function () {
  //     let array = [];
  //     $("input[type=checkbox]").each(function () {
  //       if (this.checked) {
  //         // array.push($(this).attr("id"));
  //         var req1 = { id: $(this).attr("value") };
  //         var item_id = $(this).attr("id");
  
  //         $.ajax({
  //           type: "POST",
  //           async: false,
  //           url: setUrl("Reg/Reg/getProduct"),
  //           contentType: "application/json; charset=utf-8",
  //           dataType: "json",
  //           data: JSON.stringify(req1),
  //           success: function (data) {
  //             let id = item_id;
  //             let product_id = req1.id;
  //             let auth_id = data.auth_id;
  //             let result = { id, product_id, auth_id };
  
  //             array.push(result);
  //           },
  //           error: function (errMsg) {
  //             window.location.replace("../src/Error" + errMsg.status + ".html");
  //           },
  //         });
  //       }
  //     });
  
  //     /*-------------- take the array with the ids of the shopping cart items in the json form and group
  //     them by the sellers id-------------*/
  
  //     var o = {};
  //     var map = array.reduce(function (r, el) {
  //       if (!o[el.auth_id]) {
  //         o[el.auth_id] = {
  //           auth_id: el.auth_id,
  //           id: [],
  //           product_id: [],
  //         };
  //         r.push(o[el.auth_id]);
  //       }
  //       o[el.auth_id].id.push(el.id);
  //       o[el.auth_id].product_id.push(el.product_id);
  //       return r;
  //     }, []);
  //     console.log(map);
  //     console.log(map.length);
  //     let i;
  //     for (i = 0; i < map.length; i++) {
  //       $("#order-list").append(`
  //         <tr>
  //             <th colspan="2">Order ${i + 1}</th>
  //         </tr>
  //       `);
  //       let shipping = 0;
  //       let amount = 0;
  //       let j;
  //       let l = map[i].id.length;
  //       for (j = 0; j < map[i].id.length; j++) {
  //         let req2 = {
  //           id: map[i].id[j],
  //         };
  //         $.ajax({
  //           type: "POST",
  //           async: false,
  //           url: setUrl("Reg/Reg/getProductFromCart"),
  //           contentType: "application/json; charset=utf-8",
  //           dataType: "json",
  //           data: JSON.stringify(req2),
  //           success: function (data) {
  //             console.log(data);
  //             $("#order-list").append(`
  //               <tr>
  //                 <td>${data.product_name} x ${data.quantity}(Qty)</td>
  //                 <td>${data.quantity * data.price}</td>
  //               </tr>
  
  //            `);
  //             amount = amount + (data.quantity * data.price);
  
  //             if (data.delivery != 0) {
  //               if ("geolocation" in navigator) {
  //                 navigator.geolocation.getCurrentPosition(function (position) {
  //                   let user_lat = position.coords.latitude;
  //                   let user_lng = position.coords.longitude;
  
  //                   let product_lat = parseFloat(data.lat);
  //                   let product_lng = parseFloat(data.lan);
  //                     const user_location = {
  //                       lat: user_lat,
  //                       lng: user_lng,
  //                     };
  //                     const product_location = {
  //                       lat: product_lat,
  //                       lng: product_lng,
  //                     };
  
  //                     let directionsService = new google.maps.DirectionsService();
  //                     let directionsRenderer =
  //                       new google.maps.DirectionsRenderer();
  //                     // Create route from existing points used for markers
  //                     const route = {
  //                       origin: user_location,
  //                       destination: product_location,
  //                       travelMode: "DRIVING",
  //                     };
  
  //                     directionsService.route(route, function (response, status) {
  //                       // anonymous function to capture directions
  //                       if (status !== "OK") {
  //                         window.alert(
  //                           "Directions request failed due to " + status
  //                         );
  //                         console.log("trouble")
  //                       } else {
  //                         directionsRenderer.setDirections(response); // Add route to the map
  //                         var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
  //                         if (!directionsData) {
  //                           window.alert("Directions request failed");
  //                           console.log("trouble")
  //                         } else {
  //                           let actual_distance =
  //                             directionsData.distance.value / 1000;
  //                             console.log(actual_distance)
  
  //                         }
  //                       }
  //                     });
  
  //                 });
  //               }
  //             }
  //           },
  //           error: function (errMsg) {
  //             window.location.replace("../src/Error" + errMsg.status + ".html");
  //           },
  //         });
  //       }
  //       $('#order-list').append(`
  //       <tr>
  //                                 <td>Subtotal</td>
  //                                 <td>${amount}</td>
  //                             </tr>
  //                             `)
  //                             $('#order-list').append(`
  //                             <tr>
  //                                                       <td>Shipping</td>
  //                                                       <td>${shipping}</td>
  //                                                   </tr>
  //                                                   `)
  
  //     }
  
  //   });
  // });
  