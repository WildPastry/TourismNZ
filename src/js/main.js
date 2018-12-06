/*jslint browser:true */
console.log('JS READY');

// LOAD MAP
$(document).ready(function() {
  initMap();
});

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

  console.log(map);
  console.log("MAP READY");

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
    console.log("Latitude and longitude");
    console.log(latitude);
    console.log(longitude);

    // console.log(map); UNDEFINED

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
      console.log("Start and end locations");
      console.log(journeyList);
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

      document.getElementById('time').innerHTML = 'Time to get to destination is ' + response.routes[0].legs[0].duration.text;
      document.getElementById('distance').innerHTML = 'Total distance to destination is ' + response.routes[0].legs[0].distance.text;

      var distanceMin = response.routes[0].legs[0].distance;

      newDistance = (distanceMin.value / 1000);
      console.log("Distance in kilometres");
      console.log(newDistance);

      distanceList.splice(0, 1);
      distanceList.push(newDistance);

      console.log("Start and end locations as waypoints");
      me.directionsDisplay.setDirections(response);
      console.log(response);

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
var dateList = [];
var daysList = [];

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
      defaultDate: "0",
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
    dateList.splice(0, 1);
    dateList.push(startDate);
    console.log('End date');
    console.log(endDate);
    dateList.splice(1, 1);
    dateList.push(endDate);
    console.log(dateList);
    var dif = endDate - startDate;
    dif = dif / 86400000;
    console.log('Number of Days');
    console.log(dif);
    daysList.splice(0, 1);
    daysList.push(dif);
    daysText1.innerHTML = ('You have selected... ');
    daysSelected.innerHTML = dif;
    daysText2.innerHTML = (' days');

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
    dateList.splice(0, 1);
    dateList.push(startDate);
    console.log('End date');
    console.log(endDate);
    dateList.splice(1, 1);
    dateList.push(endDate);
    console.log(dateList);
    var dif = endDate - startDate;
    dif = dif / 86400000;
    console.log('Number of Days');
    console.log(dif);
    daysList.splice(0, 1);
    daysList.push(dif);
    daysText1.innerHTML = ('You have selected... ');
    daysSelected.innerHTML = dif;
    daysText2.innerHTML = (' days');

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
  peopleText1.innerHTML = ('You have selected... ');
  peopleSelected.innerHTML = newNum;
  peopleText2.innerHTML = (' people');
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
    filterVehicles();
    $(function () {
      $("#section5").show();
    });
    $(function () {
      $("#section4mapInput").hide();
    });
  }
}

function calculateData() {
  if (vehicleSelected.textContent.length < 1 || vehicleSelected.textContent.length < 1) {

    console.log("No vehicle selected");

    // SHOW CUSTOM ERROR
    $("#vehicleError").show();

  } else {
    getRentalPrice();
    var dateString1 = dateList[0];
    dateString1 = dateString1.toString();

    var dateString2 = dateList[0];
    dateString2 = dateString2.toString();

    datesFinal.innerHTML = '<span class="boldBlu">Dates travelling: </span>' + dateString1.substring(0, 15) + ' - ' + dateString2.substring(0, 15);
    daysFinal.innerHTML = '<span class="boldBlu">Total days: </span>' + daysList[0];
    peopleFinal.innerHTML = '<span class="boldBlu"> Total people: </span>' + numList[0];
    journeyFinal.innerHTML = '<span class="boldBlu">Your journey: </span>' + journeyList[0] + ' to ' + journeyList[1];
    vehicleFinal.innerHTML = '<span class="boldBlu">Your vehicle: </span>' + vehicleList[0].name;
    rentalFinal.innerHTML = '<span class="boldBlu">Rental cost: </span>$' + rentalPriceList[0];
    petrolFinal.innerHTML = '<span class="boldBlu">Estimated fuel cost: </span>$' + petrolPriceList[0];
    perDayFinal.innerHTML = '<span class="boldBlu">Cost per day: </span>$' + perDayList[0];
    perPersonFinal.innerHTML = '<span class="boldBlu">Cost per person: </span>$' + perPersonList[0];
    priceFinal.innerHTML = '<span class="boldBlu">Total cost: </span>$' + totalPriceList[0];

    $(function () {
      $("#section6").show();
    });
    $(function () {
      $("#section4").hide();
      $("#section4mapInput").hide();
      $("#section5").hide();
    });
  }
}

