$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()


	// Основной слайдер на главной
	if ($('.main_slider .swiper-container').length) {
		new Swiper('.main_slider .swiper-container', {
			loop: false,
			speed: 750,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		})
	}


	// Слайдер с картинками
	if ($('.image_slider .swiper-container').length) {
		new Swiper('.image_slider .swiper-container', {
			loop: true,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			autoplay: {
				delay: 2500
			}
		})
	}


	// Отзывы
	if ($('.reviews .swiper-container').length) {
		reviewsSlider = new Swiper('.reviews .swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			on: {
				slideChange: swiper => {
					setTimeout(() => {
						$('.reviews .thumbs button').removeClass('active')
						$('.reviews .thumbs button').eq(swiper.activeIndex).addClass('active')
					})
				}
			}
		})
	}

	$('.reviews .thumbs button').click(function (e) {
		e.preventDefault()

		reviewsSlider.slideTo($(this).data('slide-index'), 500)
	})


	// Галерея слайдер
	if ($('.gallery_slider .swiper-container').length) {
		gallerySlider = new Swiper('.gallery_slider .swiper-container', {
			loop: true,
			speed: 750,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 35,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			on: {
				slideChange: swiper => {
					setTimeout(() => {
						$('.gallery_slider .thumbs button').removeClass('active')
						$('.gallery_slider .thumbs button').eq(swiper.realIndex).addClass('active')
					})
				}
			}
		})
	}

	$('.gallery_slider .thumbs button').click(function (e) {
		e.preventDefault()

		gallerySlider.slideToLoop($(this).data('slide-index'), 500)
	})


	// ПОДДЕРЖАТЬ НАС
	$('.donate_link .close_btn').click(function (e) {
		e.preventDefault()

		$('.donate_link').slideUp(200)
	})


	// Энциклопедия - Сортировка
	$('.encyclopedia .sort select').change(function () {
		if ($(this).val() == 1) {
			$('.encyclopedia .categories').hide()
			$('.encyclopedia .alphabet').fadeIn(300)
		}

		if ($(this).val() == 2) {
			$('.encyclopedia .alphabet').hide()
			$('.encyclopedia .categories').fadeIn(300)
		}
	})


	// Моб. меню
	$('header .mob_menu_btn,.overlay').click((e) => {
		e.preventDefault()

		!$('header .mob_menu_btn').hasClass('active')
			? $('.overlay').fadeIn(300)
			: $('.overlay').fadeOut(200)

		$('header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('menu_open')
		$('header .menu').toggleClass('show')
	})


	// Моб. подвал
	$('footer .links_wrap .title').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})


	// Поиск
	$('.map_wrap .search form .input').keydown(function (e) {
		let _self = $(this)

		setTimeout(() => {
			let query = _self.val()

			if (query.length > 0) {
				$('.map_wrap .map .accordion_item').hide()
				$('.map_wrap .map .accordion_item .head .title:contains("' + query + '")').parents('.accordion_item').show()
				$('.map_wrap .search .datalist').show()
			} else {
				$('.map_wrap .search .datalist').hide()
			}
		})
	})
})



$(window).on('resize', () => {
	if (typeof WW !== 'undefined' && WW != $(window).width()) {
		// Моб. версия
		if (!fiestResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 360) $('meta[name=viewport]').attr('content', 'width=360, user-scalable=no')

			fiestResize = true
		} else {
			fiestResize = false
		}


		// Перезапись ширины окна
		WW = $(window).width()
	}
})



$(window).on('scroll', () => {
	// Поворот элементом от скролла
	scrollRotate()
})



// Поворот элементом от скролла
const scrollRotate = () => {
	$('.circle_arrows').css('transform', 'rotate(' + window.pageYOffset / 5 + 'deg)')
}


// Карта
const initMap = () => {
	ymaps.ready(() => {
		let myMap = new ymaps.Map('map', {
			center: [55.753215, 37.622504],
			zoom: 5,
			controls: []
		})

		// Кастомный маркер
		myMap.geoObjects.add(new ymaps.Placemark([58.006225, 56.232165], {}, {
			iconLayout: 'default#image',
			iconImageHref: 'images/ic_map_marker.svg',
			iconImageSize: [70, 106],
			iconImageOffset: [-35, -106]
		}))

		myMap.geoObjects.add(new ymaps.Placemark([55.755819, 37.617644], {}, {
			iconLayout: 'default#image',
			iconImageHref: 'images/ic_map_marker2.svg',
			iconImageSize: [70, 106],
			iconImageOffset: [-35, -106]
		}))

		myMap.geoObjects.add(new ymaps.Placemark([59.939099, 30.315877], {}, {
			iconLayout: 'default#image',
			iconImageHref: 'images/ic_map_marker3.svg',
			iconImageSize: [70, 106],
			iconImageOffset: [-35, -106]
		}))


		myMap.controls.add('zoomControl', {
			position: {
				left: '20px',
				top: '20px'
			}
		})

		myMap.behaviors.disable('scrollZoom')


		// Клик по городу из выпадающего списка
		$('.map_wrap .map .accordion_item').click(function () {
			$('html, body').stop().animate({ scrollTop: $('.map_wrap').offset().top }, 1000)

			let coordinates = $(this).data('coordinates')

			myMap.setCenter(coordinates, 16)
		})


		// Клик по городу из списка ниже
		$('.cities .btn').click(function (e) {
			e.preventDefault()

			$('html, body').stop().animate({ scrollTop: $('.map_wrap').offset().top }, 1000)

			let coordinates = $(this).data('coordinates')

			myMap.setCenter(coordinates, 16)
		})
	})
}