/**
 * BLOCK: Grid Block
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

const TEMPLATE = [
	[ 'core/heading', {
		level: 3,
		placeholder: 'File name...',
		content: 'File name',
	} ],
];

const instructions = <p>{ __( 'To edit the background image, you need permission to upload media.' ) }</p>;

const attr = {
	fileUrl: {
		type: 'string',
		default: '#',
	},
	fileID: {
		type: 'number',
		default: '',
	},
};

const Edit = ( props ) => {
	const { attributes, setAttributes, className, setState } = props;
	const {
		fileUrl,
		fileID,
	} = attributes;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'File' ) }>
					<TextControl label="Link file" value={ fileUrl } onChange={ ( fileUrl )=>setAttributes( { fileUrl } ) } />
					<div className="components-placeholder__fieldset">
						<MediaUploadCheck fallback={ instructions }>
							<MediaUpload
								title={ __( 'File' ) }
								onSelect={ ( media ) => (
									setAttributes( {
										fileID: media.id,
										fileUrl: media.url,
									} )
								) }
								value={ fileID }
								render={ ( { open } ) => (
									<Button isSecondary onClick={ open }>Select file</Button>
								) }
							/>
						</MediaUploadCheck>
					</div>
				</PanelBody>
			</InspectorControls>

			<div className={ [ 'bild-block', 'bild-item-download', 'block-edit', className ].join( ' ' ) }>
				<div className="inner-item">
					<div className="icon-wrap">
						<span className="inner-icon">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.25 87.68">
								<g data-name="Layer 2">
									<path fill="transparent" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" d="m.71.71 43.13 43.13L.71 86.97" />
								</g>
							</svg>
						</span>
					</div>
					<div className="file-name">
						<InnerBlocks template={ TEMPLATE } templateLock="all" />
					</div>
				</div>
			</div>
		</Fragment>
	);
};
const Save = ( { attributes, className, clientId } ) => {
	const { fileUrl } = attributes;
	return (
		<div className={ [ 'bild-block', 'bild-item-download', className ].join( ' ' ) }>
			<a className="inner-item" href={ fileUrl || '#' }>
				<div className="icon-wrap">
					<span className="inner-icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.25 87.68">
							<g data-name="Layer 2">
								<path fill="transparent" stroke="currentColor" stroke-miterlimit="10" stroke-width="2" d="m.71.71 43.13 43.13L.71 86.97" />
							</g>
						</svg>
					</span>
				</div>
				<div className="file-name">
					<InnerBlocks.Content />
				</div>
			</a>
		</div>
	);
};

export default registerBlockType( 'bild-block/item-download', {
	title: __( 'Item Download' ),
	category: 'common',
	icon: 'shield',
	keywords: [
		__( 'download' ),
		__( 'item' ),
		__( 'bild' ),
	],
	//supports: {
	//	align: ['full']
	//},
	attributes: attr,

	edit: Edit,
	save: Save,
} );
