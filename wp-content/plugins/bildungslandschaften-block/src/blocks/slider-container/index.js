/**
 * BLOCK: Slider Block
 */

import './editor.scss';
import './style.scss';
import './slide-item';

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
	InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck,
	BlockIcon, MediaPlaceholder,
	RichText,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { Fragment, useState } from '@wordpress/element';
import {
	ToggleControl,
	PanelBody,
	Button,
	ResponsiveWrapper,
	Spinner,
	TextControl,
	TextareaControl, SelectControl,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';

const attr = {
	align: {
		type: 'string',
		default: '',
	},
	slideSpace: {
		type: 'number',
		default: 30,
	},
	arrowStyle: {
		type: 'string',
		default: 'default',
	},
	//slider opt
	slidesToShow: {
		type: 'number',
		default: 3,
	},
	slidesToShow991: {
		type: 'number',
		default: 2,
	},
	slidesToShow575: {
		type: 'number',
		default: 1,
	},
	slidesToScroll: {
		type: 'number',
		default: 3,
	},
	arrows: {
		type: 'boolean',
		default: true,
	},
	dots: {
		type: 'boolean',
		default: false,
	},
	adaptiveHeight: {
		type: 'boolean',
		default: true,
	},
	variableWidth: {
		type: 'boolean',
		default: false,
	},
	autoplay: {
		type: 'boolean',
		default: false,
	},
	fade: {
		type: 'boolean',
		default: false,
	},
	useTransform: {
		type: 'boolean',
		default: true,
	},
	vertical: {
		type: 'boolean',
		default: false,
	},
	verticalSwiping: {
		type: 'boolean',
		default: false,
	},
	centerMode: {
		type: 'boolean',
		default: false,
	},
	rtl: {
		type: 'boolean',
		default: false,
	},
};

const Edit = ( props ) => {
	const { attributes, setAttributes, className, setState } = props;
	const {
		slideSpace, arrowStyle,
		//opt slider
		slidesToShow,
		slidesToShow991,
		slidesToShow575,
		slidesToScroll, arrows, dots, adaptiveHeight, autoplay, fade,
		vertical, verticalSwiping, rtl, centerMode, useTransform,variableWidth
	} = attributes;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Slider Setting' ) }>
					<label>Number slide to show</label>
					<NumberControl
						isShiftStepEnabled={ true }
						onChange={ ( slidesToShow ) => {
							setAttributes( { slidesToShow: parseInt( slidesToShow ) } );
						} }
						shiftStep={ 10 } value={ slidesToShow }
					/>
					<hr />
					<label>Number slides to scroll</label>
					<NumberControl
						isShiftStepEnabled={ true }
						onChange={ ( slidesToScroll ) => {
							setAttributes( { slidesToScroll: parseInt( slidesToScroll ) } );
						} }
						shiftStep={ 10 } value={ slidesToScroll }
					/>
					<hr />
					<label>Number slide Tablet(576px -> 991px)</label>
					<NumberControl
						isShiftStepEnabled={ true }
						onChange={ ( slidesToShow991 ) => {
							setAttributes( { slidesToShow991: parseInt( slidesToShow991 ) } );
						} }
						shiftStep={ 10 } value={ slidesToShow991 }
					/>
					<hr />
					<label>Number slide Mobile(0 -> 575px)</label>
					<NumberControl
						isShiftStepEnabled={ true }
						onChange={ ( slidesToShow575 ) => {
							setAttributes( { slidesToShow575: parseInt( slidesToShow575 ) } );
						} }
						shiftStep={ 10 } value={ slidesToShow575 }
					/>
					<hr />
					<label>Slide items space</label>
					<NumberControl
						isShiftStepEnabled={ true }
						onChange={ ( slideSpace ) => {
							setAttributes( { slideSpace: parseFloat( slideSpace ) } );
						} }
						shiftStep={ 10 } value={ slideSpace }
					/>
					<hr />
					<ToggleControl
						label="Arrows"
						help={ arrows ? 'Enable arrows.' : 'Disable arrows.' }
						checked={ arrows }
						onChange={ () => {
							setAttributes( { arrows: ! arrows } );
						} }
					/>
					{ arrows && <SelectControl
						value={ arrowStyle }
						options={ [
							{
								label: __( 'Default' ),
								value: 'default',
							},
							{
								label: __( 'Style 1' ),
								value: 'style-1',
							},
						] }
						onChange={ ( arrowStyle ) => setAttributes( { arrowStyle } ) }
					/> }
					<hr />
					<ToggleControl
						label="Dots"
						help={ dots ? 'Enable dots.' : 'Disable dots.' }
						checked={ dots }
						onChange={ () => {
							setAttributes( { dots: ! dots } );
						} }
					/>
					<hr />
					<ToggleControl
						label="Adaptive Height"
						help={ adaptiveHeight ? 'Enable adaptive Height.' : 'Disable adaptive Height.' }
						checked={ adaptiveHeight }
						onChange={ () => {
							setAttributes( { adaptiveHeight: ! adaptiveHeight } );
						} }
					/>
					<hr />
					<ToggleControl
						label="Variable Width"
						help={ variableWidth ? 'Enable variable Width.' : 'Disable variable Width.' }
						checked={ variableWidth }
						onChange={ () => {
							setAttributes( { variableWidth: ! variableWidth } );
						} }
					/>
					<hr />
					<ToggleControl
						label="Fade"
						help={ fade ? 'Enable fade.' : 'Disable fade.' }
						checked={ fade }
						onChange={ () => {
							setAttributes( { fade: ! fade } );
						} }
					/>
					<hr />
					<ToggleControl
						label="Use Transform"
						help={ useTransform ? 'Enable useTransform.' : 'Disable useTransform.' }
						checked={ useTransform }
						onChange={ () => {
							setAttributes( { useTransform: ! useTransform } );
						} }
					/>
					<hr />
					<ToggleControl
						label="Autoplay"
						help={ autoplay ? 'Enable autoplay.' : 'Disable autoplay.' }
						checked={ autoplay }
						onChange={ () => {
							setAttributes( { autoplay: ! autoplay } );
						} }
					/>
					<hr />
					<ToggleControl
						label="Vertical"
						help={ vertical ? 'Enable vertical.' : 'Disable vertical.' }
						checked={ vertical }
						onChange={ () => {
							setAttributes( { vertical: ! vertical } );
						} }
					/>
					<hr />
					<ToggleControl
						label="Vertical Swiping"
						help={ verticalSwiping ? 'Enable verticalSwiping.' : 'Disable verticalSwiping.' }
						checked={ verticalSwiping }
						onChange={ () => {
							setAttributes( { verticalSwiping: ! verticalSwiping } );
						} }
					/>
					<hr />
					<ToggleControl
						label="Center Mode"
						help={ centerMode ? 'Enable centerMode.' : 'Disable centerMode.' }
						checked={ centerMode }
						onChange={ () => {
							setAttributes( { centerMode: ! centerMode } );
						} }
					/>
					<hr />
					<ToggleControl
						label="RTL"
						help={ rtl ? 'Enable rtl.' : 'Disable rtl.' }
						checked={ rtl }
						onChange={ () => {
							setAttributes( { rtl: ! rtl } );
						} }
					/>
				</PanelBody>
			</InspectorControls>

			<div className={ [ 'my-block', 'slider-container', 'slider-edit', className ].join( ' ' ) }>
				<div className="inner-wrap">
					<InnerBlocks
						template={ [ [ 'my-blocks/slider-item' ], [ 'my-blocks/slider-item' ] ] }
						//allowedBlocks={[['tm-blocks/tm-slider-item']]}
						renderAppender={ InnerBlocks.ButtonBlockAppender }
					/>
				</div>
			</div>
		</Fragment>
	);
};
const Save = ( { attributes, className, clientId } ) => {
	const {
		slidesToShow991,
		slidesToShow575,
		slideSpace,
		arrowStyle,
	} = attributes;
	let data = {
		slidesToShow: parseInt( attributes.slidesToShow ),
		slidesToScroll: parseInt( attributes.slidesToScroll ),
		arrows: attributes.arrows,
		dots: attributes.dots,
		fade: attributes.fade,
		adaptiveHeight: attributes.adaptiveHeight,
		variableWidth: attributes.variableWidth,
		autoplay: attributes.autoplay,
		vertical: attributes.vertical,
		verticalSwiping: attributes.verticalSwiping,
		rtl: attributes.rtl,
		centerMode: attributes.centerMode,
		useTransform: attributes.useTransform,
	};
	data = JSON.stringify( data );
	return (
		<div className={ [ 'my-block', 'slider-container', className ].join( ' ' ) }
			 data-slider-container={ data }
			 data-breakpoint-tablet={ slidesToShow991 }
			 data-breakpoint-mobile={ slidesToShow575 }
			 data-arrow-style={ arrowStyle }
			 style={ { '--items-space': slideSpace + 'px' } }
		>
			<div className="inner-wrap">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default registerBlockType( 'my-blocks/slider-container', {
	title: __( 'Slide Container' ),
	category: 'common',
	icon: 'slides',
	keywords: [
		__( 'slider' ),
		__( 'slide' ),
		__( 'aut' ),
	],
	supports: {
		align: [ 'full' ],
	},
	attributes: attr,

	edit: Edit,
	save: Save,
} );
