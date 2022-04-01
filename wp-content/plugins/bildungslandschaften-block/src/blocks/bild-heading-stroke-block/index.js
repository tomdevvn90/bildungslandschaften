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
		'core/heading',
		{
			level: 3,
			placeholder: 'Heading...',
			content: 'Heading Stroke Block...',
			className: '',
			textAlign: 'center',
			style: { typography: { fontSize: '60px' }, color: { text: '#7ebfcc' } },
		},
	],
];

registerBlockType( 'cgb/heading-stroke-block', {
	title: __( 'Heading Stroke Block' ), // Block title.
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'stroke' ),
		__( 'heading' ),
		__( 'block' ),
	],
	supports: {
		align: [ 'full' ],
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

				<div className={ [ className, 'heading-stroke-block' ].join( ' ' ) }>
					<InnerBlocks template={ TEMPLATE } templateLock='all' />
				</div>
			</Fragment>
		);
	},
	save: ( { className } ) => {
		return (
			<div className={ [ className, 'heading-stroke-block' ].join( ' ' ) }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
