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
		placeholder: 'Your name...',
		content: 'Your name',
		className: 'card-item-people-name',
	} ],
	[ 'core/paragraph', {
		content: '<strong>Position</strong>',
		style: {
			typography: {},
			color: { text: '#7DBECB' },
		},
	} ],
	[ 'core/paragraph', {
		content: 'email@gmail.com',
		style: {
			typography: {},
			color: { text: '#7DBECB' },
		},
	} ],
];

const instructions = <p>{ __( 'To edit the background image, you need permission to upload media.' ) }</p>;

const attr = {
	imgUrl: {
		type: 'string',
		default: 'https://via.placeholder.com/300x300?text=1:1',
	},
	imgID: {
		type: 'number',
		default: 0,
	},
};

const Edit = ( props ) => {
	const { attributes, setAttributes, className, setState } = props;
	const {
		imgUrl,
		imgID,
	} = attributes;
	console.log( attributes );

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Image' ) }>
					<div className="components-placeholder__fieldset">
						<MediaUploadCheck fallback={ instructions }>
							<MediaUpload
								title={ __( 'Image' ) }
								onSelect={ ( media ) => (
									setAttributes( {
										imgID: media.id,
										imgUrl: media.url,
									} )
								) }
								allowedTypes={ [ 'image' ] }
								value={ imgID }
								render={ ( { open } ) => (
									<Button
										className={ ! imgID ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview editor-post-featured-image-container' }
										onClick={ open }>
										{ ! imgID && ( __( 'Change Imgae' ) ) }
										{ !! imgID && ! imgUrl && <Spinner /> }
										{ !! imgID && imgUrl &&
										<ResponsiveWrapper
											naturalWidth="500"
											naturalHeight="400"
										>
											<img src={ imgUrl } alt={ __( 'Image' ) } />
										</ResponsiveWrapper>
										}
									</Button>
								) }
							/>
						</MediaUploadCheck>
						{ !! imgID &&
						<MediaUploadCheck>
							<MediaUpload
								title={ __( 'Image' ) }
								onSelect={ ( media ) => (
									setAttributes( {
										imgID: media.id,
										imgUrl: media.url,
									} )
								) }
								allowedTypes={ [ 'image' ] }
								value={ imgID }
								render={ ( { open } ) => (
									<Button onClick={ open } isSecondary>
										{ __( 'Replace Image' ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
						}
						{ !! imgID &&
						<MediaUploadCheck>
							<Button onClick={ () => (
								setAttributes( {
									imgID: undefined,
									imgUrl: '',
								} )
							) } isDestructive>
								{ __( 'Remove Image' ) }
							</Button>
						</MediaUploadCheck>
						}
					</div>
				</PanelBody>
			</InspectorControls>

			<div className={ [ 'bild-block', 'bild-card-item-people', 'block-edit', className ].join( ' ' ) }>
				<div className="inner-card">
					<div className="img-wrap">
						<MediaUploadCheck fallback={ instructions }>
							<MediaUpload
								title={ __( 'Image' ) }
								onSelect={ ( media ) => (
									setAttributes( {
										imgID: media.id,
										imgUrl: media.url,
									} )
								) }
								allowedTypes={ [ 'image' ] }
								value={ imgID }
								render={ ( { open } ) => (
									<Button
										onClick={ open }>
										{ !! imgID && ! imgUrl && <Spinner /> }
										{ imgUrl && <img src={ imgUrl } alt={ __( 'Image' ) } /> }
									</Button>
								) }
							/>
						</MediaUploadCheck>
					</div>
					<div className="card-content">
						<InnerBlocks template={ TEMPLATE } />
					</div>
				</div>
			</div>
		</Fragment>
	);
};
const Save = ( { attributes, className, clientId } ) => {
	const { imgUrl } = attributes;
	return (
		<div className={ [ 'bild-block', 'bild-card-item-people', className ].join( ' ' ) }>
			<div className="inner-card">
				<div className="img-wrap">
					<img src={ imgUrl } alt="icon" />
				</div>
				<div className="card-content">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
};

export default registerBlockType( 'bild-block/card-item-people', {
	title: __( 'Card People' ),
	category: 'common',
	icon: 'shield',
	keywords: [
		__( 'card' ),
		__( 'item' ),
		__( 'people' ),
		__( 'bild' ),
	],
	//supports: {
	//	align: ['full']
	//},
	attributes: attr,

	edit: Edit,
	save: Save,
} );
