//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
import { Fragment } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import { ToggleControl, TextControl, PanelBody, RangeControl, SelectControl } from '@wordpress/components';
import { InspectorControls, InnerBlocks } from '@wordpress/block-editor';

const { serverSideRender: ServerSideRender } = wp;
const TEMPLATE = [
	[
		'core/video',
		{
			src: '',
		},
	],
];

registerBlockType( 'cgb/custom-video-block', {
	title: __( 'Custom Video Block' ), // Block title.
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'video' ),
		__( 'vimeo' ),
		__( 'youtube' ),
		__( 'block' ),
	],
	supports: {
		align: [ 'full', 'wide' ],
	},
	attributes: {
		align: {
			type: 'string',
			default: 'wide',
		},
	},
	edit: ( props ) => {
		const { attributes, setAttributes, className, clientId } = props;
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'General' ) }
						initialOpen={ false }>
						{ /*<TextControl*/ }
						{ /*	value={ title }*/ }
						{ /*	label="Heading"*/ }
						{ /*	onChange={ ( title ) => setAttributes( { title } ) }*/ }
						{ /*/> */ }
					</PanelBody>
				</InspectorControls>

				<div className={ [ className, 'custom-video-block' ].join( ' ' ) }>
					<div className="bg"></div>
					<div className="video-wrap">
						<InnerBlocks template={ TEMPLATE } />
					</div>
				</div>
			</Fragment>
		);
	},
	save: ( { className } ) => {
		return (
			<div className={ [ className, 'custom-video-block' ].join( ' ' ) }>
				<div className="bg"></div>
				<div className="video-wrap">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
