(function() {
  var httpRequest;
  document.getElementById("submit").addEventListener('click', IPWHOISRequest);
  
  function IPWHOISRequest() {
    var ipAddress = document.getElementsByName("ip")[0].value;
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('HTTP Request was denied.');
      return false;
    }
    httpRequest.onreadystatechange = dataRead;
    httpRequest.open('GET', 'http://free.ipwhois.io/json/' + ipAddress);
    httpRequest.send();
  }

  function dataRead() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        var parseRequest = JSON.parse(httpRequest.responseText);
		document.getElementById("latitude").innerHTML = parseRequest.latitude;
		document.getElementById("longitude").innerHTML = parseRequest.longitude;
		document.getElementById("country").innerHTML = parseRequest.county;
		document.getElementById("region").innerHTML = parseRequest.region;
		document.getElementById("city").innerHTML = parseRequest.city;
		
		var lat = parseRequest.latitude;
		var lng = parseRequest.longitude;
		var latLng = new google.maps.LatLng(lat, lng);
		
		marker.setPosition(latLng);
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
  
  function newIp() {
	var ipAddress = document.getElementsByName("ip").value;
  } 

})();


function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
	  draggable:false,
      zoomControl: false,
      center: {lat: 0,  lng: 0}
    });

    marker = new google.maps.Marker({
                map:map,
                animation: google.maps.Animation.DROP,
                position: {lat: 0,  lng:  0}
    });
}

