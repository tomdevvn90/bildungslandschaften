//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
import { Fragment } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import { ToggleControl, TextControl, PanelBody, RangeControl, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

const { serverSideRender: ServerSideRender } = wp;
registerBlockType( 'cgb/fancy-card-block', {
	title: __( 'Fancy Card Block - Bild Block' ), // Block title.
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'fancy' ),
		__( 'card' ),
		__( 'block' ),
		__( 'create-guten-block' ),
	],
	edit: ( props ) => {
		const { attributes, setAttributes, className, clientId } = props;
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'General' ) }>
						{ /*<TextControl*/ }
						{ /*	value={ title }*/ }
						{ /*	label="Heading"*/ }
						{ /*	onChange={ ( title ) => setAttributes( { title } ) }*/ }
						{ /*/> */ }
					</PanelBody>
				</InspectorControls>

				<ServerSideRender
					className={ 'block-server-render' }
					block="cgb/fancy-card-block"
					attributes={ attributes }
				/>
				{/*<div className='text-center'><strong>Preview block on front-end</strong></div>*/}
			</Fragment>
		);
	},
	save: () => {
		return null;
	},
} );
