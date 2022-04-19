/* eslint-disable react/no-unknown-property */
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
	SelectControl,
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
		default: 'data:image/png;base64,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',
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
	changeView: {
		type: 'boolean',
		default: false,
	},
	defaultView: {
		type: 'string',
		default: 'map',
	},
	pointerType: {
		type: 'string',
		default: 'default',
	},
};

const Edit = ( props ) => {
	const { attributes, setAttributes, className } = props;
	const { bgID, bgUrl, listSelectors, reverseColumn, hideButtonColumn, changeView, defaultView, pointerType } = attributes;
	const instructions = <p>{ __( 'To edit the background image, you need permission to upload media.' ) }</p>;
	const mapInnerEl = useRef( null );
	const mapImgWrapEl = useRef( null );
	const [ keyMove, setKeyMove ] = useState( null );
	//console.log( listSelectors );

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
					title={ __( 'General Settings' ) }>
					<ToggleControl
						label="Change View"
						checked={ changeView }
						onChange={ () => setAttributes( { changeView: ! changeView } ) }
					/>
					{ changeView &&
						<SelectControl
							label="Default view"
							value={ defaultView }
							options={ [
								{ label: 'Map', value: 'map' },
								{ label: 'List', value: 'list' },
							] }
							onChange={ ( value ) => setAttributes( { defaultView: value } ) }
						/>
					}
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
					<SelectControl
						label="Pointer Type"
						value={ pointerType }
						options={ [
							{ label: 'Default', value: 'default' },
							{ label: 'Style 1', value: 'type-1' },
						] }
						onChange={ ( value ) => setAttributes( { pointerType: value } ) }
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
				pointerType !== 'default' ? '__pointer-' + pointerType : '',
				className ].join( ' ' ) }
			>
				{ changeView &&
				<div className={ [ 'bild-view-menu-icon', defaultView === 'map' ? '__icon-map' : '__icon-list' ].join( ' ' ) }>
					<a className="menu-icon" href="#">
						<span>{ defaultView === 'map' ? 'Liste' : 'Carte' }</span>
					</a>
				</div> }
				<div className="block-inner">
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
									<span className="bild-btn-text">{ listSelectors.length > 0 ? listSelectors[ 0 ].title : 'Info Map Button' }</span>
									<span className="__icon">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.25 87.68"><g><path fill="transparent" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" d="m.71.71 43.13 43.13L.71 86.97" /></g></svg>
									</span>
								</a>
							</div>
						</div>
					}
				</div>
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
		const { bgUrl, listSelectors, reverseColumn, hideButtonColumn, defaultView, changeView, pointerType } = attributes;

		return (
			<div className={ [
				'bild-map-selector-block',
				hideButtonColumn ? '__hide-button' : '',
				reverseColumn ? '__reverse-column' : '',
				defaultView ? '__view-' + defaultView : '',
				pointerType !== 'default' ? '__pointer-' + pointerType : '',
				className ].join( ' ' ) } >
				{ changeView &&
				<div className={ [ 'bild-view-menu-icon', defaultView === 'map' ? '__icon-list' : '__icon-map' ].join( ' ' ) }>
					<a className="menu-icon" href="#">
						<span>{ defaultView === 'map' ? 'Liste' : 'Carte' }</span>
					</a>
				</div>
				}
				<div className="block-inner">
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
				{ changeView &&
				<div className="map-list-view">
					{ listSelectors.length > 0 && (
						listSelectors.map( ( e, i )=>{
							return (
								<div key={ 'po-l-' + i } data-map={ JSON.stringify( e ) } title={ e.title } className={ [ '__list-item', e.active ? '__active' : '' ].join( ' ' ) }>
									<a className="bild-btn" href={ e.link } >
										<span className="bild-btn-text">{ e.title }</span>
										<span className="__icon">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.25 87.68">
												<g><path fill="transparent" stroke="currentColor" stroke-miterlimit="10" stroke-width="2" d="m.71.71 43.13 43.13L.71 86.97" /></g>
											</svg>
										</span>
									</a>
								</div>
							);
						} )
					) }
				</div>
				}
			</div>
		);
	},
	edit: ( Edit ),
} );
