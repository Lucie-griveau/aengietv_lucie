(function($) {
    "use strict";
    /* =======================================
        For Data Toggle Tooltip
    =======================================*/
    $('[data-toggle="tooltip"]').tooltip(); 

    /* =======================================
        For Menu
    =======================================*/

    $("#navigation").menumaker({
        title: "",
        format: "multitoggle"
    });


    $("#clickserch").on('click',function(){
        $("#opensearch").fadeToggle("slow");
      });
    
    
    
      $("#search-clear").on('click',function(e){
          alert(',jadfakjsn');
        var query = $.trim($('#searchUp').val()).toLowerCase(); 
        $('.contribution').each(function(){                      
        var $this = $(this);     
            if($this.text().toLowerCase().indexOf(query) === -1){
            $this.fadeOut();        
            }
            else{
                $this.fadeIn();   
            }
        }); 
      });
    
    
    /* =======================================
        For Slider
    =======================================*/
     $('#slider').owlCarousel({
         animateOut: 'fadeOut',
         animateIn: 'fadeIn',
         items:1,
         margin:0,
         nav: true, 
         dots: false,
         autoplay:true,
         loop: true, 
         smartSpeed: 1200, 
         navText: ["<i class='icofont-long-arrow-left'></i>", "<i class='icofont-long-arrow-right'></i>"], 
         autoplayHoverPause: true, 
	});  
 
    /* =======================================
        For Arrivle Items
    =======================================*/
	$('#new-arrivle').owlCarousel( {
        autoplay: true, 
        autoplaySpeed: 600, 
        nav: true, 
        dots: false, 
        loop: true, 
        margin:30, 
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        autoplayHoverPause: true, 
        responsive: {
            0: {
                items: 1
            }
            , 480: {
                items: 1
            }
            , 568: {
                items: 2
            }
            , 668: {
                items: 2
            }
            , 768: {
                items: 3
            }
            , 
            992: {
                items: 4
            }
            , 
            1024: {
                items: 4
            }
            , 1200: {
                items: 5
            }
        }
	});
    /* =======================================
        For Populer Item
    =======================================*/
    $('#popular-shows').owlCarousel( {
        autoplay: false, 
        autoplaySpeed: 600, 
        nav: true, 
        dots: false, 
        loop: true, 
        margin:20, 
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        autoplayHoverPause: true, 
        responsive: {
            0: {
                items: 2
            }
            , 480: {
                items: 2
            }
            , 568: {
                items: 2
            }
            , 668: {
                items: 2
            }
            , 768: {
                items: 4
            }
            , 
            992: {
                items: 4
            }/*
            , 
            1024: {
                items: 4
            }
            , 1200: {
                items: 4
            }*/
        }
    }); 
    
    
    
      $('#contributions').owlCarousel( {
        autoplay: false, 
        autoplaySpeed: 600, 
        nav: true, 
        dots: false, 
        loop: true, 
        margin:20, 
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        autoplayHoverPause: true, 
        responsive: {
            0: {
                items: 2
            }
            , 480: {
                items: 2
            }
            , 568: {
                items: 2
            }
            , 668: {
                items: 2
            }
            , 768: {
                items: 3
            }
            , 
            992: {
                items: 3
            }
            , 
            1024: {
                items: 4
            }
            , 1200: {
                items: 4
            }
        }
    }); 
    
    
    $('#mytvContributions').owlCarousel( {
        autoplay: false, 
        autoplaySpeed: 600,
        items:1,
        nav: true, 
        dots: false, 
        loop: false, 
        margin:20, 
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        autoplayHoverPause: true
       
    }); 
    
    $('#followed-channels').owlCarousel( {
        autoplay: false, 
        autoplaySpeed: 600, 
        nav: true, 
        dots: false, 
        loop: true, 
        margin:20, 
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        autoplayHoverPause: true, 
        responsive: {
            0: {
                items: 2
            }
            , 480: {
                items: 2
            }
            , 568: {
                items: 2
            }
            , 668: {
                items: 2
            }
            , 768: {
                items: 3
            }
            , 
            992: {
                items: 3
            }/*
            , 
            1024: {
                items: 4
            }
            , 1200: {
                items: 4
            }*/
        }
    }); 
    
    $('#favourite-streams').owlCarousel( {
        autoplay: false, 
        autoplaySpeed: 600, 
        nav: true, 
        dots: false, 
        loop: true, 
        margin:20, 
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        autoplayHoverPause: true, 
        responsive: {
            0: {
                items: 2
            }
            , 480: {
                items: 2
            }
            , 568: {
                items: 2
            }
            , 668: {
                items: 2
            }
            , 768: {
                items: 3
            }
            , 
            992: {
                items: 3
            }/*
            , 
            1024: {
                items: 4
            }
            , 1200: {
                items: 4
            }*/
        }
    }); 
    
    
    
    
    
     $('#popular-shows2').owlCarousel( {
        autoplay: false, 
        autoplaySpeed: 600, 
        nav: true, 
        dots: false, 
        loop: true, 
        margin:10, 
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        autoplayHoverPause: true, 
        responsive: {
            0: {
                items: 2
            }
            , 480: {
                items: 2
            }
            , 568: {
                items: 2
            }
            , 668: {
                items: 2
            }
            , 768: {
                items: 3
            }
            /*, 
            992: {
                items: 4
            }
            , 
            1024: {
                items: 4
            }
            , 1200: {
                items: 4
            }*/
        }
    }); 
    

    /* =======================================
        For Team
    =======================================
    $('#team').owlCarousel( {
        autoplay: false, 
        autoplaySpeed: 600, 
        nav: true, 
        dots: false, 
        loop: true, 
        margin:30, 
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        autoplayHoverPause: true, 
        responsive: {
            0: {
                items: 1
            }
            , 480: {
                items: 2
            }
            , 568: {
                items: 2
            }
            , 668: {
                items: 2
            }
            , 768: {
                items: 3
            }
            , 
            992: {
                items: 3
            }
            , 
            1024: {
                items: 4
            }
            , 1200: {
                items: 4
            }
        }
    }); 

    $('#slider-2').owlCarousel( {
        autoplay: false, 
        autoplaySpeed: 600, 
        nav: false, 
        dots: true, 
        loop: true, 
        margin:30, 
        autoplayHoverPause: true, 
        responsive: {
            0: {
                items: 1
            }
            , 480: {
                items: 1
            }
            , 568: {
                items: 2
            }
            , 668: {
                items: 2
            }
            , 768: {
                items: 3
            }
            , 
            992: {
                items: 4
            }
            , 
            1024: {
                items: 4
            }
            , 1200: {
                items: 5
            }
        }
    });    */
    /* =======================================
        For TV Serise
    =======================================*/
    $('#tvseries-shows').owlCarousel( {
        autoplay: false, 
        autoplaySpeed: 600, 
        nav: true, 
        dots: false, 
        loop: true, 
        margin:10, 
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        autoplayHoverPause: true, 
        responsive: {
            0: {
                items: 2
            }
            , 480: {
                items: 2
            }
            , 568: {
                items: 2
            }
            , 668: {
                items: 2
            }
            , 768: {
                items: 3
            }
            /*, 
            992: {
                items: 4
            }
            , 
            1024: {
                items: 4
            }
            , 1200: {
                items: 4
            }*/
        }
    });
    /* =======================================
        For Banner
    =======================================
    $('#banner').owlCarousel({
        animateOut: 'fadeOut',
        animateIn: 'fadeInRight',
        items:1,
        margin:5,
        dots:true,
        loop: true, 
        smartSpeed: 1200, 
        autoplayHoverPause: true, 
    });*/
    /* =======================================
        For Slider
    =======================================
     $('.miniitem1').owlCarousel({
        animateOut: 'fadeOut',
        animateIn: 'fadeInRight',
        items:1,
        margin:0,
        nav: true, 
        dots: false, 
        loop: true, 
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        smartSpeed: 1200, 
        autoplayHoverPause: true, 
    });   */

    /* =======================================
        For trailor
    =======================================
     $('#trailor').owlCarousel({
        animateOut: 'fadeOut',
        animateIn: 'fadeInRight',
        items:1,
        margin:0,
        nav: false, 
        dots: true, 
        loop: true, 
        smartSpeed: 1200, 
        autoplayHoverPause: true, 
    }); */
    /* =======================================
        For trailor-img-slide
    =======================================
     $('#trailor-img-slide').owlCarousel({
        animateOut: 'fadeOut',
        animateIn: 'fadeInRight',
        items:1,
        margin:0,
        nav: false, 
        dots: true, 
        loop: true, 
        smartSpeed: 1200, 
        autoplayHoverPause: true, 
    }); */
    /* =======================================
        For Back To Top
    =======================================*/
   $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            $('#back-top').fadeIn();
        }
        else {
            $('#back-top').fadeOut();
        }
    });
    $('#back-top').on('click', function() {
        $("html, body").animate( {
            scrollTop: 0
        }
        , 1000);
        return false;
    });

    $('#catmenu li.active').addClass('open').children('ul').show();
    $('#catmenu li.has-sub>a').on('click', function(){
        $(this).removeAttr('href');
        var element = $(this).parent('li');
        if (element.hasClass('open')) {
            element.removeClass('open');
            element.find('li').removeClass('open');
            element.find('ul').slideUp(200);
        }
        else {
            element.addClass('open');
            element.children('ul').slideDown(200);
            element.siblings('li').children('ul').slideUp(200);
            element.siblings('li').removeClass('open');
            element.siblings('li').find('li').removeClass('open');
            element.siblings('li').find('ul').slideUp(200);
        }
    });
    $("#hidden-cat").on('click',function(){
        $("#catmenu").stop().slideToggle(500);
    });
   

    var swiper = new Swiper('.swiper-slides', {
        effect: 'coverflow',
        initialSlide: 1,
        loop: true,
        spaceBetween: 30,
        slidesPerView: 3,
        coverflowEffect: {
            rotate: 2,
            stretch: 2,
            depth: 0,
        },
        navigation: {
          nextEl: '.slide4-icon-left',
          prevEl: '.slide4-icon-right',
        },
        autoplay: {
            delay: 3000,
        },  
        breakpoints: {
            1450: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            990: {
              slidesPerView: 2,
                spaceBetween: 10,
            },
            861: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            }
          }
    });

    /*** slider range section ***/
        $(function() {
            $( "#slider-range").slider( {
                range: true, min: 0, max: 500, values: [ 75, 300], slide: function( event, ui) {
                    $( "#amount").val( "$" + ui.values[ 0]);
                    $( "#amount2").val( "$" + ui.values[ 1]);
                }
            }
            );
            $( "#amount").val( "$" + $( "#slider-range").slider( "values", 0));
            $( "#amount2").val( "$" +$( "#slider-range").slider( "values", 1));
    });

    /*** Preloader ** */

    var winObj = $( window ),
        bodyObj = $( 'body' ),
        headerObj = $( 'header' );
        winObj.on( 'load', function()
    {
        var $preloader = $( '.zmovo-preloader' );
        $preloader.find( '.boxes' ).fadeOut();
        $preloader.delay( 350 ).fadeOut( 'slow' );
    });
    
    

}(jQuery))

/*** Login ***/
var isHidden = true;
    function userLayer(){
    
            if(isHidden){
                document.getElementById('loginLayer').style.visibility = 'visible';
                isHidden = false;
            }else{
                document.getElementById('loginLayer').style.visibility ='hidden';
                isHidden = true;
            }
        }