/*jslint browser:true */

// DOCUMENT READY
$(document).ready(function() {
console.log('JS READY');

// IMMUTABLE VARIABLES
// const transitionTime = 400;

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

//  FULLPAGE
// $('#fullpage').fullpage({
//     verticalCentered: true,
//     anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage'],
//     sectionsColor: ['white', '#D66761', '#D66761', 'transparent', '#D66761'],
//     bgSize: ['cover', 'cover', 'cover', 'cover', 'cover'],
//     slidesNavigation: true,
//   });







// function showNextPage(idToShow, idToHide) {
//     let elToHide = $(idToHide);

//     elToHide.css({
//         "transform": "scale(" + scaleFactor + ")",
//         "opacity": "0"
//     });

//     setTimeout(() => {
//         elToHide.css({
//             "display": "none",
//             "transform": "scale(0)"
//         });
//     }, transitionTime);

//     showFormPage(idToShow);
// }

// $("#sectionOneButton").click((e) => {
//     e.preventDefault();
//     showNextPage("#sectionTwo", "#sectionOne");
//     toggleBackgroundImage("hide");
// });








// LOADER
// $(document).ajaxStart(() => {
//     $("#preLoading").fadeIn(transitionTime);
//     $("#mask").fadeIn(transitionTime);
// }).ajaxStop(() => {
//     $("#preLoading").fadeOut(transitionTime);
//     $("#mask").fadeOut(transitionTime);
// });

// LOADER
// $('body').jmspinner();
// $('body').jmspinner(false);

// $(document).ready(function(){
//     $(document).ajaxStart(function(){
//         $("#preloader").css("display", "block");
//     });
//     $(document).ajaxComplete(function(){
//         $("#preloader").css("display", "none");
//     });
// });

// function loadingAjax(div_id) {
//     var divIdHtml = $("#"+div_id).html();
//     $.ajax({
//          type: "POST",
//          url: "script.php",
//          data: "name=John&id=28",
//          beforeSend: function() {
//             $("#loading-image").show();
//          },
//          success: function(msg) {
//             $("#"+div_id).html(divIdHtml + msg);
//             $("#loading-image").hide();
//          }
//     });
// }

}); // DOCUMENT READY ENDS
