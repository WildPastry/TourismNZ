// COPYRIGHT MICHAEL PARKER 2018

// PLUG-INS USED
/* jquery-3.3.1.min.js"></script>
animsition.min.js"></script>
jquery-ui-1.12.1.min.js"></script>
bootstrap-4.1.3.min.js"></script>
popper-1.0.0.min.js"></script>
tooltipster-4.2.6.min.js"></script>
izimodal-1.6.0.min.js"></script> */

// LOAD MAP
// $(document).ready(function () {
//   initMap();
// });

// LOADER
$(window).on('load', function () {
  $('#preloader-icon').fadeOut('slow');
  $('#preloader').delay(350).fadeOut('slow');
  $('body').delay(350).css({
    'overflow': 'visible'
  });
});

// GLOBAL VARIABLES
var inlineIconsNums = document.getElementsByClassName('inlineIconsNums');
var inlineIconsDays = document.getElementsByClassName('inlineIconsDays');
var inlineIconsDest = document.getElementsByClassName('inlineIconsDest');

// MAP
var map;
// var newMarker;
var distanceList = [];
var journeyList = [];
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

// MAP FUNCTION
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
}

// LISTENER FOR AUTOCOMPLETE FILTER
AutocompleteDirectionsHandler.prototype.setupClickListener = function (id, mode) {
  var radioButton = document.getElementById(id);
  var me = this;
  radioButton.addEventListener('click', function () {
    me.travelMode = mode;
    me.route();
  });
};

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (autocomplete, mode) {

  var me = this;
  autocomplete.bindTo('bounds', this.map);
  autocomplete.addListener('place_changed', function () {
    var place = autocomplete.getPlace();
    var latitude = place.geometry.location.lat();
    var longitude = place.geometry.location.lng();

    if (!place.place_id) {
      window.alert("Please select an option from the dropdown list.");
      return;
    }
    if (mode === 'ORIG') {
      me.originPlaceId = place.place_id;
      destText1.innerHTML = ('You have selected... ');
      destSelectedStart.innerHTML = place.name + (' ');
      journeyList.splice(0, 1);
      journeyList.push(place.name);
      $("#destError1").hide();
      $("#destValid1").show();
    } else {
      me.destinationPlaceId = place.place_id;
      destSelectedEnd.innerHTML = (' to ') + place.name;
      journeyList.push(place.name);
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

      document.getElementById('time').innerHTML = '<span class="boldBlu">Travel time: </span>' + response.routes[0].legs[0].duration.text;
      document.getElementById('distance').innerHTML = '<span class="boldBlu">Distance: </span>' + response.routes[0].legs[0].distance.text;
      var distanceMin = response.routes[0].legs[0].distance;
      newDistance = (distanceMin.value / 1000);
      distanceList.splice(0, 1);
      distanceList.push(newDistance);
      $(".iconPglobe").show();
      $(inlineIconsDest).addClass("iconOpacity");
      me.directionsDisplay.setDirections(response);

    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
};

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
  headerColor: '#2178a6',
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
  headerColor: '#2178a6',
  padding: 15,
  radius: 0,
});

$(document).on('click', '.confirm-trigger', function (event) {
  event.preventDefault();
  $('#confirm-pop').iziModal('open');
});

// DATE PICKER
var dateList = [];
var daysList = [];
var startFeedBack = $('#startDate').val();
var endFeedBack = $('#endDate').val();

$(function () {
  var dateFormat = "mm/dd/yy",
    from = $("#startDate")
    .datepicker({
      minDate: 0,
      onClose: function () {
        var selected = $(this).val();
        if (selected == "") {
          $(".invalid-feedback-start").show();
        } else {
          $(".valid-feedback-start").show();
          $(".invalid-feedback-start").hide();
          reCalculateDays();
        }
      }
    })
    .on("change", function () {
      to.datepicker("option", "minDate", getDate(this));
    }),
    to = $("#endDate").datepicker({
      onClose: function () {
        var selected = $(this).val();
        if (selected == "") {
          $(".invalid-feedback-end").show();
        } else {
          $(".valid-feedback-end").show();
          $(".invalid-feedback-end").hide();
          reCalculateDays();
        }
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

// CALCULATE DAYS
function calculateDays() {

  var startDate = $('#startDate').val();
  var endDate = $('#endDate').val();

  startDate = new Date(startDate);
  endDate = new Date(endDate);

  if (startDate < 0 || startDate == ("Invalid Date")) {

  } else {
    dateList.splice(0, 1);
    dateList.push(startDate);
    dateList.splice(1, 1);
    dateList.push(endDate);
    var dif = endDate - startDate;
    dif = dif / 86400000;
    daysList.splice(0, 1);
    daysList.push(dif);
    if (dif == 1) {
      daysText1.innerHTML = ('You have selected... ');
      daysSelected.innerHTML = dif;
      daysText2.innerHTML = (' day');
      iconPdays1.innerHTML = '<p>' + dif + '</p>';
      iconPdays2.innerHTML = '<p>' + dif + '</p>';
      iconPdays3.innerHTML = '<p>' + dif + '</p>';
      iconPdays4.innerHTML = '<p>' + dif + '</p>';
      $(inlineIconsDays).addClass("iconOpacity");
    } else {
      daysText1.innerHTML = ('You have selected... ');
      daysSelected.innerHTML = dif;
      daysText2.innerHTML = (' days');
      iconPdays1.innerHTML = '<p>' + dif + '</p>';
      iconPdays2.innerHTML = '<p>' + dif + '</p>';
      iconPdays3.innerHTML = '<p>' + dif + '</p>';
      iconPdays4.innerHTML = '<p>' + dif + '</p>';
      $(inlineIconsDays).addClass("iconOpacity");
    }
    if (dif > 15 || dif < 1) {

      $("#dateError").show();

    } else if (dif < 15 || dif > 1) {

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

  } else {
    dateList.splice(0, 1);
    dateList.push(startDate);
    dateList.splice(1, 1);
    dateList.push(endDate);
    var dif = endDate - startDate;
    dif = dif / 86400000;
    daysList.splice(0, 1);
    daysList.push(dif);
    if (dif == 1) {
      daysText1.innerHTML = ('You have selected... ');
      daysSelected.innerHTML = dif;
      daysText2.innerHTML = (' day');
      iconPdays1.innerHTML = '<p>' + dif + '</p>';
      iconPdays2.innerHTML = '<p>' + dif + '</p>';
      iconPdays3.innerHTML = '<p>' + dif + '</p>';
      iconPdays4.innerHTML = '<p>' + dif + '</p>';
      iconPdays5.innerHTML = '<p>' + dif + '</p>';
      $(inlineIconsDays).addClass("iconOpacity");
    } else {
      daysText1.innerHTML = ('You have selected... ');
      daysSelected.innerHTML = dif;
      daysText2.innerHTML = (' days');
      iconPdays1.innerHTML = '<p>' + dif + '</p>';
      iconPdays2.innerHTML = '<p>' + dif + '</p>';
      iconPdays3.innerHTML = '<p>' + dif + '</p>';
      iconPdays4.innerHTML = '<p>' + dif + '</p>';
      iconPdays5.innerHTML = '<p>' + dif + '</p>';
      $(inlineIconsDays).addClass("iconOpacity");
    }

    if (dif > 15 || dif < 1) {

      $("#dateError").show();

    } else if (dif < 15 || dif > 1) {

      $("#dateError").hide();
    }
  }
}

// CREATE NUMBER LIST
var numList = [];
var peopleOption = document.getElementById("peopleNum");
var newNum = peopleOption;

var valueList = [];

// NUMBER SPINNER
(function () {

  window.inputNumber = function (el) {

    var min = el.attr('min') || false;
    var max = el.attr('max') || false;

    var els = {};

    els.dec = el.prev();
    els.inc = el.next();

    el.each(function () {
      init($(this));
    });

    function init(el) {

      els.dec.on('click', decrement);
      els.inc.on('click', increment);

      function decrement() {
        var value = el[0].value;
        value--;
        if (!min || value >= min) {
          el[0].value = value;
          valueList.splice(0, 1);
          valueList.push(value);
          addNumber();
          if (value == 0) {
            $(".invalid-feedback-num").show();
            $(".valid-feedback-num").hide();
          } else {
            $(".invalid-feedback-num").hide();
            $(".valid-feedback-num").show();
          }
        }
      }

      function increment() {
        var value = el[0].value;
        value++;
        if (!max || value <= max) {
          el[0].value = value++;
          var newSpinner = parseInt(value);
          newValue = (newSpinner - 1);
          valueList.splice(0, 1);
          valueList.push(newValue);
          addNumber();
          if (value == 0) {
            $(".invalid-feedback-num").show();
            $(".valid-feedback-num").hide();
          } else {
            $(".invalid-feedback-num").hide();
            $(".valid-feedback-num").show();
          }
        }
      }
    }
  };
})();

inputNumber($('.input-number'));

// ADD NUMBER FUNCTION
function addNumber() {
  var newValueList = parseInt(valueList[0]);
  newNum = newValueList;
  numList.splice(0, 1);
  numList.push(newNum);
  iconPnum1.innerHTML = '<p>' + newNum + '</p>';
  iconPnum2.innerHTML = '<p>' + newNum + '</p>';
  iconPnum3.innerHTML = '<p>' + newNum + '</p>';
  iconPnum4.innerHTML = '<p>' + newNum + '</p>';
  iconPnum5.innerHTML = '<p>' + newNum + '</p>';
  $(inlineIconsNums).addClass("iconOpacity");
  $(".valid-feedback-num").show();
  $(".invalid-feedback-num").hide();
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
    $(".section4").show();
  });
  $(function () {
    $("#section5").hide();
  });
}

function show5from6() {
  $(function () {
    $("#section4").show();
    $(".section4").hide();
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
    $(".section4").hide();
    $("#section5").hide();
    $("#section6").hide();
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
  if (numList.length == 0 || numList[0] == 0) {

    $(".invalid-feedback-num").show();
    $(".valid-feedback-num").hide();

  } else {

    $(".invalid-feedback-num").hide();
    $(".valid-feedback-num").show();

    $(function () {
      $("#section3").show();
    });
    $(function () {
      $("#section2").hide();
    });
  }
}

function show4() {

  if (daysSelected.textContent > 15 || daysSelected.textContent < 1 || daysSelected.textContent == 'NaN') {

  } else {
    $(function () {
      $(".section4").show();
      $("#section4").show();
    });
    $(function () {
      $("#section3").hide();
    });
  }
}

function show5() {

  if (destSelectedStart.textContent.length < 1 || destSelectedEnd.textContent.length < 1) {

    $("#destError1").show();
    $("#destError2").show();

  } else {
    filterVehicles();
    $(function () {
      $("#section4").show();
      $("#section5").show();
    });
    $(function () {
      $(".section4").hide();
    });
  }
}

function calculateData() {
  var daysCheck = daysList[0];
  var peopleCheck = numList[0];
  if (vehicleSelected.textContent.length < 1 || vehicleSelected.textContent.length < 1) {

    $("#vehicleError").show();

    if ((daysCheck >= 11 && daysCheck <= 15) && peopleCheck == 1) {
      $("#vehicleError2").show();
    }
    if (daysCheck == 1 && peopleCheck == 6) {
      $("#vehicleError2").show();
    }

  } else {
    getRentalPrice();
    var dateString1 = dateList[0];
    dateString1 = dateString1.toString();

    var dateString2 = dateList[1];
    dateString2 = dateString2.toString();

    datesFinal.innerHTML = '<span class="boldBlu">Dates: </span>' + dateString1.substring(0, 15) + '  -  ' + dateString2.substring(0, 15);
    journeyFinal.innerHTML = '<span class="boldBlu">From: </span>' + journeyList[0] + ' to ' + journeyList[1];
    vehicleFinal.innerHTML = '<span class="boldBlu">Vehicle: </span>' + vehicleList[0].name;
    vehicleFinalImage.innerHTML = '<img class="finalVehicleImage" src="img/vehicles/' + vehicleList[0].imageURL + '">';
    rentalFinal.innerHTML = '<span class="boldBlu">Rental cost: </span>$' + rentalPriceList[0];
    petrolFinal.innerHTML = '<span class="boldBlu">Fuel cost: </span>$' + petrolPriceList[0];
    perDayFinal.innerHTML = '<span class="boldBlu">Cost per day: </span>$' + perDayList[0];
    perPersonFinal.innerHTML = '<span class="boldBlu">Cost per person: </span>$' + perPersonList[0];
    priceFinal.innerHTML = '<span class="boldBluLrg">TOTAL: </span>' +
      '<span class="boldWhtLrg">$' + totalPriceList[0] + '</span>';

    $(function () {
      $("#section6").show();
    });
    $(function () {
      $("#section5").hide();
    });
  }
}

// FORM VALIDATION
(function () {
  'use strict';
  window.addEventListener('load', function () {

    var forms = document.getElementsByClassName('needs-validation');

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

// RESET DATA
function resetData() {
  location.reload();
  show1();
}

// VEHICLES
var vehicleList = [];
var allVehicles = [{
    "name": "2019 Kawasaki Ninja H2-R",
    "vehicle": "motorBike",
    "imageURL": "ninja.jpg",
    "persons": {
      "min": 1,
      "max": 1
    },
    "dailyRate": 109,
    "hireDays": {
      "min": 1,
      "max": 5
    },
    "mileage": 3.7,
    "fuelPerKM": 0.07622
  },

  {
    "name": "2019 Audi S3 Sportback",
    "vehicle": "smallCar",
    "imageURL": "s4.jpg",
    "persons": {
      "min": 1,
      "max": 2
    },
    "dailyRate": 129,
    "hireDays": {
      "min": 1,
      "max": 10
    },
    "mileage": 8.5,
    "fuelPerKM": 0.1751
  },
  {
    "name": "2019 BMW M5 Sedan",
    "vehicle": "largeCar",
    "imageURL": "m5.jpg",
    "persons": {
      "min": 1,
      "max": 5
    },
    "dailyRate": 144,
    "hireDays": {
      "min": 3,
      "max": 10
    },
    "mileage": 9.7,
    "fuelPerKM": 0.19982
  },
  {
    "name": "2019 Mercedes GLS SUV",
    "vehicle": "sportsUtilityVehicle",
    "imageURL": "gls.jpg",
    "persons": {
      "min": 2,
      "max": 6
    },
    "dailyRate": 200,
    "hireDays": {
      "min": 2,
      "max": 15
    },
    "mileage": 17,
    "fuelPerKM": 0.3502
  }, {
    "fuelPrice": 2.06
  }
];

// VEHICLE BUTTONS
function addMotorBike() {
  motorBikeName = allVehicles[0].name;
  motorBike = allVehicles[0];
  vehicleList.splice(0, 1);
  vehicleList.push(motorBike);
  vehicleText.innerHTML = ('You have selected... ');
  vehicleSelected.innerHTML = motorBikeName;
  $("#vehicleError").hide();
  $("#motorBikeCheck").show();
  $("#smallCarCheck").hide();
  $("#largeCarCheck").hide();
  $("#suvCheck").hide();
}

function addSmallCar() {
  smallCarName = allVehicles[1].name;
  smallCar = allVehicles[1];
  vehicleList.splice(0, 1);
  vehicleList.push(smallCar);
  vehicleText.innerHTML = ('You have selected... ');
  vehicleSelected.innerHTML = smallCarName;
  $("#vehicleError").hide();
  $("#motorBikeCheck").hide();
  $("#smallCarCheck").show();
  $("#largeCarCheck").hide();
  $("#suvCheck").hide();
}

function addLargeCar() {
  largeCarName = allVehicles[2].name;
  largeCar = allVehicles[2];
  vehicleList.splice(0, 1);
  vehicleList.push(largeCar);
  vehicleText.innerHTML = ('You have selected... ');
  vehicleSelected.innerHTML = largeCarName;
  $("#vehicleError").hide();
  $("#motorBikeCheck").hide();
  $("#smallCarCheck").hide();
  $("#largeCarCheck").show();
  $("#suvCheck").hide();
}

function addSportsUtilityVehicle() {
  sportsUtilityVehicleName = allVehicles[3].name;
  sportsUtilityVehicle = allVehicles[3];
  vehicleList.splice(0, 1);
  vehicleList.push(sportsUtilityVehicle);
  vehicleText.innerHTML = ('You have selected... ');
  vehicleSelected.innerHTML = sportsUtilityVehicleName;
  $("#vehicleError").hide();
  $("#motorBikeCheck").hide();
  $("#smallCarCheck").hide();
  $("#largeCarCheck").hide();
  $("#suvCheck").show();
}

// VEHICLE FILTER FUNCTIONS
function filterVehicles() {
  var daysCheck = daysList[0];
  var peopleCheck = numList[0];

  // $("#vehicleError").hide();
  $("#motorBikeError").show();
  $("#smallCarError").show();
  $("#largeCarError").show();
  $("#suvError").show();
  $("#motorBike").hide();
  $("#smallCar").hide();
  $("#largeCar").hide();
  $("#sportsUtilityVehicle").hide();

  if ((daysCheck >= 1 && daysCheck <= 5) && (peopleCheck == 1)) {
    $("#motorBike").show();
    $("#motorBikeError").hide();
  }
  if ((daysCheck >= 1 && daysCheck <= 10) && (peopleCheck <= 2)) {
    $("#smallCar").show();
    $("#smallCarError").hide();
  }
  if ((daysCheck >= 3 && daysCheck <= 10) && (peopleCheck >= 1 && peopleCheck <= 5)) {
    $("#largeCar").show();
    $("#largeCarError").hide();
  }
  if ((daysCheck >= 2 && daysCheck <= 15) && (peopleCheck >= 2 && peopleCheck <= 6)) {
    $("#sportsUtilityVehicle").show();
    $("#suvError").hide();
  }
}

// CALCULATION FUNCTIONS
rentalPriceList = [];
petrolPriceList = [];
totalPriceList = [];
perDayList = [];
perPersonList = [];

function getRentalPrice() {
  hirePerDay = vehicleList[0].dailyRate;
  numberOfDays = daysList[0];
  rentalPrice = hirePerDay * numberOfDays;
  var r = rentalPrice.toFixed(2);
  rentalPriceList.splice(0, 1);
  rentalPriceList.push(r);
  getPetrolPrice();
}

function getPetrolPrice() {
  var totalDistance = (distanceList[0]);
  fuelPricePerKM = vehicleList[0].fuelPerKM;
  petrolPrice = (totalDistance * fuelPricePerKM);
  finalPetrolPrice = petrolPrice.toFixed(2);
  petrolPriceList.splice(0, 1);
  petrolPriceList.push(finalPetrolPrice);
  getFinalPrice();
}

function getFinalPrice() {
  var newPetrol = parseFloat(petrolPriceList[0]);
  var newRental = parseFloat(rentalPriceList[0]);
  finalPrice = (newPetrol + newRental);
  var f = finalPrice.toFixed(2);
  totalPriceList.splice(0, 1);
  totalPriceList.push(f);
  getCostPerDay();
}

function getCostPerDay() {
  var newDayPrice = parseInt(daysList[0]);
  costPerDayPrice = (totalPriceList / newDayPrice);
  var dayFloat = costPerDayPrice.toFixed(2);
  perDayList.splice(0, 1);
  perDayList.push(dayFloat);
  getCostPerPerson();
}

function getCostPerPerson() {
  var newPersonPrice = parseInt(numList[0]);
  costPerPersonPrice = (totalPriceList / newPersonPrice);
  var personFloat = costPerPersonPrice.toFixed(2);
  perPersonList.splice(0, 1);
  perPersonList.push(personFloat);
}

// TOGGLE FOREGROUND FUNCTION
function toggleForeground() {
  $(function () {
    // $(".row-blue").toggle();
    // $(".row-blue-med").toggle();
    // $(".row-blue-vehicle").toggle();
    // $(".brand-title").toggle();
    $("#section1").hide();
    $("#section4").show();
    $(".section4").hide();
  });
}

// IMAGE HOVER FUNCTION
$(document).on("mouseenter", ".vehicle", function () {
  $(this).find(".vehicleWrapper").toggle();

});
$(document).on("mouseleave", ".vehicle", function () {
  $(this).find(".vehicleWrapper").toggle();
});

// TRANSITIONS
$(".animsition").animsition({
  inClass: 'fade-in',
  outClass: 'fade-out',
  inDuration: 1200,
  outDuration: 800,
});