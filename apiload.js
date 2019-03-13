(function() {
  var httpRequest;
  document.getElementById("submit").addEventListener('click', makeRequest);
  
  function makeRequest() {
    var ipAddress = document.getElementsByName("ip")[0].value;
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', 'http://free.ipwhois.io/json/' + ipAddress);
    httpRequest.send();
  }

  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        var parseRequest = JSON.parse(httpRequest.responseText);
		document.getElementById("latitude").innerHTML = parseRequest.latitude;
		document.getElementById("longitude").innerHTML = parseRequest.longitude;
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
  function newIp() {
	var ipAddress = document.getElementsByName("ip").value;
  } 
})();