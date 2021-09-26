var PATH = {};
(function($) {
    "use strict"
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
    PATH.HandleNav = function() {
        const responsive = $(window).width() < 1024,
            nav = $('.nav'),
            navOverlay = $('.nav-overlay'),
            navMenu = $('.nav-menu'),
            navLink = $('.nav-menu .nav-link'),
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
                navLink.addClass('nav-link-fixed');
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

        var handleRemoveActive = function() {
            $('.nav-link').removeClass('active');
            handleClose();
        }
        $('.nav-link').on('click', function() {
            handleRemoveActive();
            $(this).addClass('active');
        })

        $('.btn-login').on('click', function() {
            handleRemoveActive();
        })

        $('.btn-register').on('click', function() {
            handleRemoveActive();
        })
    }

    /** handle open/close search box */
    PATH.HandleSearchBox = function() {
        const searchOpen = $('.search-open'),
            searchClose = $('.search-close'),
            searchOverlay = $('.search-overlay'),
            searchArea = $('.search-area');

        var handleClose = function() {
            searchArea.removeClass('translate-y-0');
            searchArea.addClass('-translate-y-full');
            searchOverlay.removeClass('translate-y-0');
            searchOverlay.addClass('translate-y-full');
        }

        $('.search-open').on('click', function() {
            console.log('ok');
            searchArea.removeClass('-translate-y-full');
            searchArea.addClass('translate-y-0');
            searchOverlay.removeClass('translate-y-full');
            searchOverlay.addClass('translate-y-0');
        })

        searchClose.on('click', function() {
            handleClose();
        })

        searchOverlay.on('click', function() {
            handleClose();
        })
    }

    /** handle open/close chat box */
    PATH.HandleChatbox = function() {
        const chatOpen = $('.chat-open'),
            chatClose = $('.chat-close'),
            chatbox = $('.chatbox');

        chatOpen.on('click', function() {
            chatbox.removeClass('w-0 h-0');
            chatbox.addClass('w-80 h-508');
            chatOpen.addClass('hidden');
        });

        chatClose.on('click', function() {
            chatbox.removeClass('w-80 h-508');
            chatbox.addClass('w-0 h-0');
            chatOpen.removeClass('hidden');
        })
    }

    /** handle fixed header on scroll */
    PATH.HeaderFixed = function() {
        const varHeaderFix = $(window).scrollTop() >= 60,
            responsive = $(window).width() < 1024,
            navbarFixed = $('.header-fixed'),
            navMenu = $('.nav-menu'),
            navLink = $('.nav-menu .nav-link'),
            btnOpenNav = $('.nav-open');
        if (varHeaderFix) {
            navbarFixed.addClass('bg-white text-blue-600 shadow-md');
            navLink.addClass('nav-link-fixed');
            if (!responsive) {
                navMenu.addClass('text-blue-600');
                navMenu.removeClass('text-white');
            }
            btnOpenNav.removeClass('text-white');
            btnOpenNav.addClass('text-black');
        } else {
            navbarFixed.removeClass('bg-white text-blue-600 shadow-md');
            if (responsive) {
                navMenu.addClass('text-blue-600');
                navMenu.removeClass('text-white');
            } else {
                navLink.removeClass('nav-link-fixed');
                navMenu.removeClass('text-blue-600');
                navMenu.addClass('text-white');
            }
            btnOpenNav.removeClass('text-black');
            btnOpenNav.addClass('text-white');
        }
    }

    /* Window on scroll function */
    $(window).on("scroll", function() {
        PATH.HeaderFixed();
    });

    /* Window on load function */
    $(window).on('load', function() {
        PATH.HandleCart();
        PATH.HandleNav();
        PATH.HandleSearchBox();
        PATH.HandleChatbox();
    });
})(jQuery);