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
        zoom: 7,
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

    document.getElementById('startPoint').addEventListener('click', addMarker);

    function addMarker() {
        var marker = new google.maps.Marker({
            position: newZealand,
            map: map,
            zoom: 14
        });
        map.setZoom(10);
        map.setCenter(marker.getPosition());
    }
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

// PAGE SCROLLING
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
        $("#section3").hide();
        $("#section4").hide();
        $("#section5").hide();
        $("#section6").hide();
        $("#section7").hide();
    });
}

function show3() {
    $(function () {
        $("#section3").show();
    });
    $(function () {
        $("#section1").hide();
        $("#section2").hide();
        $("#section4").hide();
        $("#section5").hide();
        $("#section6").hide();
        $("#section7").hide();
    });
}

function show4() {
    $(function () {
        $("#section4").show();
    });
    $(function () {
        $("#section1").hide();
        $("#section2").hide();
        $("#section3").hide();
        $("#section5").hide();
        $("#section6").hide();
        $("#section7").hide();
    });
}

function show5() {
    $(function () {
        $("#section5").show();
    });
    $(function () {
        $("#section1").hide();
        $("#section2").hide();
        $("#section3").hide();
        $("#section4").hide();
        $("#section6").hide();
        $("#section7").hide();
    });
}

function show6() {
    $(function () {
        $("#section6").show();
    });
    $(function () {
        $("#section1").hide();
        $("#section2").hide();
        $("#section3").hide();
        $("#section4").hide();
        $("#section5").hide();
        $("#section7").hide();
    });
}

function show7() {
    $(function () {
        $("#section7").show();
    });
    $(function () {
        $("#section1").hide();
        $("#section2").hide();
        $("#section3").hide();
        $("#section4").hide();
        $("#section5").hide();
        $("#section6").hide();
    });
}

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

$('.needs-validation').submit(function (event) {
    if (event.stopPropagation) {
        event.stopPropagation();
        event.preventDefault();
    }
    var startDate = $('#startDate').val();
    var endDate = $('#endDate').val();

    if ((startDate.length > 0) && (endDate.length > 0)) {

        startDate = new Date(startDate);
        endDate = new Date(endDate);

        var dif = endDate - startDate;
        console.log(dif);
        dif = dif / 86400000;
        console.log(dif);
        daysSelected.innerText = dif;
        $("#dateErrorMessage").hide();

    } else {
        console.log('You must enter a start and end date');
    }
});

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

// FORM
window.addEventListener('load',
    function formValidation() {

        // FETCH FORMS
        var forms = document.getElementsByClassName('needs-validation');
        // PREVENT SUBMISSION
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false || daysSelected.textContent > 15 || daysSelected.textContent < 1) {
                    event.preventDefault();
                    event.stopPropagation();

                    // CUSTOM ERROR SHOW
                    $("#dateErrorMessage").show();
                }
                form.classList.add('was-validated');
            }, false);

        });
    }, false);

// NO REFRESH
$('form').submit(function () {
    return false;
});