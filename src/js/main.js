/*jslint browser:true */
$(document).ready(() => {

    console.log('JS READY');
// LOADER
// $(window).on('load', function () {
//     $('#status').fadeOut();
//     $('#preloader').delay(350).fadeOut('slow');
//     $('body').delay(350).css({
//         'overflow': 'visible'
//     });
// })

// LOADER
$(document).ajaxStart(() => {
    $("#ajaxLoading").fadeIn(transitionTime);
    $("#mask").fadeIn(transitionTime);
}).ajaxStop(() => {
    $("#ajaxLoading").fadeOut(transitionTime);
    $("#mask").fadeOut(transitionTime);
});

});