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
  lat: -41.278919,
  lng: 172.5
};

var options = {
  types: ['(cities)'],
  componentRestrictions: {
    country: 'nz'
  }
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
    "name": "Hamilton",
    "lat": "-37.7751208",
    "lng": "175.1948842"
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

// INIT MAP
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: newZealand,
    zoom: 6,
    disableDefaultUI: true,
    styles: [{
        "elementType": "geometry",
        "stylers": [{
          "color": "#ebe3cd"
        }]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#523735"
        }]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#f5f1e6"
        }]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#c9b2a6"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#dcd2be"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#ae9e90"
        }]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#93817c"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#a5b076"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#447530"
        }]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f1e6"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
          "color": "#fdfcf8"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f8c967"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#e9bc62"
        }]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e98d58"
        }]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#db8555"
        }]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#806b63"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#8f7d77"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#ebe3cd"
        }]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#aadee1"
          },
          {
            "weight": 2
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#92998d"
        }]
      }
    ]
  });

  console.log(map);

  new AutocompleteDirectionsHandler(map);
}

function AutocompleteDirectionsHandler(map) {
  this.map = map;
  this.originPlaceId = null;
  this.destinationPlaceId = null;
  this.travelMode = 'DRIVING';
  var originInput = document.getElementById('startPoint');
  var destinationInput = document.getElementById('endPoint');
  var modeSelector = document.getElementById('mode-selector');
  this.directionsService = new google.maps.DirectionsService();
  this.directionsDisplay = new google.maps.DirectionsRenderer();
  this.directionsDisplay.setMap(map);

  var originAutocomplete = new google.maps.places.Autocomplete(
    originInput, options, {
      placeIdOnly: true
    });
  var destinationAutocomplete = new google.maps.places.Autocomplete(
    destinationInput, options, {
      placeIdOnly: true
    });

  this.setupClickListener('changemode-walking', 'WALKING');
  this.setupClickListener('changemode-transit', 'TRANSIT');
  this.setupClickListener('changemode-driving', 'DRIVING');

  this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
  this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');
  // console.log(map); DEFINED
}

// LISTENER FOR AUTOCOMPLETE FILTER
AutocompleteDirectionsHandler.prototype.setupClickListener = function (id, mode) {
  var radioButton = document.getElementById(id);
  var me = this;
  radioButton.addEventListener('click', function () {
    me.travelMode = mode;
    me.route();
  });
  // console.log(map); UNDEFINED
};

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (autocomplete, mode) {

  var me = this;
  autocomplete.bindTo('bounds', this.map);
  autocomplete.addListener('place_changed', function () {
    var place = autocomplete.getPlace();
    var latitude = place.geometry.location.lat();
    var longitude = place.geometry.location.lng();
    console.log(latitude);
    console.log(longitude);
    console.log(place.address_components);

    // console.log(map); UNDEFINED

    if (!place.place_id) {
      window.alert("Please select an option from the dropdown list.");
      return;
    }
    if (mode === 'ORIG') {
      me.originPlaceId = place.place_id;
      destText1.innerText = ('You have selected... ');
      destSelectedStart.innerText = place.name + (' ');
      $("#destError1").hide();
      $("#destValid1").show();
    } else {
      me.destinationPlaceId = place.place_id;
      destSelectedEnd.innerText = (' to ') + place.name;
      $("#destError2").hide();
      $("#destValid2").show();
    }
    me.route();
  });

};

