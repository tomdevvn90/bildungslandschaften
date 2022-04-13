import './editor.scss';
import './style.scss';
import './menu-icon';

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
	[ 'bild-block/bild-locaux-menu-button-block', {} ],
	[ 'my-block/grid-container', { cols: 2, colsMobile: 2 },
		[
			[ 'my-block/grid-item', {},
				[
					[ 'bild-block/bild-button', {}, [
						[
							'bild-block/bild-button-item', { textButton: 'Differdange', fullWidth: true },
						],
					] ],
				],
			],
			[ 'my-block/grid-item', {},
				[
					[ 'bild-block/bild-button', {}, [
						[
							'bild-block/bild-button-item', { textButton: 'Minette Unesco Biosphere', fullWidth: true },
						],
					] ],
				],
			],
			[ 'my-block/grid-item', {},
				[
					[ 'bild-block/bild-button', {}, [
						[
							'bild-block/bild-button-item', { textButton: 'Esch 2022', fullWidth: true },
						],
					] ],
				],
			],
			[ 'my-block/grid-item', {},
				[
					[ 'bild-block/bild-button', {}, [
						[
							'bild-block/bild-button-item', { textButton: 'VDL', fullWidth: true },
						],
					] ],
				],
			],
			[ 'my-block/grid-item', {},
				[
					[ 'bild-block/bild-button', {}, [
						[
							'bild-block/bild-button-item', { textButton: 'Ettelbreck', fullWidth: true },
						],
					] ],
				],
			],
			[ 'my-block/grid-item', {},
				[
					[ 'bild-block/bild-button', {}, [
						[
							'bild-block/bild-button-item', { textButton: 'Wiltz', fullWidth: true },
						],
					] ],
				],
			],
		],
	],
];

const attr = {
};

const Edit = ( props ) => {
	const { attributes, setAttributes, className, setState } = props;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'General' ) } />
			</InspectorControls>

			<div className={ [ 'bild-block', 'bild-paysages-locaux-block', 'block-edit', className ].join( ' ' ) }>
				<div className="__content">
					<InnerBlocks template={ TEMPLATE } />
				</div>
			</div>
		</Fragment>
	);
};
const Save = ( { attributes, className, clientId } ) => {
	return (
		<div className={ [ 'bild-block', 'bild-paysages-locaux-block', className ].join( ' ' ) }>
			<div className="__content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default registerBlockType( 'bild-block/bild-paysages-locaux-block', {
	title: __( 'Les Paysages Locaux - Bild Block' ),
	category: 'common',
	icon: 'shield',
	keywords: [
		__( 'locaux' ),
		__( 'local' ),
		__( 'landscapes' ),
		__( 'item' ),
		__( 'paysages' ),
		__( 'bild' ),
	],
	attributes: attr,

	edit: Edit,
	save: Save,
} );
