(function($){

    "use strict";

    // Work filter

    function FilterWork() {
        if ($('.portfolio').length) {
            
            var $container = $('#work-wrap').imagesLoaded( function() {
                $container.isotope({
                    transitionDuration: '0.6s',
                    hiddenStyle: {
                        opacity: 0,
                        transform: 'scale(0.1)'
                    },
                    visibleStyle: {
                        opacity: 1,
                        transform: 'scale(1)'
                    }
                });
            });

            $('.portfolio #filters a').click(function(){
                $('.select-filter').removeClass('select-filter');
                $(this).parent('li').addClass('select-filter');
                var selector = $(this).attr('data-filter');
                $('#work-wrap').isotope({ filter: selector });
                return false;
            });

        }
    }


    //Equal height
    function EqualHeight (element) {
        var w = $( window ).width();
        if($(element).length && w >= 992) {
            var max_height = 0;
            $.each($(element), function() {
                var current_height = parseInt($(this).outerHeight());
                if ( current_height > max_height)  {
                    max_height = current_height;
                }
            });
            $.each($(element), function() {
               $(this).css('height', max_height + 'px');
            });
        } else {
             $(element).css('height', '');
        }
    }



    //Google map

    function GoogleMap() {
        if ($('#map').length) {
            // Option map
            var $map = $('#map'),
                mapZoom = $map.data('map-zoom'),
                lat = $map.data('map-latlng').split(',')[0],
                lng = $map.data('map-latlng').split(',')[1],
                marker = $map.data('map-marker'),
                width = parseInt($map.data('map-marker-size').split('*')[0]),
                height = parseInt($map.data('map-marker-size').split('*')[1]),
                title = $map.find('h4').text(),
                content = $map.find('p').text(),
                grayscale = [
                    {featureType: 'all',  stylers: [{saturation: -100},{gamma: 0.50}]}
                ],
                blue = [
                    {featureType: 'all',  stylers: [{hue: '#0000b0'},{invert_lightness: 'true'},{saturation: -30}]}
                ],
                dark = [
                    {featureType: 'all',  stylers: [{ hue: '#ff1a00' },{ invert_lightness: true },{ saturation: -100  },{ lightness: 33 },{ gamma: 0.5 }]}
                ],
                pink = [
                    {"stylers": [{ "hue": "#ff61a6" },{ "visibility": "on" },{ "invert_lightness": true },{ "saturation": 40 },{ "lightness": 10 }]}
                ],
                light = [
                    {"featureType": "water","elementType": "all","stylers": [{"hue": "#e9ebed"},{"saturation": -78},{"lightness": 67},{"visibility": "simplified"}]
                    },{"featureType": "landscape","elementType": "all","stylers": [{"hue": "#ffffff"},{"saturation": -100},{"lightness": 100},{"visibility": "simplified"}]
                    },{"featureType": "road","elementType": "geometry","stylers": [{"hue": "#bbc0c4"},{"saturation": -93},{"lightness": 31},{"visibility": "simplified"}]
                    },{"featureType": "poi","elementType": "all","stylers": [{"hue": "#ffffff"},{"saturation": -100},{"lightness": 100},{"visibility": "off"}]
                    },{"featureType": "road.local","elementType": "geometry","stylers": [{"hue": "#e9ebed"},{"saturation": -90},{"lightness": -8},{"visibility": "simplified"}]
                    },{"featureType": "transit","elementType": "all","stylers": [{"hue": "#e9ebed"},{"saturation": 10},{"lightness": 69},{"visibility": "on"}]
                    },{"featureType": "administrative.locality","elementType": "all","stylers": [ {"hue": "#2c2e33"},{"saturation": 7},{"lightness": 19},{"visibility": "on"}]
                    },{"featureType": "road","elementType": "labels","stylers": [{"hue": "#bbc0c4"},{"saturation": -93},{"lightness": 31},{"visibility": "on"}]
                    },{"featureType": "road.arterial","elementType": "labels","stylers": [{"hue": "#bbc0c4"},{"saturation": -93},{"lightness": -2},{"visibility": "simplified"}]}
                ],
                blueessence = [
                    {featureType: "landscape.natural",elementType: "geometry.fill",stylers: [{ "visibility": "on" },{ "color": "#e0efef" }]
                    },{featureType: "poi",elementType: "geometry.fill",stylers: [{ "visibility": "on" },{ "hue": "#1900ff" },{ "color": "#c0e8e8" }]
                    },{featureType: "landscape.man_made",elementType: "geometry.fill"
                    },{featureType: "road",elementType: "geometry",stylers: [{ lightness: 100 },{ visibility: "simplified" }]
                    },{featureType: "road",elementType: "labels",stylers: [{ visibility: "off" }]
                    },{featureType: 'water',stylers: [{ color: '#7dcdcd' }]
                    },{featureType: 'transit.line',elementType: 'geometry',stylers: [{ visibility: 'on' },{ lightness: 700 }]}
                ],
                bentley = [
                    {featureType: "landscape",stylers: [{hue: "#F1FF00"},{saturation: -27.4},{lightness: 9.4},{gamma: 1}]
                    },{featureType: "road.highway",stylers: [{hue: "#0099FF"},{saturation: -20},{lightness: 36.4},{gamma: 1}]
                    },{featureType: "road.arterial",stylers: [{hue: "#00FF4F"},{saturation: 0},{lightness: 0},{gamma: 1}]
                    },{featureType: "road.local",stylers: [{hue: "#FFB300"},{saturation: -38},{lightness: 11.2},{gamma: 1}]
                    },{featureType: "water",stylers: [{hue: "#00B6FF"},{saturation: 4.2},{lightness: -63.4},{gamma: 1}]
                    },{featureType: "poi",stylers: [{hue: "#9FFF00"},{saturation: 0},{lightness: 0},{gamma: 1}]}
                ],
                retro = [
                    {featureType:"administrative",stylers:[{visibility:"off"}]
                    },{featureType:"poi",stylers:[{visibility:"simplified"}]},{featureType:"road",elementType:"labels",stylers:[{visibility:"simplified"}]
                    },{featureType:"water",stylers:[{visibility:"simplified"}]},{featureType:"transit",stylers:[{visibility:"simplified"}]},{featureType:"landscape",stylers:[{visibility:"simplified"}]
                    },{featureType:"road.highway",stylers:[{visibility:"off"}]},{featureType:"road.local",stylers:[{visibility:"on"}]
                    },{featureType:"road.highway",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"water",stylers:[{color:"#84afa3"},{lightness:52}]},{stylers:[{saturation:-17},{gamma:0.36}]
                    },{featureType:"transit.line",elementType:"geometry",stylers:[{color:"#3f518c"}]}
                ],
                cobalt = [
                    {featureType: "all",elementType: "all",stylers: [{invert_lightness: true},{saturation: 10},{lightness: 30},{gamma: 0.5},{hue: "#435158"}]}
                ],
                brownie = [
                    {"stylers": [{ "hue": "#ff8800" },{ "gamma": 0.4 }]}
                ];
            var mapTheme;
            switch($map.data('snazzy-map-theme')){
                case 'grayscale' : {
                    mapTheme = grayscale;
                } break;
                case 'blue' : {
                    mapTheme = blue;
                } break;
                case 'dark' : {
                    mapTheme = dark;
                } break;
                case 'pink' : {
                    mapTheme = pink;
                } break;
                case 'light' : {
                    mapTheme = light;
                } break;
                case 'blue-essence' : {
                    mapTheme = blueessence;
                } break;
                case 'bentley' : {
                    mapTheme = bentley;
                } break;
                case 'retro' : {
                    mapTheme = retro;
                } break;
                case 'cobalt' : {
                    mapTheme = cobalt;
                } break;
                case 'brownie' : {
                    mapTheme = brownie;
                } break;
                default : {
                    mapTheme = grayscale;
                }
            }

            // Map
            var MY_MAPTYPE_ID = 'custom_style';
            var featureOpts = mapTheme;
            var latlng = new google.maps.LatLng(lat, lng);
            var settings = {
                zoom: mapZoom,
                center: latlng,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
                },
                mapTypeControl: false,
                mapTypeId: MY_MAPTYPE_ID,
                scrollwheel: false,
                draggable: true,
            };

            var map = new google.maps.Map(document.getElementById("map"), settings);
            var styledMapOptions = {
                name: 'Custom Style'
            };
            var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

            map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

            google.maps.event.addDomListener(window, "resize", function () {
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
            });
            var contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h3 id="firstHeading" class="firstHeading">' + title + '</h3>' +
                '<div id="bodyContent">' +
                '<p>' + content + '</p>' +
                '</div>' +
                '</div>';
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            var companyImage = new google.maps.MarkerImage(marker,
                new google.maps.Size(width, height),
                new google.maps.Point(0, 0)
            );
            var companyPos = new google.maps.LatLng(lat, lng);
            var companyMarker = new google.maps.Marker({
                position: companyPos,
                map: map,
                icon: companyImage,
                title: title,
                zIndex: 3
            });
            google.maps.event.addListener(companyMarker, 'click', function () {
                infowindow.open(map, companyMarker);
            });
        }
    }

    $(document).ready(function () {

        
        
        //=============== IF IE 8 ===================
		var rex = new RegExp("MSIE 8.0");
		var trueIE = rex.test(navigator.userAgent);
		
		if(trueIE) {
			$('.menu-nav').find('li').last().addClass('menu-item-last');
		}

        $('.toggle-button').on('click', function(event) {
            event.preventDefault();
           $('.filters > ul').toggleClass('show-filters'); 
        });

        if ($(".slider").length) {
            $(".slider").owlCarousel({
                navigation: true,
                pagination: false,
                singleItem: true,
                navigationText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right "></i>']
            });
        }

        if ($(".blog-slide").length) {
            $(".blog-slide").owlCarousel({
                navigation: true,
                pagination: false,
                singleItem: true,
                navigationText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right "></i>']
            });
        }

         if ($(".portfolio-slide").length) {
            $(".portfolio-slide").owlCarousel({
                navigation: true,
                pagination: false,
                singleItem: true,
                navigationText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right "></i>']
            });
        }

        if ($(".slider2").length) {
            $(".slider2").owlCarousel({
                items: 3,
                itemsDesktop : [1199,3],
                itemsDesktopSmall : [992,2],
                itemsTablet: [767,2],
                itemsTabletSmall: [600,1],
                navigation: true,
                pagination: false,
                navigationText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right "></i>']
            });
        }

         if ($(".slider3").length) {
            $(".slider3").owlCarousel({
                navigation: true,
                pagination: false,
                singleItem: true,
                navigationText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right "></i>']
            });
        }


        if ($(".slider4").length) {
            $(".slider4").owlCarousel({
                items: 5,
                itemsDesktop : [1199,3],
                itemsDesktopSmall : [992,2],
                itemsTablet: [767,2],
                itemsTabletSmall: [600,1],
                autoPlay: 3000,
                slideSpeed: 200,
                navigation: false,
                pagination: false,
                navigationText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right "></i>']
            });
        }


        //Menu responsive
        var _clone = $('.menu-nav').clone().appendTo("Body");
            _clone.addClass('menu-responsive');
            _clone.wrap("<div id='menu-wrap' class='menu-responsive-container'></div>");
        $('.menu-dropdown').children('a').append('<i class="fa fa-caret-down"></i>');
        $('#menu-wrap').prepend('<a class="close-menu" href="javascript:"><i class="fa fa-chevron-right"></i></a>');
        $('#menu-wrap').find('.dropdown').prepend('<li class="menu-item back-item"><a class="back-item-text" href="javascript:">Back&nbsp;&nbsp;<i class="fa fa-hand-o-right"></i></a></li>');
        $('#menu-wrap').find('.menu-dropdown').prepend('<span class="menu-toggle-dropdown"><i class="fa fa-angle-right"></i></span>');

        $('.menu-responsive-toggle').on('click', function( event ) {
            event.stopPropagation();
            setTimeout( function() {
                 _clone.parent().addClass('menu-show');
                $('body').addClass('menu-slide');
             },300);
             $('.wrapper').addClass('page-translate');
             $('.header-sticky').addClass('header-translate');
			 
			 if($('.dropdown-active').length) {
				$('.dropdown').removeClass('dropdown-active');
			 }
        });
     
        $(document).on( 'click touchstart', function( event ) {

            if( !$(event.target).closest('#menu-wrap, .back-item, .back-item-text, .dropdown-active').length ) {
                $('.menu-responsive-container').removeClass('menu-show');
                setTimeout( function() {
                    $('body').removeClass('menu-slide');
                }, 300);
                $('.wrapper').removeClass('page-translate');
                $('.header-sticky').removeClass('header-translate');
				if($('.dropdown-active').length) {
					$('.dropdown').removeClass('dropdown-active');
				}
            }

        });

        $('.menu-responsive-container').find('a.close-menu').on('click', function() {
            $('.menu-responsive-container').removeClass('menu-show');
            setTimeout( function() {
                    $('body').removeClass('menu-slide');
            }, 300);
            $('.wrapper').removeClass('page-translate');
            $('.header-sticky').removeClass('header-translate');
        });


        $('.menu-toggle-dropdown').on('click', function() {
            $(this).parent().children('.dropdown').toggleClass('dropdown-active');
            $('.menu-responsive').toggleClass('menu-state');
        });


        $('.back-item-text').on('click', function() {
            $('.menu-responsive').toggleClass('menu-state');
            $(this).parent().parent().toggleClass('dropdown-active');
        });


        var heightHeader = $('.header-sticky').outerHeight();
        $(window).scroll(function() {
            var windowScrollTop = $(window).scrollTop();
            console.log($('body').children('.header-sticky'));
            if (windowScrollTop > (heightHeader)) {
                $('.header-sticky').addClass('fixed');
                $('.header-sticky')
                    .closest('body')
                    .find('.wrapper')
                    .css('margin-top', heightHeader);
                if ($('body').children('.header-sticky').length == 0) {
                    $('.header-sticky').prependTo('body');
                }
            } else {
                $('.header-sticky').removeClass('fixed');
                $('.header-sticky')
                    .closest('body')
                    .find('.wrapper')
                    .css('margin-top', '0');
                if ($('.wrapper').children('.header-sticky').length == 0) {
                    $('.header-sticky').prependTo('.wrapper');
                }
            }
            console.log(windowScrollTop)
        });

        /*==============================
            Ajax contact form
        ==============================*/
        if($(".contact-form").length > 0) {
          // Validate the contact form
          $('.contact-form').validate({
            // Add requirements to each of the fields
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

            // Specify what error messages to display
            // when the user does something horrid
            messages: {
              name: {
                required: "Please enter your first name.",
                minlength: $.format("At least {0} characters required.")
              },
              email: {
                required: "Please enter your email.",
                email: "Please enter a valid email."
              },
              message: {
                required: "Please enter a message.",
                minlength: $.format("At least {0} characters required.")
              }
            },

            // Use Ajax to send everything to processForm.php
            submitHandler: function(form) {
              $(".submit-contact").html("Sending...");
              $(form).ajaxSubmit({
                success: function(responseText, statusText, xhr, $form) {
                  $("#contact-content").slideUp(600, function() {
                    $("#contact-content").html(responseText).slideDown(600);
                  });
                }
              });
              return false;
            }
          });
        }


        //Filter
        FilterWork();

        //Map
        GoogleMap();


        $(window).on('load', function(){

            //Preloader
            $('body').addClass('loaded');
            

            EqualHeight('.text-box');
             $(window).resize( function() {
                EqualHeight('.text-box');
            });
            

            if( $('.js-masonry').length ) {
                $('.js-masonry').masonry({
                  columnWidth: '.grid-sizer',
                  itemSelector: '.js-item'
                });
            }

        });
       
    });

})(jQuery);