function show7() {
  $(function () {
    $("#section4").show();
    $("#section4mapInput").hide();
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
    "mileage": 3.7,
    "fuelPerKM": 0.07622
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
    "mileage": 8.5,
    "fuelPerKM": 0.1751
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
    "mileage": 9.7,
    "fuelPerKM": 0.19982
  },
  {
    "name": "2019 Mercedes GLS SUV",
    "vehicle": "sportsUtilityVehicle",
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
    "mileage": 17,
    "fuelPerKM": 0.3502
  }, {
    "fuelPrice": 2.06
  }
];

// VEHICLE BUTTONS
function addMotorBike(motorBike) {
  motorBikeName = allVehicles[0].name;
  motorBike = allVehicles[0];
  vehicleList.splice(0, 1);
  vehicleList.push(motorBike);
  console.log('Motorbike selected');
  console.log(motorBike);
  vehicleText.innerHTML = ('You have selected... ');
  vehicleSelected.innerHTML = motorBikeName;
  $("#vehicleError").hide();
}

function addSmallCar(smallCar) {
  smallCarName = allVehicles[1].name;
  smallCar = allVehicles[1];
  vehicleList.splice(0, 1);
  vehicleList.push(smallCar);
  console.log('Small car selected');
  console.log(smallCar);
  vehicleText.innerHTML = ('You have selected... ');
  vehicleSelected.innerHTML = smallCarName;
  $("#vehicleError").hide();
}

function addLargeCar(largeCar) {
  largeCarName = allVehicles[2].name;
  largeCar = allVehicles[2];
  vehicleList.splice(0, 1);
  vehicleList.push(largeCar);
  console.log('Large car selected');
  console.log(largeCar);
  vehicleText.innerHTML = ('You have selected... ');
  vehicleSelected.innerHTML = largeCarName;
  $("#vehicleError").hide();
}

function addSportsUtilityVehicle(sportsUtilityVehicle) {
  sportsUtilityVehicleName = allVehicles[3].name;
  sportsUtilityVehicle = allVehicles[3];
  vehicleList.splice(0, 1);
  vehicleList.push(sportsUtilityVehicle);
  console.log('SUV selected');
  console.log(sportsUtilityVehicle);
  vehicleText.innerHTML = ('You have selected... ');
  vehicleSelected.innerHTML = sportsUtilityVehicleName;
  $("#vehicleError").hide();
}

// VEHICLE FILTER FUNCTIONS
function filterVehicles() {
  var daysCheck = daysList[0];
  var peopleCheck = numList[0];

  $("#motorBike").hide();
  $("#smallCar").hide();
  $("#largeCar").hide();
  $("#sportsUtilityVehicle").hide();

  if ((daysCheck >= 1 && daysCheck <= 5) && (peopleCheck == 1)) {
    $("#motorBike").show();
  }
  if ((daysCheck >= 1 && daysCheck <= 10) && (peopleCheck <= 2)) {
    $("#smallCar").show();
  }
  if ((daysCheck >= 3 && daysCheck <= 10) && (peopleCheck >= 1 && peopleCheck <=5)) {
    $("#largeCar").show();
  }
  if ((daysCheck >= 2 && daysCheck <= 15) && (peopleCheck >= 2 && peopleCheck <=6)) {
    $("#sportsUtilityVehicle").show();
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
  console.log('Rental price');
  console.log(rentalPrice);
  getPetrolPrice();
}

function getPetrolPrice() {
  var totalDistance = (distanceList[0]);
  console.log('Total distance');
  console.log(totalDistance);
  fuelPricePerKM = vehicleList[0].fuelPerKM;
  console.log('Fuel price per KM');
  console.log(fuelPricePerKM);
  petrolPrice = (totalDistance * fuelPricePerKM);
  finalPetrolPrice = petrolPrice.toFixed(2);
  petrolPriceList.splice(0, 1);
  petrolPriceList.push(finalPetrolPrice);
  console.log('Fuel price');
  console.log(finalPetrolPrice);
  getFinalPrice();
}

function getFinalPrice() {
  var newPetrol = parseFloat(petrolPriceList[0]);
  var newRental = parseFloat(rentalPriceList[0]);
  finalPrice = (newPetrol + newRental);
  var f = finalPrice.toFixed(2);
  totalPriceList.splice(0, 1);
  totalPriceList.push(f);
  console.log('Final price');
  console.log(f);
  getCostPerDay();
}

function getCostPerDay() {
  var newDayPrice = parseInt(daysList[0]);
  costPerDayPrice = (totalPriceList / newDayPrice);
  var dayFloat = costPerDayPrice.toFixed(2);
  perDayList.splice(0, 1);
  perDayList.push(dayFloat);
  console.log('Cost per day');
  console.log(dayFloat);
  getCostPerPerson();
}

function getCostPerPerson() {
  var newPersonPrice = parseInt(numList[0]);
  costPerPersonPrice = (totalPriceList / newPersonPrice);
  var personFloat = costPerPersonPrice.toFixed(2);
  perPersonList.splice(0, 1);
  perPersonList.push(personFloat);
  console.log('Cost per person');
  console.log(personFloat);
}