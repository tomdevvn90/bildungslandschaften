/**
 * BLOCK: Grid Block
 */

import './editor.scss';
import './style.scss';
import './grid-item';

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

const attr = {
	align: {
		type: 'string',
		default: '',
	},
	cols: {
		type: 'number',
		default: 3,
	},
	colsTablet: {
		type: 'number',
		default: 2,
	},
	colsMobile: {
		type: 'number',
		default: 1,
	},
	gridGap: {
		type: 'string',
		default: '30px',
	},
};

const Edit = ( props ) => {
	const { attributes, setAttributes, className, setState } = props;
	const {
		cols,
		colsTablet,
		colsMobile,
		gridGap,
	} = attributes;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Grid Setting' ) }>
					<label>Grid column</label>
					<NumberControl
						isShiftStepEnabled={ true }
						onChange={ ( cols ) => {
							setAttributes( { cols: parseInt( cols ) } );
						} }
						min={ 1 }
						shiftStep={ 10 } value={ cols }
					/>
					<hr />
					<label>Grid column Tablet(768px -> 991px)</label>
					<NumberControl
						isShiftStepEnabled={ true }
						onChange={ ( colsTablet ) => {
							setAttributes( { colsTablet: parseInt( colsTablet ) } );
						} }
						min={ 1 }
						shiftStep={ 10 } value={ colsTablet }
					/>
					<hr />
					<label>Grid column Mobile(0 -> 767px)</label>
					<NumberControl
						isShiftStepEnabled={ true }
						onChange={ ( colsMobile ) => {
							setAttributes( { colsMobile: parseInt( colsMobile ) } );
						} }
						min={ 1 }
						shiftStep={ 10 } value={ colsMobile }
					/>
					<hr />
					<TextControl
						label={ __( 'Grid gap' ) }
						help={ __( 'Space between items' ) }
						value={ gridGap }
						onChange={ ( gridGap ) => {
							setAttributes( { gridGap } );
						} }
					/>
				</PanelBody>
			</InspectorControls>

			<div className={ [ 'my-block', 'grid-container', 'grid-edit', className ].join( ' ' ) }
				 style={ {
					 '--cols': `calc(${ parseInt( cols ) })`,
					 '--cols-tablet': `calc(${ parseInt( colsTablet ) })`,
					 '--cols-mobile': `calc(${ parseInt( colsMobile ) })`,
					 '--grid-gap': gridGap,
				 } }>
				<div className="inner-wrap">
					<InnerBlocks
						template={ [ [ 'my-block/grid-item' ], [ 'my-block/grid-item' ], [ 'my-block/grid-item' ] ] }
						allowedBlocks={ [ [ 'my-block/grid-item' ] ] }
						renderAppender={ InnerBlocks.ButtonBlockAppender }
					/>
				</div>
			</div>
		</Fragment>
	);
};
const Save = ( { attributes, className, clientId } ) => {
	const {
		cols,
		colsTablet,
		colsMobile,
		gridGap,
	} = attributes;
	return (
		<div className={ [ 'my-block', 'grid-container', className ].join( ' ' ) }
			 style={ {
				 '--cols': `calc(${ parseInt( cols ) })`,
				 '--cols-tablet': `calc(${ parseInt( colsTablet ) })`,
				 '--cols-mobile': `calc(${ parseInt( colsMobile ) })`,
				 '--grid-gap': gridGap,
			 } }
		>
			<div className="inner-wrap">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default registerBlockType( 'my-block/grid-container', {
	title: __( 'Grid Container' ),
	category: 'aut-blocks',
	icon: 'grid-view',
	keywords: [
		__( 'grid' ),
		__( 'column' ),
		__( 'aut' ),
	],
	supports: {
		align: [ 'full' ],
	},
	attributes: attr,

	edit: Edit,
	save: Save,
} );