AutocompleteDirectionsHandler.prototype.route = function () {
  if (!this.originPlaceId || !this.destinationPlaceId) {
    return;
  }
  var me = this;

  // console.log(map); UNDEFINED

  this.directionsService.route({
    origin: {
      'placeId': this.originPlaceId
    },
    destination: {
      'placeId': this.destinationPlaceId
    },
    travelMode: this.travelMode
  }, function (response, status) {
    if (status === 'OK') {

      document.getElementById('time').innerText = 'Time to get to destination is ' + response.routes[0].legs[0].duration.text;
      document.getElementById('distance').innerText = 'Total distance to destination is ' + response.routes[0].legs[0].distance.text;

      me.directionsDisplay.setDirections(response);

      console.log(response);

    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
};

// function addMarker() {
//   removeMarker();
//   var place = autocomplete.getPlace();
//   newMarker = new google.maps.Marker({
//     position: newZealand,
//     map: map,
//   });
//   map.setZoom(12);
//   map.setCenter(newMarker.getPosition());
//   destSelectedStart.innerText = place.name;
// }

// function removeMarker() {
//   if (newMarker && newMarker.setMap) {
//     newMarker.setMap(null);
//   }
// }

// function addMarkerJourney() {
//   removeMarker();
//   var place = autocompleteEnd.getPlace();
//   newMarker = new google.maps.Marker({
//     position: place.geometry.location,
//     map: map,
//   });
//   map.setZoom(12);
//   map.setCenter(newMarker.getPosition());
//   destSelectedEnd.innerText = (' to ') + place.name;
// }

// autocompleteStart.addListener('place_changed', function () {
//   var place = autocompleteStart.getPlace();
//   var latitude = place.geometry.location.lat();
//   var longitude = place.geometry.location.lng();
//   console.log(latitude);
//   console.log(longitude);
//   console.log(place.address_components);
//   addMarker();
//   $("#destError1").hide();
//   $("#destValid1").show();
// });

// autocompleteEnd.addListener('place_changed', function () {
//   var place = autocompleteEnd.getPlace();
//   var latitude = place.geometry.location.lat();
//   var longitude = place.geometry.location.lng();
//   console.log(latitude);
//   console.log(longitude);
//   console.log(place.address_components);
//   addMarkerJourney();
//   $("#destError2").hide();
//   $("#destValid2").show();
// });

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
});

// CONFIRM POP-UP
$("#confirm-pop").iziModal({
  title: 'NZ Journey Planner Confirmation',
  headerColor: '#2b2f3a',
  padding: 15,
  radius: 0,
});

$(document).on('click', '.confirm-trigger', function (event) {
  event.preventDefault();
  $('#confirm-pop').iziModal('open');
});

// DATE PICKER
$(function () {
  var dateFormat = "mm/dd/yy",
    from = $("#startDate")
    .datepicker({
      minDate: 0,
      defaultDate: "0",
      changeMonth: true,
      onClose: function () {

        reCalculateDays();
      }
    })
    .on("change", function () {
      to.datepicker("option", "minDate", getDate(this));
    }),
    to = $("#endDate").datepicker({
      defaultDate: "+1d",
      changeMonth: true,
      onClose: function () {

        calculateDays();
      }
    })
    .on("change", function () {
      from.datepicker("option", "maxDate", getDate(this));
    });

  function getDate(element) {

    var date;
    try {
      date = $.datepicker.parseDate(dateFormat, element.value);
    } catch (error) {

      date = null;
    }
    return date;
    
  }
});

// var daysSelected = document.getElementById('#daysSelected');
// var daysText = document.getElementById('#daysText');

// CALCULATE DAYS
function calculateDays() {

  var startDate = $('#startDate').val();
  var endDate = $('#endDate').val();

  startDate = new Date(startDate);
  endDate = new Date(endDate);

  if (startDate < 0 || startDate == ("Invalid Date")) {

    console.log("Please enter start date first");

  } else {
    console.log('Start date');
    console.log(startDate);
    console.log('End date');
    console.log(endDate);
    var dif = endDate - startDate;
    dif = dif / 86400000;
    console.log('Number of Days');
    console.log(dif);
    daysText1.innerText = ('You have selected... ');
    daysSelected.innerText = dif;
    daysText2.innerText = (' days');

    if (dif > 15 || dif < 1) {

      // SHOW CUSTOM ERROR
      $("#dateError").show();

    } else if (dif < 15 || dif > 1) {

      // HIDE CUSTOM ERROR
      $("#dateError").hide();
    }
  }
}

// RE-CALCULATE DAYS
function reCalculateDays() {

  var startDate = $('#startDate').val();
  var endDate = $('#endDate').val();
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  if (endDate < 0 || endDate == ("Invalid Date")) {

    console.log("Nothing to re-calculate");

  } else {
    console.log('Start date');
    console.log(startDate);
    console.log('End date');
    console.log(endDate);
    var dif = endDate - startDate;
    dif = dif / 86400000;
    console.log('Number of Days');
    console.log(dif);
    daysText1.innerText = ('You have selected... ');
    daysSelected.innerText = dif;
    daysText2.innerText = (' days');

    if (dif > 15 || dif < 1) {

      // SHOW CUSTOM ERROR
      $("#dateError").show();

    } else if (dif < 15 || dif > 1) {

      // HIDE CUSTOM ERROR
      $("#dateError").hide();
    }
  }
}

// CREATE NUMBER LIST
var numList = [];
var numListValues = ["1", "2", "3", "4", "5", "6"];
var p = document.getElementById("peopleNum");
var peopleOption = p.options[p.selectedIndex].text;

// FUNCTION
function addNumber(newNum) {
  newNum = p.options[p.selectedIndex].value;
  numList.splice(0, 1);
  numList.push(newNum);
  console.log('Number of People');
  console.log(newNum);
  console.log(numList);
  peopleText1.innerText = ('You have selected... ');
  peopleSelected.innerText = newNum;
  peopleText2.innerText = (' people');

}

// PAGE ANIMATION
function show1from2() {
  $(function () {
    $("#section1").show();
  });
  $(function () {
    $("#section2").hide();
  });
}

function show2from3() {
  $(function () {
    $("#section2").show();
  });
  $(function () {
    $("#section3").hide();
  });
}

function show3from4() {
  $(function () {
    $("#section3").show();
  });
  $(function () {
    $("#section4").hide();
  });
}

function show4from5() {
  $(function () {
    $("#section4mapInput").show();
  });
  $(function () {
    $("#section5").hide();
  });
}

function show5from6() {
  $(function () {
    $("#section4").show();
    $("#section5").show();
  });
  $(function () {
    $("#section6").hide();
  });
}

function show1() {
  $(function () {
    $("#section1").show();
  });
  $(function () {
    $("#section2").hide();
    $("#section3").hide();
    $("#section4").hide();
    $("#section4mapInput").hide();
    $("#section5").hide();
    $("#section6").hide();
    $("#section7").hide();
  });
}

function show2() {
  $(function () {
    $("#section2").show();
  });
  $(function () {
    $("#section1").hide();
  });
}

function show3() {

if (daysSelected.textContent > 15 || daysSelected.textContent < 1) {

    console.log("No dates or wrong dates entered");

  } else {

    $(function () {
      $("#section3").show();
    });
    $(function () {
      $("#section2").hide();
    });
  }
}

function show4() {

  if (numList.length <= 0)

    console.log("No number entered");

  else {
    $(function () {
      $("#section4").show();
      $("#section4mapInput").show();
    });
    $(function () {
      $("#section3").hide();
    });
  }
}

function show5() {

  if (destSelectedStart.textContent.length < 1 || destSelectedEnd.textContent.length < 1) {

    console.log("No locations entered");

    // SHOW CUSTOM ERRORS
    $("#destError1").show();
    $("#destError2").show();

  } else {
    $(function () {
      $("#section5").show();
    });
    $(function () {
      $("#section4mapInput").hide();
    });
  }
}

function show6() {
  $(function () {
    $("#section6").show();
  });
  $(function () {
    $("#section4").hide();
    $("#section4mapInput").hide();
    $("#section5").hide();
  });
}

function show7() {
  $(function () {
    $("#section4").show();
    $("#section5").show();
  });
  $(function () {
    $("#section1").hide();
  });
}

// FORM VALIDATION
(function () {
  'use strict';
  window.addEventListener('load', function () {

    // FETCH FORMS
    var forms = document.getElementsByClassName('needs-validation');

    // PREVENT SUBMISSION
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
        event.preventDefault();
        event.stopPropagation();
      }, false);
    });
  }, false);
})();

