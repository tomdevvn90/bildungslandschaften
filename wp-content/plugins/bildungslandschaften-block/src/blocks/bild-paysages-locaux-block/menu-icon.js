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

const attr = {
	menuText: {
		type: 'string',
		default: 'Carte',
	},
	menuLink: {
		type: 'string',
		default: '#',
	},
	iconMap: {
		type: 'boolean',
		default: true,
	},
};

const Edit = ( props ) => {
	const { attributes, setAttributes, className, setState } = props;
	const {
		menuText,
		menuLink,
		iconMap,
	} = attributes;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'General' ) }>
					<ToggleControl
						label="Icon map"
						checked={ iconMap }
						onChange={ () => setAttributes( { iconMap: ! iconMap } ) }
					/>
					<TextControl
						label="Menu Text"
						value={ menuText }
						onChange={ ( text ) => setAttributes( { menuText: text } ) }
					/>
					<TextControl
						label="Menu Link"
						value={ menuLink }
						onChange={ ( link ) => setAttributes( { menuLink: link } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div className={ [ 'bild-block', 'bild-locaux-menu-icon', iconMap ? '__icon-map' : '__icon-list', className ].join( ' ' ) }>
				<a className="menu-icon" href={ menuLink }>
					<span>{ menuText }</span>
				</a>
			</div>
		</Fragment>
	);
};
const Save = ( { attributes, className, clientId } ) => {
	const { menuText, menuLink, iconMap } = attributes;
	return (
		<div className={ [ 'bild-block', 'bild-locaux-menu-icon', iconMap ? '__icon-map' : '__icon-list', className ].join( ' ' ) }>
			<a className="menu-icon" href={ menuLink }>
				<span>{ menuText }</span>
			</a>
		</div>
	);
};

export default registerBlockType( 'bild-block/bild-locaux-menu-button-block', {
	title: __( 'Locaux Menu Button' ),
	category: 'common',
	icon: 'shield',
	keywords: [
		__( 'locaux' ),
		__( 'local' ),
		__( 'landscapes' ),
		__( 'item' ),
		__( 'paysages' ),
		__( 'bild' ),
		__( 'menu' ),
	],
	attributes: attr,

	edit: Edit,
	save: Save,
} );
