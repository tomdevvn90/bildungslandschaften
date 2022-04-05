//  Import CSS.
import './editor.scss';
import './style.scss';

import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import {
	InnerBlocks,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
	URLInput, URLInputButton,
} from '@wordpress/block-editor';
import { PanelBody, FocalPointPicker, ResponsiveWrapper, Spinner,
	ToggleControl, RangeControl,
	__experimentalConfirmDialog as ConfirmDialog,
	Button, Popover, Modal, TextControl, BaseControl,
} from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { useRef, useState } from '@wordpress/element';

const COLOR_DEFAULT = [
	{
		name: 'main',
		color: '#212529',
	},
	{
		name: 'second',
		color: '#1E5CFF',
	},
	{
		name: 'third',
		color: '#0F163A',
	},
	{
		name: 'white',
		color: '#fff',
	},
	{
		name: 'black',
		color: '#000',
	},
];

const ALLOWED_MEDIA_TYPES = [ 'image' ];
const attr = {
	bgID: {
		type: 'number',
	},
	bgUrl: {
		type: 'string',
	},
	align: {
		type: 'string',
		default: 'wide',
	},
	listSelectors: {
		type: 'array',
		default: [
			{ x: '50%', y: '50%', title: 'this title', link: '#', active: false },
		],
	},
	reverseColumn: {
		type: 'boolean',
		default: false,
	},
	hideButtonColumn: {
		type: 'boolean',
		default: false,
	},
};