// VEHICLES
var vehicles = [{
    "name": "2019 Kawasaki Ninja H2-R",
    "vehicle": "motorbike",
    "imageURL": "../img/vehicles.ninja.jpg",
    "persons": {
      "min": 1,
      "max": 1
    },
    "dailyRate": 109,
    "hireDays": {
      "min": 1,
      "max": 5
    },
    "mileage": 3.7
  },
  {
    "name": "2019 Audi S3 Sportback",
    "vehicle": "smallCar",
    "imageURL": "../img/vehicles.s4.jpg",
    "persons": {
      "min": 1,
      "max": 2
    },
    "dailyRate": 129,
    "hireDays": {
      "min": 1,
      "max": 10
    },
    "mileage": 8.5
  },
  {
    "name": "2019 BMW M5 Sedan",
    "vehicle": "largeCar",
    "imageURL": "../img/vehicles.m5.jpg",
    "persons": {
      "min": 1,
      "max": 5
    },
    "dailyRate": 144,
    "hireDays": {
      "min": 3,
      "max": 10
    },
    "mileage": 9.7
  },
  {
    "name": "2019 Mercedes GLS SUV",
    "vehicle": "suv",
    "imageURL": "../img/vehicles.gls.jpg",
    "persons": {
      "min": 2,
      "max": 6
    },
    "dailyRate": 200,
    "hireDays": {
      "min": 2,
      "max": 15
    },
    "mileage": 17
  }, {
    "fuelPrice": 2.06
  }
];