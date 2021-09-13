var PATH = {};
(function($) {

    /** handle open/close cart area */
    PATH.CartOpen = function() {
        $('.cart').on('click', function() {
            $('.cart-area').removeClass('translate-x-full');
            $('.cart-area').addClass('translate-x-0');
            $('.cart-overlay').removeClass('-translate-x-full');
            $('.cart-overlay').addClass('translate-x-0');
        });
    }

    PATH.CloseCart = function() {
        var handleClose = function() {
            $('.cart-area').removeClass('translate-x-0');
            $('.cart-area').addClass('translate-x-full');
            $('.cart-overlay').removeClass('translate-x-0');
            $('.cart-overlay').addClass('-translate-x-full');
        }
        $('.cart-close').on('click', function() {
            handleClose()
        })
        $('.cart-overlay').on('click', function() {
            handleClose();
        })
    }

    /** handle fixed header on scroll */
    PATH.HeaderFixed = function() {
        var varHeaderFix = $(window).scrollTop() >= 60,
            $navbarFixed = $('.header-fixed'),
            $navMenu = $('.header .nav-menu'),
            $navLink = $('.nav-menu .nav-link'),
            $btnLogin = $('.btn-login'),
            $btnLoginStroke = $('.btn-stroke');
        if (varHeaderFix) {
            $navbarFixed.addClass('bg-white text-black shadow-md');
            $navLink.addClass('nav-link-fixed');
            $btnLoginStroke.addClass('btn-stroke-fixed text-black');
            $btnLogin.addClass('text-black');
            $btnLogin.removeClass('text-white');
            $navMenu.addClass('text-black');
            $navMenu.removeClass('text-white');
        } else {
            $navbarFixed.removeClass('bg-white text-black shadow-md');
            $navLink.removeClass('nav-link-fixed');
            $btnLoginStroke.removeClass('btn-stroke-fixed text-white');
            $btnLogin.removeClass('text-black');
            $btnLogin.addClass('text-white');
            $navMenu.addClass('text-white');
            $navMenu.removeClass('text-black');
        }
    }

    /* Window on scroll function */
    $(window).on("scroll", function() {
        PATH.HeaderFixed();
    });

    /* Window on load function */
    $(window).on('load', function() {
        PATH.CartOpen();
        PATH.CloseCart();
    });
})(jQuery);