jQuery(document).ready(function($){
	$footer = $('footer');
	$footerHeight = $footer.height();

	$sobre = $('.avatar');
	$sobreHeight = $sobre.height();

	$header = $('header');
	$headerHeight = $header.height();

	copyright_date();
	ajusta_footer($footerHeight);

	//NAVEGA PARA A ÁREA DESEJADA DO MENU
	var speed = 250;
	$('header a').on('click', function(){
		$('header a').removeClass('active');

		if(!$(this).hasClass('menu-icon')){
			if($('nav').hasClass('responsive')){
				$('nav').removeClass('responsive');
			}
		}

		var $href = $(this).attr('href');
		var $anchor = $($href).offset().top - $headerHeight;

		$('html, body').animate({scrollTop:$anchor}, speed);
		$(this).addClass('active');
		
		return false;
	});

	//POPUPS
	$('.popup').magnificPopup({
	  type: 'inline',
	  midClick: true,
	  gallery:{
	    enabled:false
	  }
	});

});

$.fn.extend({
    animateCss1: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    },

    animateCss2: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            $(this).removeClass('fixa');
			$(this).css({'position':'absolute'});

			$('header').animateCss1('fadeInDown');
        });
        return this;
    }
});

// /(?:^|\s)palavra(?!\S)/
// /(?:^|\s)palavra(?!\S)/g
window.onscroll = function(){
	var top = window.pageYOffset || document.documentElement.scrollTop;

	//Ajusta Menu com Scroll
	if( top > $sobreHeight ) {
		$('header').css({'position':'fixed'});
		if(!$('header').hasClass('fixa')){
			$('header').addClass('fixa');	
			$('header').animateCss1('fadeInDown');
		}
	}else{
		if($('header').hasClass('fixa')){
			$('header').animateCss2('fadeOutUp');
		}
	}

	//Ajusta Links do Menu com Scroll
	$('header a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        var elementH = refElement.offset().top - $headerHeight;
        if (elementH <= top && elementH + refElement.height() > top) {
            $('header ul li a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}

//CARREGA ITENS CONFORME SCROLL
jQuery(document).ready(function() {
    jQuery('.area').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated slideInUp',
  		classToRemove: 'hidden',
  		removeClassAfterAnimation: false,
        offset: 100
       });
});

//ATUALIZA O ANO DO COPYRIGHT
function copyright_date() {
	var firstDate = 2017;
	var lastDate = (new Date()).getFullYear();

	var output = '';
	if(lastDate) {
		var copyright = "© " + firstDate;
		if(firstDate != lastDate) {
			copyright += '-' + lastDate;
		}
		output = copyright;
	}
	$('.copyright-date').append(output);
}

//PEGA ALTURA DO FOOTER E AJUSTA PADDING DA DIV ACIMA
function ajusta_footer(height){
	$('.formacao').delay(110).css({'padding-bottom':height + 20});
}

//MENU RESPONSIVO
function responsive_menu(){
	var x = $('nav');
	if(!x.hasClass('responsive')){
		x.addClass('responsive');
	}else{
		x.removeClass('responsive');
	}
}

//PORTFOLIO (MixItUp plugin - http://mixitup.io)
$(function () {
	var filterList = { 
		init: function () {

			$('#portfoliolist').mixItUp({ 
				selectors: {
					target: '.portfolio',
					filter: '.filter'	
				},
				load: {
					filter: 'all' // show app tab on first load
				}   
			});								
		}
	};

	filterList.init();
});	