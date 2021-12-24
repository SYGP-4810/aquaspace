
  


//   // function  fuck(){
//   //     let latt = 40.7767644;
//   // let lann = -73.9761399;
//   //     return latt;
//   //     return lann;
//   // }

    function initMap(){
    const dakota = { lat: 40.7767644, lng: -73.9761399 };
    const frick = { lat: 40.771209, lng: -73.9673991 };
    // The markers for The Dakota and The Frick Collection
    // var mk1 = new google.maps.Marker({ position: dakota, map: map });
    // var mk2 = new google.maps.Marker({ position: frick, map: map });

    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer();
    // Create route from existing points used for markers
    const route = {
      origin: dakota,
      destination: frick,
      travelMode: "DRIVING",
    };

    directionsService.route(route, function (response, status) {
      // anonymous function to capture directions
      if (status !== "OK") {
        window.alert("Directions request failed due to " + status);
        return;
      } else {
        directionsRenderer.setDirections(response); // Add route to the map
        var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
        if (!directionsData) {
          window.alert("Directions request failed");
          return;
        } else {
          console.log("Driving distance is " + directionsData.distance.text +
            " (" +
            directionsData.duration.text +
            ").");
        }
      }
    });
  
}



