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

// MAP
var map;
var newMarker;
var newZealand = {
    lat: -41.279178,
    lng: 174.780331
};

// CITIES
var allCities = [{
        "name": "Christchurch",
        "lat": "-43.513046",
        "lng": "172.4589949"
    },
    {
        "name": "Dunedin",
        "lat": "-45.8726724",
        "lng": "170.4570794"
    },
    {
        "name": "Wellington",
        "lat": "-41.284526",
        "lng": "174.7712372"
    },
    {
        "name": "Auckland",
        "lat": "-36.8629409",
        "lng": "174.7253864"
    }
];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: newZealand,
        zoom: 6,
        disableDefaultUI: true,
        styles: [{
                elementType: 'geometry',
                stylers: [{
                    color: '#242f3e'
                }]
            },
            {
                elementType: 'labels.text.stroke',
                stylers: [{
                    color: '#242f3e'
                }]
            },
            {
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#746855'
                }]
            },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#d59563'
                }]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#d59563'
                }]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{
                    color: '#263c3f'
                }]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#6b9a76'
                }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{
                    color: '#38414e'
                }]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#212a37'
                }]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#9ca5b3'
                }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{
                    color: '#746855'
                }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#1f2835'
                }]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#f3d19c'
                }]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{
                    color: '#2f3948'
                }]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#d59563'
                }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{
                    color: '#17263c'
                }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#515c6d'
                }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{
                    color: '#17263c'
                }]
            }
        ]
    });
    var startPoint = document.getElementById('startPoint');
    new google.maps.places.Autocomplete(startPoint);
    var endPoint = document.getElementById('endPoint');
    new google.maps.places.Autocomplete(endPoint);

    console.log(map);
}

//     var directionsService = new google.maps.DirectionsService();
//     var directionsDisplay = new google.maps.DirectionsRenderer();

//     map.addnumListener('click', function(event) {
//         var transportMode = getTransportMode();
//         clickMarkerLocation = event.latLng;

//         showDirections(clickMarkerLocation, transportMode);
//     });

//     function showDirections(destinationLocation, transportMode){
//         if(directionsDisplay){
//             directionsDisplay.setMap(null);
//         }

//         var request = {
//             origin: yoobee,
//             destination: destinationLocation,
//             travelMode: 'DRIVING'
//         };
//         directionsService.route(request, function(result, status) {
//             if (status == 'OK') {
//                 directionsDisplay.setMap(map);
//                 directionsDisplay.setDirections(result);
//                 document.getElementById('time').innerText = 'Time to get to destination is '+ result.routes[0].legs[0].duration.text;
//                 document.getElementById('distance').innerText = 'Total distance to destination is '+result.routes[0].legs[0].distance.text;
//                 addMarker();
//             } else if(status == 'NOT_FOUND'){
//                 document.getElementById('time').innerText = '';
//                 document.getElementById('distance').innerText = '';
//                 removeMarker();
//                 alert("At least one of the locations specified in the request's origin, destination could not be geocoded.");
//             } else if(status == 'ZERO_RESULTS'){
//                 document.getElementById('time').innerText = '';
//                 document.getElementById('distance').innerText = '';
//                 removeMarker();
//                 alert("No route could be found between the origin and destination.");
//             }
//         });
//     }
// }

// function addMarker(){
//     removeMarker();

//     newMarker = new google.maps.Marker({
//         position: clickMarkerLocation,
//         map: map
//     });
// }

// function removeMarker(){
//     if(newMarker && newMarker.setMap){
//         newMarker.setMap(null);
//     }
// }

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

$('.tool-tip-bottom').tooltipster({
    theme: 'tooltipster-light',
    position: 'bottom',
    animation: 'grow',
    delay: 200,
});

$('.tool-tip-top').tooltipster({
    theme: 'tooltipster-light',
    position: 'top',
    animation: 'grow',
    delay: 200,
});

// PAGE SCROLLING
$(document).ready(function () {
    $('#mainContainer').pagepiling({
        verticalCentered: false,
        css3: false,
        scrollingSpeed: 200,
        loopBottom: false,
        loopTop: false,
        normalScrollElements: null,
        normalScrollElementTouchThreshold: 5,
        touchSensitivity: 5,
        keyboardScrolling: false,
        animateAnchor: false,
        // showActiveTooltip: true,
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'lastPage'],
        menu: '#myMenu',
        navigation: {
            'textColor': '#f79e33',
            'bulletsColor': '#f79e33',
            'position': 'left',
            'tooltips': ['Index', 'Dates', 'People', 'Destination', 'Vehicles', 'Confirm']
        }
    });
});

$(function () {
    $.fn.pagepiling.setMouseWheelScrolling(false);
    $.fn.pagepiling.setAllowScrolling(false);
});

// POP-UPS
// INFORMATION POP-UP
$("#info-pop").iziModal({
    title: 'NZ Journey Planner Information',
    headerColor: '#2b2f3a',
    padding: 15,
    radius: 0,
});

$(document).on('click', '.info-trigger', function (event) {
    event.preventDefault();
    $('#info-pop').iziModal('open');
    // console.log(document.getElementsByClassName('iziModal'));
});

// DATE PICKER
// CREATE DAYS LIST
var dayList = [];
var dayListValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];

// DATE FORMAT
var dateFormat = 'mm/dd/yy',
	from = $('#pickDate')
		.datepicker({
			dateFormat: 'dd/mm/yy',
			defaultDate: 0,
			minDate: 0,
			numberOfMonths: 1
		})
		.on('change', function() {
			to.datepicker('option', 'minDate', getDate(this));
		});
	to = $('#dropDate').datepicker({
		dateFormat: 'dd/mm/yy',
		defaultDate: 0,
		minDate: 0,
		numberOfMonths: 1
	})
	.on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });

// RETURN DATE
function getDate(element) {
	var dateFormat = 'dd/mm/yy';
	var newDate = $('#pickDate').datepicker({dateFormat: 'mm/dd/yy'});
	var date;
	try {
		date = $.datepicker.parseDate(dateFormat, element.value);
	} catch (error) {
		date = null;
	}
	return date;
}

// EVENT LISTENER
// document.getElementById('dateBtn').addEventListener('click', calculateDays);

var getCheckInDate = document.getElementById('getCheckIn');
var getCheckOutDate = document.getElementById('getCheckOut');
var daysSelected = document.getElementById('daysSelected');

// FIRST DATE
$('.datepicker1').pickadate({
    clear: '',
    min: new Date(),
});

$('.datepicker1').change(function () {

    var firstDate = $('#getCheckIn').val();

    //SECOND DATE
    $('.datepicker2').pickadate({
        clear: '',
        min: new Date(firstDate),
        onClose: function () {
            calculateDays();
          }
    });
});

// FUNCTION
function calculateDays () {

    // CALCULATE DAYS BETWEEN DATES
    var startDate = Date.parse(getCheckIn.value);
    var endDate = Date.parse(getCheckOut.value);
    var timeDiff = endDate - startDate;
    daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // PUSH THE DATE
    daysSelected.innerText = daysDiff;
    console.log('Number of Days');
    console.log(daysDiff);
  }

// ADD NUMBER OF PEOPLE
document.getElementById('peopleBtn').addEventListener('click', addNumber);

// CREATE NUMBER LIST
var numList = [];
var numListValues = ["1", "2", "3", "4", "5", "6"];

// FUNCTION
function addNumber(newNum) {
    newNum = document.getElementById("peopleNum").selectedIndex;
    document.getElementsByTagName("option")[newNum].value;
    numList.splice(0, 1);
    numList.push(newNum);
    console.log('Number of People');
    console.log(numList);
}