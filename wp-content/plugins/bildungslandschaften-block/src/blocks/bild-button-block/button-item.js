import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Fragment, useEffect } from '@wordpress/element';
import {
	InspectorControls,
	RichText,
	PanelColorSettings,
	URLInput,
} from '@wordpress/block-editor';
import { ToggleControl, PanelBody, RadioControl, BaseControl } from '@wordpress/components';

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

const BlockAttrs = {
	textButton: {
		type: 'string',
		default: 'Button text',
	},
	openNewTab: {
		type: 'boolean',
		default: false,
	},
	urlButton: {
		type: 'string',
		default: '#',
	},
	showIconArrow: {
		type: 'boolean',
		default: true,
	},
	fullWidth: {
		type: 'boolean',
		default: false,
	},
	// fullwidth: {
	// 	type: 'boolean',
	// 	default: false,
	// },
	// colorText: {
	// 	type: 'string',
	// },
	// colorBg: {
	// 	type: 'string',
	// },
	// colorTextHover: {
	// 	type: 'string',
	// },
	// colorBgHover: {
	// 	type: 'string',
	// },
	// transparentBtn: {
	// 	type: 'boolean',
	// 	default: false,
	// },
};

const Edit = ( props ) => {
	const { attributes, setAttributes, isSelected, className, clientId } = props;
	//console.log(props)
	const { openNewTab, urlButton, textButton, showIconArrow, fullWidth } = attributes;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'General', 'block' ) }>
					<ToggleControl
						label={ __( 'Show arrow icon', 'block' ) }
						checked={ showIconArrow }
						onChange={ () => setAttributes( { showIconArrow: ! showIconArrow } ) }
					/>
					<ToggleControl
						label={ __( 'Buton fullwidth', 'block' ) }
						checked={ fullWidth }
						onChange={ () => setAttributes( { fullWidth: ! fullWidth } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Button link', 'block' ) }>
					<BaseControl
						label={ [
							__( 'Link URL', 'block' ),
							( urlButton && <a href={ urlButton || '#' } key="link_url" target="_blank" style={ { float: 'right' } } rel="noreferrer">
								{ __( 'Preview', 'block' ) }
							</a> ),
						] }
					>
						<URLInput
							value={ urlButton }
							onChange={ ( value ) => setAttributes( { urlButton: value } ) }
							autoFocus={ false }
							isFullWidth
							hasBorder
						/>
					</BaseControl>
					<ToggleControl
						label={ __( 'Open in new tab', 'block' ) }
						checked={ !! openNewTab }
						onChange={ () => setAttributes( { openNewTab: ! openNewTab } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div className={ [ 'bild-button-item-block', 'block-editor', fullWidth ? '__is-fullwidth' : '', className ].join( ' ' ) }>
				<span className="bild-btn">
					<RichText
						tagName="span"
						className="bild-btn-text"
						value={ textButton }
						allowedFormats={ [ 'core/bold', 'core/italic', 'core/strikethrough' ] }
						onChange={ ( value ) => setAttributes( { textButton: value } ) }
						placeholder={ __( 'Button text' ) }
					/>
					{ showIconArrow &&
					<span className="__icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.25 87.68"><g><path fill="transparent" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" d="m.71.71 43.13 43.13L.71 86.97" /></g></svg>
					</span>
					}
				</span>
			</div>
		</Fragment>
	);
};

export default registerBlockType( 'bild-block/bild-button-item', {
	title: __( 'Button Item ' ),
	description: __( 'Prompt visitors to take action with a button-style link.' ),
	icon: 'button',
	category: 'common',
	keywords: [ __( 'button' ), __( 'tm' ), __( 'link' ) ],
	attributes: BlockAttrs,
	example: {
	},
	parent: [ 'bild-block/bild-button' ],
	// styles: [
	// 	{ name: 'solid', label: 'Solid', isDefault: true },
	// 	{ name: 'outline', label: 'Outline' },
	// ],
	edit: Edit,
	save: function( props ) {
		const { attributes, className } = props;
		const {
			openNewTab, urlButton, textButton, showIconArrow, fullWidth,
		} = attributes;

		return (
			<div className={ [ 'bild-button-item-block', fullWidth ? '__is-fullwidth' : '', className ].join( ' ' ) }>
				<a className="bild-btn"
					href={ urlButton }
					rel="noopener noreferrer"
					target={ openNewTab ? '_blank' : '_self' }
				>
					<RichText.Content
						tagName="span"
						className="bild-btn-text"
						value={ textButton }
					/>
					{ showIconArrow &&
					<span className="__icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.25 87.68"><g><path fill="transparent" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" d="m.71.71 43.13 43.13L.71 86.97" /></g></svg>
					</span>
					}
				</a>
			</div>
		);
	},
} );
