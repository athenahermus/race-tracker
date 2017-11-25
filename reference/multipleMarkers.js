<div id="map_wrapper">
    <div id="map_canvas" class="mapping"></div>
</div>
<script>
jQuery(function($) {
    // Asynchronously Load the map API 
    var script = document.createElement('script');
    script.src = "//maps.googleapis.com/maps/api/js?key=AIzaSyCVaTdaBwTHlSwVgj8ohmz6bVupFbjDgmc&sensor=false&callback=initMap";
    document.body.appendChild(script);
});
function initMap() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var myLatlng = new google.maps.LatLng(32.9924848, -117.1619827);
    var mapOptions = {
        center: myLatlng,
        mapTypeId: 'roadmap'
    };                    
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);
    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });
}
function addMarker(markerArr, bounds) {
    // Multiple Markers
    var markers = [
        [markerArr.first.name, markerArr.first.lat, markerArr.first.long],
        [markerArr.you.name, markerArr.you.lat, markerArr.you.long]
    ];
    var infoWindowContent = [[markerArr.first.name],[markerArr.you.name]];
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));
        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }
}
     setTimeout(function(){ 
        // Multiple Markers
        var bounds = new google.maps.LatLngBounds();
        var markerArr = [
         {'you':{'name':'Ping AuYeung','lat':32.9924848,'long':-117.1619827},
          'first': {'name':'Ed Hoffman','lat':32.9925734,'long':-117.1624186}},
         {'you':{'name':'Ping AuYeung','lat': 32.991924,'long':-117.161002},
          'first': {'name':'Ed Hoffman','lat': 32.991808,'long':-117.160513}}
        ]
        if(markerArr.length > 0) {
            var marker = markerArr.shift() 
            callMarker(marker, bounds)
        }
    },3000);
</script>