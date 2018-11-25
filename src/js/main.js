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

// // IMMUTABLE VARIABLES
// const transitionTime = 400;
// const scaleFactor = 2;

// // SHOW NEXT - HIDE CURRENT
// function showNextPage(idToShow, idToHide) {
//     var elToHide = $(idToHide);

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

// // SHOW PREVIOUS - HIDE CURRENT
// function showPreviousPage(idToShow, idToHide) {
//     var elToShow = $(idToShow);
//     var elToHide = $(idToHide);

//     elToHide.css({
//         "opacity": "0",
//         "transform": "scale(0)"
//     });

//     setTimeout(() => {
//         elToHide.css("display", "none");
//     }, transitionTime);

//     elToShow.css({
//         "transition": "0ms",
//         "transform": "scale(" + scaleFactor + ")"
//     });

//     setTimeout(() => {
//         elToShow.css("transition", transitionTime + "ms");
//         showFormPage(idToShow);
//     });
// }

// // SECTION ONE
// $("#sectionOneButton").click((e) => {
//     e.preventDefault();
//     showNextPage("#sectionTwo", "#sectionOne");
// });

// // SECTION TWO
// $("#sectionTwoButtonBack").click((e) => {
//     e.preventDefault();
//     showPreviousPage("#sectionOne", "#sectionTwo");
// });