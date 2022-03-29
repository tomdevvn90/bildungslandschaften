'use strict';

jQuery( function( $ ) {
	const $wrap = $( '.fancy-card-block' );
	let $fancyItem = $wrap.find( '.fancy-card-item' );
	const firstItem = $fancyItem[ 0 ];
	const lastItem = $fancyItem[ $fancyItem.length - 1 ];
	const rectF = firstItem.getBoundingClientRect();
	const rectL = lastItem.getBoundingClientRect();

	function FancyCardItemEvent() {
		const ww = window.innerWidth;
		const lF = rectF.left;
		const rF = rectF.right;
		const tL = rectL.right + 35 - ww;
		console.log( rectL, rectF, tL );
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
	}

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
				// $fancyItem.css( {
				// 	transform: 'translate3d(0px, calc(150px * var(--item) - 150px), 0)',
				// } );
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
	} );
} );
