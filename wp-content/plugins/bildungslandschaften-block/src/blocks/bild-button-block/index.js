/**
 * BLOCK: Main Slide
 */
import './style.scss';
import './editor.scss';
import './button-item';

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Fragment } from '@wordpress/element';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

const ALLOWED_CHILDREN_BLOCKS = [ 'bild-block/bild-button-item' ];

const isLayout = ( layout )=>{
	const {
		type = 'flex',
		justifyContent = 'left',
		orientation = 'horizontal',
		flexWrap = 'wrap',
	} = layout;
	const hor = orientation === 'horizontal';
	let justify;
	switch ( justifyContent ) {
		case 'left':
			justify = 'flex-start';
			break;
		case 'right':
			justify = 'flex-end';
			break;
		default:
			justify = justifyContent;
	}
	return {
		'--is-type': type,
		'--is-justify-content': hor ? justify : 'initial',
		'--is-orientation': hor ? 'row' : 'column',
		'--is-flex-wrap': flexWrap,
		'--is-align-items': hor ? 'center' : justify,
		width: ( hor && justifyContent === 'space-between' ) ? '100%' : 'auto',
	};
};
registerBlockType( 'bild-block/bild-button', {
	title: __( 'Button - Bild Blocks' ),
	description: __( 'Prompt visitors to take action with a button-style link.' ),
	icon: 'button',
	category: 'common',
	keywords: [ __( 'button' ), __( 'Bild' ), __( 'link' ) ],
	supports: {
		//align: [ 'left', 'center', 'right' ],
		anchor: true,
		align: [ 'wide', 'full' ],
		__experimentalExposeControlsToChildren: true,
		spacing: {
			blockGap: true,
			margin: [ 'top', 'bottom' ],
			__experimentalDefaultControls: {
				blockGap: true,
			},
		},
		__experimentalLayout: {
			allowSwitching: false,
			allowInheriting: false,
			default: {
				type: 'flex',
			},
		},
	},
	attributes: {
		layout: {
			type: 'object',
			default: {
				type: 'flex',
				justifyContent: 'left',
				orientation: 'horizontal',
				flexWrap: 'wrap',
			},
		},
	},
	edit: ( props ) => {
		const { attributes, setAttributes, className, clientId } = props;
		const { layout } = attributes;
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'General' ) }>
					</PanelBody>
				</InspectorControls>
				<div style={ isLayout( layout ) } className={ [ 'bild-block--buttons', 'block-editor', className ].join( ' ' ) }>
					<InnerBlocks
						template={ [ ALLOWED_CHILDREN_BLOCKS ] }
						allowedBlocks={ ALLOWED_CHILDREN_BLOCKS }
					/>
				</div>
			</Fragment>
		);
	},
	save: ( props ) => {
		const { attributes, className, clientId } = props;
		const { layout } = attributes;
		return (
			<div style={ isLayout( layout ) } className={ [ 'bild-block--buttons', className ].join( ' ' ) }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