const Edit = ( props ) => {
	const { attributes, setAttributes, className } = props;
	const { bgID, bgUrl, listSelectors, reverseColumn, hideButtonColumn } = attributes;
	const instructions = <p>{ __( 'To edit the background image, you need permission to upload media.' ) }</p>;
	const mapInnerEl = useRef( null );
	const mapImgWrapEl = useRef( null );
	const [ keyMove, setKeyMove ] = useState( null );
	console.log( listSelectors );

	const onRemoveItem = ( i )=>{
		const selectors = JSON.parse( JSON.stringify( listSelectors ) );
		const filteredItems = selectors.slice( 0, i ).concat( selectors.slice( i + 1, selectors.length ) );
		setAttributes( { listSelectors: filteredItems } );
	};
	const onChangeContent = ( i, key, value )=>{
		const selectors = JSON.parse( JSON.stringify( listSelectors ) );
		selectors[ i ][ key ] = value;
		setAttributes( { listSelectors: selectors } );
	};
	const mapEventPointerDrag = ( e )=>{
		if ( keyMove == null ) {
			return;
		}
		const rect = mapImgWrapEl.current.getBoundingClientRect();
		const w = rect.width;
		const h = rect.height;
		const x = e.clientX - rect.left; //x position within the element.
		const y = e.clientY - rect.top; //y position within the element.
		const selectors = JSON.parse( JSON.stringify( listSelectors ) );
		selectors[ keyMove ].x = `${ ( x / w * 100 ) }%`;
		selectors[ keyMove ].y = `${ ( y / h * 100 ) }%`;
		setAttributes( { listSelectors: selectors } );
	};
	const mapEventCloseDragPointer = ( e )=>{
		mapInnerEl.current.onmouseup = null;
		mapInnerEl.current.onmousemove = null;
		setKeyMove( null );
	};
	const mapEventPointerMouseDown = ( e, i )=>{
		e.preventDefault();
		//e.stopPropagation();
		setKeyMove( i );
	};
	const mapEventClick = ( e )=>{
		e.preventDefault();
		const rect = e.target.getBoundingClientRect();
		const w = rect.width;
		const h = rect.height;
		const x = e.clientX - rect.left; //x position within the element.
		const y = e.clientY - rect.top; //y position within the element.
		const selectors = JSON.parse( JSON.stringify( listSelectors ) );
		selectors.push( { x: `${ ( x / w * 100 ) }%`, y: `${ ( y / h * 100 ) }%`, title: 'this title', link: '#', active: false } );
		setAttributes( { listSelectors: selectors } );
	};
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					initialOpen={ false }
					title={ __( 'General Settings' ) }>
					<ToggleControl
						label="Reverse Column"
						checked={ reverseColumn }
						onChange={ () => setAttributes( { reverseColumn: ! reverseColumn } ) }
					/>
					<ToggleControl
						label="Hide Button Column"
						checked={ hideButtonColumn }
						onChange={ () => setAttributes( { hideButtonColumn: ! hideButtonColumn } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Setting Items' ) } initialOpen={ false }>
					{ listSelectors.length > 0 && (
						<div className="edit-selectors">
							{ listSelectors.map( ( e, i )=>{
								return (
									<div key={ 'poed-' + i } className="__pointer-edit">
										<TextControl
											label={ 'Title item ' + ( i + 1 ) }
											value={ e.title }
											onChange={ ( value ) => onChangeContent( i, 'title', value ) }
										/>
										<BaseControl
											label={ 'Url item ' + ( i + 1 ) }
										>
											<URLInput
												value={ e.link }
												onChange={ ( value ) => onChangeContent( i, 'link', value ) }
												autoFocus={ false }
												isFullWidth
												hasBorder
											/>
										</BaseControl>
										<ToggleControl
											label="Active Item"
											checked={ e.active }
											onChange={ () => onChangeContent( i, 'active', ! e.active ) }
										/>
										<Button isDestructive isSmall onClick={ ()=>onRemoveItem( i ) }>Remove</Button>
										<hr />
									</div>
								);
							} ) }
						</div>
					) }
				</PanelBody>
				<PanelBody title={ __( 'Map Image' ) }>
					<div className="components-placeholder__fieldset">
						<MediaUploadCheck fallback={ instructions }>
							<MediaUpload
								title={ __( 'Map Image' ) }
								onSelect={ ( media ) => (
									setAttributes( {
										bgID: media.id,
										bgUrl: media.url,
									} )
								) }
								allowedTypes={ ALLOWED_MEDIA_TYPES }
								value={ bgID }
								render={ ( { open } ) => (
									<Button
										className={ ! bgID ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview' }
										onClick={ open }>
										{ ! bgID && ( __( 'Change Map Image' ) ) }
										{ !! bgID && ! bgUrl && <Spinner /> }
										{ !! bgID && bgUrl &&
										<img src={ bgUrl } alt={ __( 'Map image' ) } />
										}
									</Button>
								) }
							/>
						</MediaUploadCheck>
						{ !! bgID && bgUrl &&
							<MediaUploadCheck>
								<MediaUpload
									title={ __( 'Map Image' ) }
									onSelect={ ( media ) => (
										setAttributes( {
											bgID: media.id,
											bgUrl: media.url,
										} )
									) }
									allowedTypes={ ALLOWED_MEDIA_TYPES }
									value={ bgID }
									render={ ( { open } ) => (
										<Button onClick={ open } isSecondary>
											{ __( 'Replace Image' ) }
										</Button>
									) }
								/>
							</MediaUploadCheck>
						}
						{ !! bgID &&
							<MediaUploadCheck>
								<Button onClick={ () => (
									setAttributes( {
										bgID: undefined,
										bgUrl: '',
									} )
								) } isDestructive>
									{ __( 'Remove Image' ) }
								</Button>
							</MediaUploadCheck>
						}
					</div>
				</PanelBody>
			</InspectorControls>
			<div className={ [
				'bild-map-selector-block',
				'block-editor',
				hideButtonColumn ? '__hide-button' : '',
				reverseColumn ? '__reverse-column' : '',
				className ].join( ' ' ) }
			>
				<div className="map-selector-wrap">
					<div className="map-inner" ref={ mapInnerEl }
						onMouseMove={ mapEventPointerDrag }
						onMouseUp={ mapEventCloseDragPointer }
					>
						<div ref={ mapImgWrapEl } className="img-wrap" onClick={ mapEventClick }>
							<img className="img-selector" src={ bgUrl } alt="img map" />
						</div>
						{ listSelectors.length > 0 && (
							<div className="pointer-selectors">
								{ listSelectors.map( ( e, i )=>{
									return (
										<div key={ 'po-' + i } title={ e.title }
											style={ { '--x': e.x, '--y': e.y } } //onClick={ openModal }
											onMouseDown={ ( event )=>mapEventPointerMouseDown( event, i ) }
											className={ [ '__pointer', e.active ? '__active' : '' ].join( ' ' ) }>{ i + 1 }</div>
									);
								} ) }
							</div>
						) }
					</div>
				</div>
				{
					! hideButtonColumn &&
					<div className="info-wrap">
						<div className="btn-info-map-selector">
							<a className="bild-btn" href="#" rel="noopener noreferrer" target="_blank">
								<span className="bild-btn-text">Info Map Button</span>
								<span className="__icon">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.25 87.68"><g><path fill="transparent" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" d="m.71.71 43.13 43.13L.71 86.97" /></g></svg>
								</span>
							</a>
						</div>
					</div>
				}
			</div>
		</Fragment>
	);
};

registerBlockType( 'bild-block/bild-map-selector', {
	category: 'common',
	title: 'Map selector - Bild Block',
	icon: 'shield',
	attributes: attr,
	keywords: [ __( 'map' ), __( 'selector' ), __( 'bild' ) ],
	supports: {
		align: [ 'full', 'wide' ],
	},
	save: ( { attributes, className } ) => {
		const { bgUrl, listSelectors, reverseColumn, hideButtonColumn } = attributes;

		return (
			<div className={ [
				'bild-map-selector-block',
				hideButtonColumn ? '__hide-button' : '',
				reverseColumn ? '__reverse-column' : '',
				className ].join( ' ' ) } >
				<div className="map-selector-wrap">
					<div className="map-inner">
						<div className="img-wrap" >
							<img className="img-selector" src={ bgUrl } alt="img map" />
						</div>
						{ listSelectors.length > 0 && (
							<div className="pointer-selectors">
								{ listSelectors.map( ( e, i )=>{
									return (
										<div key={ 'po-' + i } data-map={ JSON.stringify( e ) }
											title={ e.title } style={ { '--x': e.x, '--y': e.y } }
											className={ [ '__pointer', e.active ? '__active' : '' ].join( ' ' ) }>{ i + 1 }</div>
									);
								} ) }
							</div>
						) }
					</div>
				</div>
				{
					! hideButtonColumn &&
					<div className="info-wrap">
						<div className="btn-info-map-selector">
							<a className="bild-btn" href="#" rel="noopener noreferrer" target="_blank">
								<span className="bild-btn-text">Info Map Button</span>
								<span className="__icon">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.25 87.68"><g><path
										fill="transparent" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2"
										d="m.71.71 43.13 43.13L.71 86.97" /></g></svg>
								</span>
							</a>
						</div>
					</div>
				}
			</div>
		);
	},
	edit: ( Edit ),
} );
