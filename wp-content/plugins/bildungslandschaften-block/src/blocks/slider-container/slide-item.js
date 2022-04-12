/**
 * BLOCK: tm Slider Block
 */

import './editor.scss';
import './style.scss';

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
	TextareaControl,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';

const attr = {};

const Edit = ( props ) => {
	const { attributes, setAttributes, className, setState } = props;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'General Setting' ) }>

				</PanelBody>
			</InspectorControls>

			<div className={ [ 'slider-item', className ].join( ' ' ) }>
				<div className="slider-item-inner">
					<InnerBlocks
						template={ [
							[ 'core/paragraph', { placeholder: 'Slide item...' } ],
						] } />
				</div>
			</div>
		</Fragment>
	);
};
const Save = ( { attributes, className, clientId } ) => {
	return (
		<div className={ [ 'slider-item', className ].join( ' ' ) }>
			<div className="slider-item-inner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default registerBlockType( 'my-blocks/slider-item', {
	title: __( 'Slide Item' ),
	category: 'common',
	icon: 'shield',
	keywords: [
		__( 'slider' ),
		__( 'slide' ),
		__( 'aut' ),
	],
	parent: [ 'my-blocks/slider-container' ],
	attributes: attr,

	edit: Edit,
	save: Save,
} );
