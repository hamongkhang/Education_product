var PATH = {};
(function($) {
    /** handle open/close cart area */
    PATH.HandleCart = function() {
        const cartArea = $('.cart-area'),
            cartOverlay = $('.cart-overlay');
        $('.cart').on('click', function() {
            cartArea.removeClass('translate-x-full');
            cartArea.addClass('translate-x-0');
            cartOverlay.removeClass('-translate-x-full');
            cartOverlay.addClass('translate-x-0');
        });
        var handleClose = function() {
            cartArea.removeClass('translate-x-0');
            cartArea.addClass('translate-x-full');
            cartOverlay.removeClass('translate-x-0');
            cartOverlay.addClass('-translate-x-full');
        }
        $('.cart-close').on('click', function() {
            handleClose()
        })
        cartOverlay.on('click', function() {
            handleClose();
        })
    }

    /** handle open/close menu mobie */
    PATH.HandleNavMobile = function() {
        const responsive = $(window).width() < 1024,
            nav = $('.nav'),
            navOverlay = $('.nav-overlay'),
            navMenu = $('.nav-menu'),
            navLinkMobie = $('.nav-link-mobile');

        $('.nav-open').on('click', function() {
            nav.removeClass('translate-x-full');
            nav.addClass('translate-x-0');
            navOverlay.removeClass('-translate-x-full');
            navOverlay.addClass('translate-x-0');
            navLinkMobie.css('display', 'block');
            if (responsive) {
                navMenu.removeClass('text-white');
                navMenu.addClass('text-black');
            }
        });

        var handleClose = function() {
            nav.removeClass('translate-x-0');
            nav.addClass('translate-x-full');
            navOverlay.removeClass('translate-x-0');
            navOverlay.addClass('-translate-x-full');
            navLinkMobie.css('display', 'none');
        }

        $('.nav-close').on('click', function() {
            handleClose();
        })

        $('.nav-overlay').on('click', function() {
            handleClose();
        })
    }

    /** handle fixed header on scroll */
    PATH.HeaderFixed = function() {
        const varHeaderFix = $(window).scrollTop() >= 60,
            responsive = $(window).width() < 1024,
            navbarFixed = $('.header-fixed'),
            navMenu = $('.nav-menu'),
            navLink = $('.nav-menu .nav-link'),
            btnLogin = $('.btn-login'),
            btnOpenNav = $('.nav-open'),
            btnLoginStroke = $('.btn-stroke');
        if (varHeaderFix) {
            navbarFixed.addClass('bg-white text-black shadow-md');
            navLink.addClass('nav-link-fixed');
            btnLoginStroke.addClass('btn-stroke-fixed text-black');
            btnLogin.addClass('text-black');
            btnLogin.removeClass('text-white');
            if (!responsive) {
                navMenu.addClass('text-black');
                navMenu.removeClass('text-white');
            }

            btnOpenNav.removeClass('text-white');
            btnOpenNav.addClass('text-black');
        } else {
            navbarFixed.removeClass('bg-white text-black shadow-md');
            navLink.removeClass('nav-link-fixed');
            btnLoginStroke.removeClass('btn-stroke-fixed text-white');
            btnLogin.removeClass('text-black');
            btnLogin.addClass('text-white');
            if (responsive) {
                navMenu.addClass('text-black');
                navMenu.removeClass('text-white');
            } else {
                navMenu.addClass('text-white');
                navMenu.removeClass('text-black');
            }
            btnOpenNav.removeClass('text-black');
            btnOpenNav.addClass('text-white');
        }
    }

    PATH.NavLinkActive = function() {
        $('.nav-link').on('click', function() {
            console.log($('.nav-link'));
            $('.nav-link').removeClass('active');
            $(this).addClass('active');
        })
    }

    /* Window on scroll function */
    $(window).on("scroll", function() {
        PATH.HeaderFixed();
    });

    /* Window on load function */
    $(window).on('load', function() {
        PATH.HandleCart();
        PATH.HandleNavMobile();
        PATH.NavLinkActive();
    });
})(jQuery);