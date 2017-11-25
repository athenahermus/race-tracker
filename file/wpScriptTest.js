<div id="map_wrapper">
    <div id="map_canvas" class="mapping"></div>
</div>
<script>
var map;
var bounds;
var evtFired = false;
var sequenceCnt = 1;
var markerArray = []
var focusSubject = 'Ping AuYeung'
var myLatLng = {};
function initMap() {
    var bounds = new google.maps.LatLngBounds();
    myLatlng = new google.maps.LatLng(33.047267, -117.296407);
    var mapOptions = {
        zoom: 16,
        center: myLatlng,
        mapTypeId: 'roadmap'
    };                    
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    // map.setTilt(45);
    map.addListener('click', function(event) {
      evtFired = false;
      initMap();
    });
    setInterval(function() {
      if (!evtFired) {
    jQuery.get("http://localhost:5050/trackers/100/sequence/"+sequenceCnt, function(data, status){
        if (status ===  'success') {
					sequenceCnt += 1
					addMarker(data);
				} else {
					clearInterval(timer);
				}
    });
       //addMarker(markerArray);
      }
    }, 3000);
}
function addMarker(data) {
    // Multiple Markers
    // Display multiple markers on a map
	  var markerArr = data;
		//var outData = JSON.stringify(markerArr, null, 2)
	  //alert(' markerArr ' + outData)
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markerArr.length; i++ ) {
        // var colorIcon = markerArr[i].name === focusSubject ? 'green-dot.png' : 'blue-dot.png';
				// alert('markerArr.name ' +  markerArr[i].name  + ' focusSubject ' + focusSubject)
        var position = new google.maps.LatLng(markerArr[i].lat, markerArr[i].lng);
        if (markerArr[i].name === focusSubject) {
					 // alert (' match ' )
           colorIcon = 'yellow-dot.png';
           myLatLng = position;
        } else {
					 colorIcon = 'blue-dot.png'
				}
        // bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markerArr[i].name,
            icon: 'http://maps.google.com/mapfiles/ms/icons/'+colorIcon
        });
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(markerArr[i].name + ' speed ' + markerArr[i].speed + 'ft/s');
                infoWindow.open(map, marker);
            }
        })(marker, i));
        // Automatically center the map fitting all markers on the screen
        // map.fitBounds(bounds);
    }
    map.panTo(myLatLng)
}
</script>
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVaTdaBwTHlSwVgj8ohmz6bVupFbjDgmc&callback=initMap">
</script>