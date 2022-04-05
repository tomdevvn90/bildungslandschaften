'use strict';

jQuery( function( $ ) {
	const $wrap = $( '.fancy-card-block' );
	let rectF, rectL, $fancyItem, firstItem, lastItem;
	if ( $wrap.length ) {
		$fancyItem = $wrap.find( '.fancy-card-item' );
		firstItem = $fancyItem[ 0 ];
		lastItem = $fancyItem[ $fancyItem.length - 1 ];
		rectF = firstItem.getBoundingClientRect();
		rectL = lastItem.getBoundingClientRect();
	}
	const FancyCardItemEvent = () => {
		if ( ! $wrap.length ) {
			return;
		}
		const ww = window.innerWidth;
		const lF = rectF.left;
		const rF = rectF.right;
		const tL = rectL.right + 35 - ww;
		//rectL = lastItem.getBoundingClientRect();
		if ( tL <= 0 ) {
			return;
		}
		[ ...$fancyItem ].forEach( ( e, i ) => {
			const rect = e.getBoundingClientRect();
			if ( i === 0 ) {
				return;
			}
			$( e ).css( 'transform', `translate3d(calc(120px * var(--item) - 120px - (${ tL }px * var(--item))), calc(150px * var(--item) - 150px), 0)` );

			// if ( rect.left <= lF ) {
			// 	$( e ).css( 'transform', 'translate3d(0px, calc(150px * var(--item) - 150px), 0)' );
			// } else if (ww>=firstItem.offsetWidth *1.3) {
			//
			// }
		} );
	};

	const FancyCard = () => {
		if ( ! $wrap.length ) {
			return;
		}
		$fancyItem = $wrap.find( '.fancy-card-item' );
		$fancyItem.on( 'click', function( e ) {
			e.preventDefault();

			$( this ).toggleClass( '__active' ).siblings().removeClass( '__active' );
			$fancyItem.css( {
				transform: '',
				width: '',
			} );
			if ( $( this ).hasClass( '__active' ) ) {
				$fancyItem.css( {
					transform: 'translate3d(0px, calc(150px * var(--item) - 150px), 0)',
				} );
				$( this ).css( 'width', '100%' );
			}
		} );
		$fancyItem.on( 'mouseenter', ( e ) => {
			e.preventDefault();
			$wrap.find( '.fancy-cards-wrap' ).addClass( '__hover' );
		} );
		$fancyItem.on( 'mouseleave', ( e ) => {
			e.preventDefault();
			$wrap.find( '.fancy-cards-wrap' ).removeClass( '__hover' );
		} );
	};

	const setHForFancyCardWrap = () => {
		const $wrapF = $( '.fancy-card-block' );
		if ( ! $wrapF.length ) {
			return;
		}
		const $items = $wrapF.find( '.fancy-card-item' );
		$wrapF.css( 'min-height', ( ( $items.length - 1 ) * 150 ) + 500 );
	};

	const MapSelector = () => {
		const $wrap = $( '.bild-map-selector-block' ),
			$btnMapSelectorWrap = $wrap.find( '.btn-info-map-selector' ),
			$btnMapSelector = $btnMapSelectorWrap.find( '.bild-btn' ),
			$btnMapSelectorTextWrap = $btnMapSelectorWrap.find( '.bild-btn-text' ),
			$selectorsPointer = $wrap.find( '.pointer-selectors' ),
			$selectorsPointerItem = $selectorsPointer.find( '.__pointer' ),
			$selectorsPointerItemFirst = $selectorsPointer.find( '.__pointer' );
		if ( ! $selectorsPointerItem.length ) {
			$btnMapSelectorWrap.hide();
		}
		const dataFirstItem = $selectorsPointerItemFirst.data( 'map' );
		$btnMapSelectorTextWrap.text( dataFirstItem.title );
		$btnMapSelector.attr( 'href', dataFirstItem.link );
		$selectorsPointerItem.on( 'mouseenter click', function( e ) {
			e.preventDefault();
			const data = $( this ).data( 'map' );
			$btnMapSelectorTextWrap.text( data.title );
			$btnMapSelector.attr( 'href', data.link );
		} );
	};

	const SliderContainer = () => {
		$( '[data-slider-container]' ).each( function() {
			const $self = $( this );
			const $slideWrap = $self.find( '.inner-wrap' );
			let opt = $self.data( 'slider-container' );
			const b992 = $self.data( 'breakpoint-tablet' );
			const b576 = $self.data( 'breakpoint-mobile' );
			const arrowStyle = $self.data( 'arrow-style' );
			const optDefault = {
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: true,
				arrows: true,
				infinite: true,
				fade: true,
				adaptiveHeight: true,
				variableWidth: true,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: b992 || 2,
							slidesToScroll: b992 || 2,
						},
					},
					{
						breakpoint: 576,
						settings: {
							slidesToShow: b576 || 1,
							slidesToScroll: b576 || 1,
						},
					},
				],
			};

			optDefault.nextArrow = '<button class="slick-next slick-arrow" aria-label="Next" type="button">Next <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"/></svg></button>';
			optDefault.prevArrow = '<button class="slick-prev slick-arrow" aria-label="Previous" type="button">Previous <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"/></svg></button>';

			if ( arrowStyle === 'style-1' ) {
				optDefault.nextArrow = '<span class="custom-slick-arrow next-a"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 13"><path fill="currentColor" d="M18.1 6.45 2.92 0l1.64 4.4L0 6.45 4.55 8.5l-1.64 4.4 15.2-6.45Z"/></svg></span>';
				optDefault.prevArrow = '<span class="custom-slick-arrow prev-a"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 13"><path fill="currentColor" d="M18.1 6.45 2.92 0l1.64 4.4L0 6.45 4.55 8.5l-1.64 4.4 15.2-6.45Z"/></svg></span>';
			}

			opt = Object.assign( {}, optDefault, opt );
			$slideWrap.slick( opt );
		} );
	};

	$( window ).on( 'load', function() {
		setHForFancyCardWrap();
		FancyCardItemEvent();
	} );
	$( window ).on( 'resize', function() {
		setHForFancyCardWrap();
		FancyCardItemEvent();
	} );

	$( document ).ready( function() {
		FancyCard();
		MapSelector();
		SliderContainer();
	} );
} );
