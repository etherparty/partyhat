$(function() {
    "use strict";


    /* ==========================================================================
   countdown
   ========================================================================== */

    $('.countdown').downCount({
        date: '12/15/2014 12:00:00' // m/d/y
    });
		


    /* ==========================================================================
   Preload
   ========================================================================== */

    $(window).load(function() {

        $("#status").fadeOut();

        $("#preloader").delay(1000).fadeOut("slow");
    })		
		


    /* ==========================================================================
   onscroll animation
   ========================================================================== */

    if ($(window).width() > 992) {

        $(window).fadeThis({
            'reverse': false
        });
    };


    /* ==========================================================================
       Number animation
       ========================================================================== */




    $('.counter').waypoint(function() {

        var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');

        $('.total-number-1').animateNumber({
            number: 500000, //change value here
            numberStep: comma_separator_number_step
        }, 2000);

        $('.total-number-2').animateNumber({
            number: 80000, //change value here
            numberStep: comma_separator_number_step
        }, 2000);

        $('.total-number-3').animateNumber({
            number: 30000, //change value here
            numberStep: comma_separator_number_step
        }, 2000);

        $('.total-number-4').animateNumber({
            number: 10000, //change value here
            numberStep: comma_separator_number_step
        }, 2000);



    }, {
        offset: '80%'

    });


    /* ==========================================================================
     sub form
     ========================================================================== */

    var $form = $('#mc-form');

    $('#mc-subscribe').on('click', function(event) {
        if (event) event.preventDefault();
        register($form);
    });

    function register($form) {
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize(),
            cache: false,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            error: function(err) {
                $('#mc-notification').hide().html('<span class="alert">Could not connect to server. Please try again later.</span>').fadeIn("slow");

            },
            success: function(data) {

                if (data.result != "success") {
                    var message = data.msg.substring(4);
                    $('#mc-notification').hide().html('<span class="alert"><i class="fa fa-info-circle"></i>' + message + '</span>').fadeIn("slow");
                    $('#mc-form input[type="email"]').removeClass('success-input').addClass('error-input');
                } else {
                    var message = data.msg.substring(4);
                    $('#mc-notification').hide().html('<span class="success"><i class="fa fa-paper-plane"></i>' + 'Awesome! We sent you a confirmation email.' + '</span>').fadeIn("slow");
                    $('#mc-form input[type="email"]').removeClass('error-input').addClass('success-input');
                }
            }
        });
    }

    /* ==========================================================================
   Contact Form
   ========================================================================== */


    $('#contact-form').validate({
        highlight: function(element, errorClass) {
            $(element).fadeOut(function() {
                $(element).fadeIn();
            });
        },
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            name: "<i class='fa fa-info-circle'></i>Please specify your name",
            email: {
                required: "<i class='fa fa-info-circle'></i>We need your email address to contact you",
                email: "<i class='fa fa-info-circle'></i>Please enter a valid email address."
            },
            message: "<i class='fa fa-info-circle'></i>Please enter your message"
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                type: "POST",
                data: $(form).serialize(),
                url: "php/process.php",
                success: function() {

                    $('.success-sf').slideDown();
                },
                error: function() {
                    $('.error-sf').slideDown();
                }
            });
        }
    });


    /* ==========================================================================
   ScrollTop Button
   ========================================================================== */


    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.scroll-top a').fadeIn(200);
        } else {
            $('.scroll-top a').fadeOut(200);
        }
    });


    $('.scroll-top a').click(function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });


});