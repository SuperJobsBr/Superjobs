(function($){

	"use strict";
        
		/* ------------------------------------- */
		/*   Menu
		/* ------------------------------------- */
		//open navigation clicking the menu icon
		$('.cd-nav-trigger').on('click', function(event) {
			event.preventDefault();
			toggleNav(true);
		});
		//close the navigation
		$('.cd-close-nav, .cd-overlay').on('click', function(event) {
			event.preventDefault();
			toggleNav(false);
		});
		//select a new section
		$('.cd-nav li').on('click', function(event) {
			var target = $(this),
				//detect which section user has chosen
				sectionTarget = target.data('menu');
			if (!target.hasClass('cd-selected')) {
				//if user has selected a section different from the one alredy visible
				//update the navigation -> assign the .cd-selected class to the selected item
				target.addClass('cd-selected').siblings('.cd-selected').removeClass('cd-selected');
				//load the new section
				loadNewContent(sectionTarget);
			} else {
				// otherwise close navigation
				toggleNav(false);
			}
		});
	
		function toggleNav(bool) {
			$('.cd-nav-container, .cd-overlay').toggleClass('is-visible', bool);
			$('main').toggleClass('scale-down', bool);
		}
	
		function loadNewContent(newSection) {
			//create a new section element and insert it into the DOM
			var section = $('<section class="cd-section ' + newSection + '"></section>').appendTo($('main'));
			//load the new content from the proper html file
			section.load(newSection + '.html .cd-section > *', function(event) {
				//add the .cd-selected to the new section element -> it will cover the old one
				section.addClass('cd-selected').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
					//close navigation
					toggleNav(false);
				});
				section.prev('.cd-selected').removeClass('cd-selected');
			});
	
			$('main').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
				//once the navigation is closed, remove the old section from the DOM
				section.prev('.cd-section').remove();
			});
	
			if ($('.no-csstransitions').length > 0) {
				//if browser doesn't support transitions - don't wait but close navigation and remove old item
				toggleNav(false);
				section.prev('.cd-section').remove();
			}
		}

	/* Menu color effect */
	$(window).scroll(function () {
	 var navbarHeight = $('.hero').outerHeight();
	  if ( $(this).scrollTop() > navbarHeight && !$('.navigation').hasClass('nav-up') ) {
		$('.navigation').addClass('nav-up');
	   } else if ( $(this).scrollTop() <= navbarHeight ) {
		$('.navigation').removeClass('nav-up');
	  }
	});
	

	/* Smooth scroll function */
	$(document).on('click', 'ul.cd-nav a', function(e) {
		if ( $(e.target).is('a[href*="#"]:not([href="#"]') ) {
        	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
            	|| location.hostname == this.hostname) {

            	var target = $(this.hash);
            	target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            	if (target.length) {
                	$('html,body').animate({
                    	scrollTop: target.offset().top
                	}, 1000);
                	return false;
            	}
        	}
    	}
	});


	function playFullscreen (){
		var $ = document.querySelector.bind(document);
		var iframe = $('iframe#player');

		var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
		if (requestFullScreen) {
			requestFullScreen.bind(iframe)();
		}
	}

	$(document).ready(function(){
		$('.play-button').click(function(){
			playFullscreen();
		})

  
    $(".owl-clients , .last-tweets").owlCarousel({
      items: 1,
      autoplay: true,
      stopOnHover: true,
      dots: true,
    });


    var process = $('#process-slider');

		process.owlCarousel({
			items: 1,
			autoPlay: 5000,
			stopOnHover: true,
			singleItem: true,
			dots: false,
			nav: true,
      onInitialized : function(){
        var isBr = window.location.href.toLowerCase().indexOf('br') > -1;
        $.each(process.find('.owl-item'), function(i,o){
          var item = $(o);
          item.find('img.process-slider__slide').hide();
          item.find('img.process-slider__slide').eq(isBr ? 0 : 1).show();
        });  
      }
		});

    process.on('changed.owl.carousel', function(){
      setTimeout(function(){
        var item =  process.find('.owl-item'),
            index = process.find('.owl-item.active').index();

        if(index > 3)
          index = 2;

        $('.process-slider__nav__jumps a').removeClass('active');
        $('.process-slider__nav__jumps a').eq(index).addClass('active');

        $('.owl-nav').removeClass('slide-00 slide-01 slide-02 slide-03');
        $('.owl-nav').addClass('slide-0' + index);
      }, 500);

    });

    $('.process-slider__nav__jumps a').click(function(evt){
      evt.preventDefault();
      var _this = $(this);
      process.trigger('to.owl.carousel', [_this.index(), 100, true]);
    });
	
		$(".owl-clients , .last-tweets").owlCarousel({
			items: 1,
			autoplay: true,
			stopOnHover: true,
			dots: true,
		});

	
		$(".client").owlCarousel({
			autoPlay: 4000,
			margin: 10,
			stopOnHover: true,
			dots: true,
			responsive: {
				0: {
					items: 1
				},
				400: {
					items: 2
				},
				600: {
					items: 3
				},
				1000: {
					items: 3
				}
			}
		});
	
		$(".slider-wrapper").owlCarousel({
			singleItem: true,
			loop: true,
			nav: true,
			autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause: true,
			navText: ['<span class="prev"></span>', '<span class="next"></span>'],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 1
				},
				1000: {
					items: 1
				}
			}
		});
		/* ------------------------------------- */
		/*   portfolio-filter
		/* ------------------------------------- */
		// filter items on button click
		$('.portfolio-filter').on('click', 'a', function(e) {
			e.preventDefault();
			var filterValue = $(this).attr('data-filter');
			$container.isotope({
				filter: filterValue
			});
			$('.portfolio-filter a').removeClass('active');
			$(this).closest('a').addClass('active');
		});

		$('.mansory-pagination .list .item').click(function(evt){
			evt.preventDefault();
			var _this = $(this),
				_listIndex = _this.index();

			$container.isotope({
				itemSelector: '.masonry-item',
				layoutMode: 'packery',
				cellsByRow: {
				  columnWidth: '.masonry-item',
				},
				filter: function(){
					var index = $(this).index();

					if(_listIndex == 0)
						return parseInt(index, 10) < 9;
					else
						return parseInt(index, 10) > 9;
				}
			});

            $('html, body').animate({
                scrollTop: $("#portfolio").offset().top - 50
            }, 1000);
		});
	
		
		// isotope Masonry
		var $container = $('#portfolio .masonry');
		var $containerInternacional = $('#portfolio-internacional .masonry');

		$container.imagesLoaded(function() {
			$container.isotope({
				itemSelector: '.masonry-item',
				layoutMode: 'packery',
				cellsByRow: {
				  columnWidth: '.masonry-item',
				},
				filter: function(){
					var index = $(this).index();
					return parseInt(index, 10) < 9;
				}
			});

			$containerInternacional.isotope({
				itemSelector: '.masonry-item',
				layoutMode: 'packery',
				cellsByRow: {
				  columnWidth: '.masonry-item',
				},
				filter: function(){
					var index = $(this).index();
					return parseInt(index, 10) < 9;
				}
			});
		});

		$container.on( 'arrangeComplete', function(event, filteredItens){
			if (filteredItens.length >= 9)
				$('.mansory-pagination').show();

			else {
				if($('.portfolio-filter').attr('data-filter') == '*')
					return;

				$('.mansory-pagination').hide();
			}
		});


		$containerInternacional.imagesLoaded(function() {
			$containerInternacional.isotope({
				itemSelector: '.masonry-item',
				layoutMode: 'packery',
				cellsByRow: {
				  columnWidth: '.masonry-item',
				},
				filter: function(){
					var index = $(this).index();
					return parseInt(index, 10) < 9;
				}
			});
		});

		$container.imagesLoaded(function() {
			$container.isotope({
				itemSelector: '.masonry-item',
				layoutMode: 'packery',
				cellsByRow: {
				  columnWidth: '.masonry-item',
				},
				filter: function(){
					var index = $(this).index();
					return parseInt(index, 10) < 9;
				}
			});
		});
		
		$('.masonry-posts').isotope({
			masonry: {
				itemSelector: '.post',
				percentPosition: true,
				gutter: 15
			}
		});
		
        /* ------------------------------------- */
        /*  Lightbox popup
        /* ------------------------------------- */
        $('.lightbox-gallery').magnificPopup({
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
            image: {
                titleSrc: 'title',
                verticalFit: true
            }
        });

        $('.lightbox-video , .popup-gmaps').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false,
            iframe: {
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: 'http://www.youtube.com/embed/%id%?autoplay=1'
                    }
                }
            }
        });
 
        /* ------------------------------------- */
        /*  bgndVideo hero
        /* ------------------------------------- */
        jQuery("#bgndVideo").YTPlayer();

       
	});

	// Init wow.js
	new WOW().init();
})(jQuery);
