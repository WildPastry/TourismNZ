/*jslint browser:true */

// DOCUMENT READY
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