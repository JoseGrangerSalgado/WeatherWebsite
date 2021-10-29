let map;

function initMap(lat,lng,zoom) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: lng },
    zoom: zoom,
    streetViewControl: false,
    fullscreenControl: false,
  });
  map.setOptions({scrollwheel: false, disableDoubleClickZoom: true});
  let infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: { lat: lat, lng: lng },
  });

  infoWindow.open(map);
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    let latitude = mapsMouseEvent.latLng.toJSON().lat;
    let longitude = mapsMouseEvent.latLng.toJSON().lng;
    
    fillTable(latitude,longitude);
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    infoWindow.open(map);
  });
}

async function fillTable(latitude,longitude) {
  const responseFromServer = await fetch(`/public/map/${latitude}/${longitude}`);
  const weather = await responseFromServer.json();
  console.log(weather);
  document.getElementById("Condition").textContent=weather.weather[0].description;
  document.getElementById("Temperature").textContent=weather.main.temp;
  document.getElementById("Location").textContent=weather.name;
  document.getElementById("Humidity").textContent=weather.main.humidity;


}






