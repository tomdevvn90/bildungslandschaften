'use strict';

jQuery( function( $ ) {
	const $wrap = $( '.fancy-card-block' );
	let $fancyItem = $wrap.find( '.fancy-card-item' );
	const firstItem = $fancyItem[ 0 ];
	const lastItem = $fancyItem[ $fancyItem.length - 1 ];
	const rectF = firstItem.getBoundingClientRect();
	const rectL = lastItem.getBoundingClientRect();

	const FancyCardItemEvent = () => {
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
		$selectorsPointerItem.on( 'mouseenter', function( e ) {
			e.preventDefault();
			const data = $( this ).data( 'map' );
			$btnMapSelectorTextWrap.text( data.title );
			$btnMapSelector.attr( 'href', data.link );
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
	} );
} );
