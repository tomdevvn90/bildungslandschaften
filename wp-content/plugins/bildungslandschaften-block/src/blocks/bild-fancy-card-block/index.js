//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
import { Fragment } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import { ToggleControl, TextControl, PanelBody, RangeControl, SelectControl,
	__experimentalNumberControl as NumberControl } from '@wordpress/components';
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
	attributes: {
		numberCard: {
			type: 'number',
			default: 7,
		} },
	edit: ( props ) => {
		const { attributes, setAttributes, className, clientId } = props;
		const { numberCard } = attributes;
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'General' ) }>
						<NumberControl
							isShiftStepEnabled={ true }
							onChange={ ( value ) => {
								setAttributes( { numberCard: parseInt( value ) } );
							} }
							shiftStep={ 10 } value={ numberCard }
						/>
					</PanelBody>
				</InspectorControls>

				<ServerSideRender
					className={ 'block-server-render' }
					block="cgb/fancy-card-block"
					attributes={ attributes }
				/>
				{ /*<div className='text-center'><strong>Preview block on front-end</strong></div>*/ }
			</Fragment>
		);
	},
	save: () => {
		return null;
	},
} );
