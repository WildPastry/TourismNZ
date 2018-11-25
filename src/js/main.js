/*jslint browser:true */
console.log('JS READY');

// LOADER
$(window).on('load', function () {
    $('#preloader-icon').fadeOut('slow');
    $('#preloader').delay(350).fadeOut('slow');
    $('body').delay(350).css({
        'overflow': 'visible'
    });
});

// TOOL TIPSTER
$('.tool-tip-right').tooltipster({
    theme: 'tooltipster-light',
    position: 'right',
    animation: 'grow',
    delay: 200,
});

$('.tool-tip-left').tooltipster({
    theme: 'tooltipster-light',
    position: 'left',
    animation: 'grow',
    delay: 200,
});

// PAGE PILING
$(document).ready(function () {
    $('#mainContainer').pagepiling({
        verticalCentered: false,
        css3: false,
        scrollingSpeed: 200,
        loopBottom: true,
        loopTop: false,
        normalScrollElements: null,
        normalScrollElementTouchThreshold: 5,
        touchSensitivity: 5,
        keyboardScrolling: true,
        animateAnchor: false,
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage','lastPage'],
        menu: '#myMenu',
        navigation: {
            'textColor': '#f79e33',
            'bulletsColor': '#f79e33',
            'position': 'left',
            'tooltips': ['Index', 'Input', 'Plan', 'Select', 'Options', 'Confirm']
        }
    });
});

// MAP
var map;
var yoobee = {
    lat: -41.279178,
    lng: 174.780331
}
var newMarker;
var clickMarkerLocation;
var radioOptions = document.getElementsByName("mode");

function initMap() {

    for (var i = 0; i < radioOptions.length; i++) {
        radioOptions[i].addEventListener('change', function(){
            var transportMode = getTransportMode();
            if(clickMarkerLocation){
                showDirections(clickMarkerLocation, transportMode);
            }
        });
    }

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();

    map = new google.maps.Map(document.getElementById('map'), {
        center: yoobee,
        zoom: 6,
        scrollwheel: false,
        disableDefaultUI: true,
        styles: [
            {
                elementType: 'geometry',
                stylers: [{color: '#242f3e'}]
            },
            {
                elementType: 'labels.text.stroke',
                stylers: [{color: '#242f3e'}]
            },
            {
                elementType: 'labels.text.fill',
                stylers: [{color: '#746855'}]
            },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
            }
        ]
    });

    console.log(map);

    var marker = new google.maps.Marker({
        position: yoobee,
        map: map
    });

    map.addListener('click', function(event) {
        var transportMode = getTransportMode();
        clickMarkerLocation = event.latLng;

        showDirections(clickMarkerLocation, transportMode);
    });

    function showDirections(destinationLocation, transportMode){
        if(directionsDisplay){
            directionsDisplay.setMap(null);
        }

        var request = {
            origin: yoobee,
            destination: destinationLocation,
            travelMode: transportMode
        };
        directionsService.route(request, function(result, status) {
            if (status == 'OK') {
                directionsDisplay.setMap(map);
                directionsDisplay.setDirections(result);
                document.getElementById('time').innerText = 'Time to get to destination is '+ result.routes[0].legs[0].duration.text;
                document.getElementById('distance').innerText = 'Total distance to destination is '+result.routes[0].legs[0].distance.text;
                addMarker();
            } else if(status == 'NOT_FOUND'){
                document.getElementById('time').innerText = '';
                document.getElementById('distance').innerText = '';
                removeMarker();
                alert("At least one of the locations specified in the request's origin, destination could not be geocoded.")
            } else if(status == 'ZERO_RESULTS'){
                document.getElementById('time').innerText = '';
                document.getElementById('distance').innerText = '';
                removeMarker();
                alert("No route could be found between the origin and destination.");
            }
        });
    }
}

function getTransportMode(){
    if (radioOptions) {
        for (var i = 0; i < radioOptions.length; i++) {
            if (radioOptions[i].checked){
                 return radioOptions[i].value;
            }
        }
    }
}

function addMarker(){
    removeMarker();

    newMarker = new google.maps.Marker({
        position: clickMarkerLocation,
        map: map
    });
}

function removeMarker(){
    if(newMarker && newMarker.setMap){
        newMarker.setMap(null);
    }
}