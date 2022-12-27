/*
* Template Name: Kerge - Resume / CV / vCard Template
* Author: lmpixels
* Author URL: http://themeforest.net/user/lmpixels
* Version: 2.1
*/

(function ($) {
  "use strict";
  var locationLhr = { lat: 31.4826352, lng: 74.0541971 };

  // Portfolio subpage filters
  function portfolio_init() {
    var portfolio_grid = $('.portfolio-grid'),
      portfolio_filter = $('.portfolio-filters');

    if (portfolio_grid) {
      portfolio_grid.shuffle({
        speed: 450,
        itemSelector: 'figure'
      });

      portfolio_filter.on("click", ".filter", function (e) {
        portfolio_grid.shuffle('update');
        e.preventDefault();
        $('.portfolio-filters .filter').parent().removeClass('active');
        $(this).parent().addClass('active');
        portfolio_grid.shuffle('shuffle', $(this).attr('data-group'));
      });
    }
  }
  // /Portfolio subpage filters

  // Contact form validator
  $(function () {
    $('#contact_form').validator();

    $('#contact_form').on('submit', function (e) {
      if (!e.isDefaultPrevented()) {
        var url = "contact/contact.php";

        $.ajax({
          type: "POST",
          url: url,
          data: $(this).serialize(),
          success: function (data) {
            var messageAlert = 'alert-' + data.type;
            var messageText = data.message;

            var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
            if (messageAlert && messageText) {
              $('#contact_form').find('.messages').html(alertBox);
              $('#contact_form')[0].reset();
            }
          }
        });
        return false;
      }
    });
  });
  // /Contact form validator

  // Hide Mobile menu
  function mobileMenuHide() {
    var windowWidth = $(window).width(),
      siteHeader = $('#site_header');

    if (windowWidth < 992) {
      siteHeader.addClass('mobile-menu-hide');
      setTimeout(function () {
        siteHeader.addClass('animate');
      }, 500);
    } else {
      siteHeader.removeClass('animate');
    }
  }
  // /Hide Mobile menu

  //On Window load & Resize
  $(window)
    .on('load', function () { //Load
      // Animation on Page Loading
      $(".preloader").fadeOut(800, "linear");

      // initializing page transition.
      var ptPage = $('.subpages');
      if (ptPage[0]) {
        PageTransitions.init({
          menu: 'ul.site-main-menu',
        });
      }
    })
    .on('resize', function () { //Resize
      mobileMenuHide();
    });


  // On Document Load
  $(document).on('ready', function () {
    // Initialize Portfolio grid
    var $portfolio_container = $(".portfolio-grid");
    $portfolio_container.imagesLoaded(function () {
      portfolio_init(this);
    });

    // Blog grid init
    var $container = $(".blog-masonry");
    $container.imagesLoaded(function () {
      $container.masonry();
    });

    // Mobile menu
    $('.menu-toggle').on("click", function () {
      $('#site_header').addClass('animate');
      $('#site_header').toggleClass('mobile-menu-hide');
      $('#mobile_menu_icon').toggleClass('fa-times');
    });

    // Mobile menu hide on main menu item click
    $('.site-main-menu').on("click", "a", function (e) {
      mobileMenuHide();
    });
  });

})(jQuery);
