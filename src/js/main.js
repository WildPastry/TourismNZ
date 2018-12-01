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

var allCitiesPointO = [
    ['Christchurch', -'43.513046', '172.4589949'],
    ['Dunedin', -'45.8726724', '170.4570794'],
    ['Hamilton', -'37.7751208', '175.1948842'],
    ['Wellington', -'41.284526', '174.7712372'],
    ['Auckland', -'36.8629409', '174.7253864']
];

// for( i = 0; i < markers.length; i++ ) {
// var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
// bounds.extend(position);
// marker = new google.maps.Marker({
// position: position,
// map: map
// });

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

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: newZealand,
        zoom: 8,
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
    // var startPoint = document.getElementById('startPoint');
    // new google.maps.places.Autocomplete(startPoint);
    var endPoint = document.getElementById('endPoint');
    new google.maps.places.Autocomplete(endPoint);

    console.log(map);

    // document.getElementById('startPoint').addEventListener('click', addMarker);

    // // CREATE NUMBER LIST
    // var numList = [];
    // var numListValues = ["1", "2", "3", "4", "5", "6"];
    // var p = document.getElementById("peopleNum");
    // var peopleOption = p.options[p.selectedIndex].text;

    // // FUNCTION
    // function addNumber(newNum) {
    //     newNum = p.options[p.selectedIndex].value;
    //     numList.splice(0, 1);
    //     numList.push(newNum);
    //     console.log('Number of People');
    //     console.log(newNum);
    //     peopleSelected.innerText = newNum;
    // }

    // document.getElementById('startPoint').addEventListener('click', addMarker);

    function addMarker() {
        var marker = new google.maps.Marker({
            position: newZealand,
            map: map,
            zoom: 14
        });
        map.setZoom(11);
        map.setCenter(marker.getPosition());
    }
}

// ADD START POINT
var startPointList = [];
var s = document.getElementById("startPoint");
// var startPointOption = s.options[s.selectedIndex].text;

// FUNCTION
function addStartPoint() {
    var newStartPoint = s.options[s.selectedIndex].value;
    startPointList.splice(0, 1);
    startPointList.push(newStartPoint);
    console.log('Start Point');
    console.log(newStartPoint);
    console.log(startPointList);
    destSelected.innerText = newStartPoint;
}

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

function calculateDays() {

    var startDate = $('#startDate').val();
    var endDate = $('#endDate').val();

    startDate = new Date(startDate);
    endDate = new Date(endDate);

    var dif = endDate - startDate;
    dif = dif / 86400000;
    console.log('Number of Days');
    console.log(dif);
    daysSelected.innerText = dif;

    if (daysSelected.textContent > 15 || daysSelected.textContent < 1) {

        // SHOW CUSTOM ERROR
        $("#dateError").show();

    } else if (daysSelected.textContent < 15 || daysSelected.textContent > 1) {

        // HIDE CUSTOM ERROR
        $("#dateError").hide();
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
    peopleSelected.innerText = newNum;
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
        $("#section4").show();
    });
    $(function () {
        $("#section5").hide();
    });
}

function show5from6() {
    $(function () {
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
        });
        $(function () {
            $("#section3").hide();
        });
    }
}

function show5() {

    if (destSelected.textContent.length > 12 || destSelected.textContent.length < 1) {

        console.log("No location entered");

    } else {

        $(function () {
            $("#section5").show();
        });
        $(function () {
            $("#section4").hide();
        });
    }
}

function show6() {
    $(function () {
        $("#section6").show();
    });
    $(function () {
        $("#section5").hide();
    });
}

function show7() {
    $(function () {
        $("#section7").show();
    });
    $(function () {
        $("#section1").hide();
    });
}

// BOOTSTRAP FORM VALIDATION
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
            }, false);
        });
    }, false);
})();