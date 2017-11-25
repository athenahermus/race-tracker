<div id="map_wrapper">
    <div id="map_canvas" class="mapping"></div>
</div>
<script>
var map;
var bounds;
var evtFired = false;
var markerArray = []
function initMap() {
        markerArray = [
         {'you':{'name':'Ping AuYeung','lat':32.9924848,'long':-117.1619827,'place': 99},
          'first': {'name':'Ed Hoffman','lat':32.9925734,'long':-117.1624186},'place': 2},
         {'you':{'name':'Ping AuYeung','lat': 32.991924,'long':-117.161002, 'place': 99},
          'first': {'name':'Ed Hoffman','lat': 32.991808,'long':-117.160513, 'place': 1}}
        ]
    var bounds = new google.maps.LatLngBounds();
    var myLatlng = new google.maps.LatLng(32.9924848, -117.1619827);
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
    jQuery.get("http://localhost:5050/trackers/eventId=100", function(data, status){
        console.log("Data: ", data, "\nStatus: ",status);
    });
       addMarker();
      }
    }, 3000);
}
function addMarker() {
    // Multiple Markers
    var markerArr = markerArray.shift()
    if (markerArr &&(markerArr.hasOwnProperty('first') || markerArr.hasOwnProperty('you'))) {
    var markers = [
        [markerArr.first.name, markerArr.first.lat, markerArr.first.long, markerArr.first.place],
        [markerArr.you.name, markerArr.you.lat, markerArr.you.long, markerArr.you.place]
    ];
    var infoWindowContent = [[markerArr.first.name],[markerArr.you.name]];
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    // Loop through our array of markers & place each one on the map  
    var myLatLing
    for( i = 0; i < markers.length; i++ ) {
        var colorIcon = markers[i][3] === 1 ? 'green-dot.png' : 'blue-dot.png';
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        if (markers[i][3] === 99) {
           colorIcon = 'yellow-dot.png';
           myLatLng = position;
        }
        // bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0],
            icon: 'http://maps.google.com/mapfiles/ms/icons/'+colorIcon
        });
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));
        // Automatically center the map fitting all markers on the screen
        // map.fitBounds(bounds);
    }
    map.panTo(myLatLng)
    }
}
</script>
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVaTdaBwTHlSwVgj8ohmz6bVupFbjDgmc&callback=initMap">
</script>