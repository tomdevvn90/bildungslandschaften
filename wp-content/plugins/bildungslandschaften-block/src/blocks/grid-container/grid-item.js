/**
 * BLOCK: grid Block
 */

import './editor.scss'
import './style.scss'

import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import {
	InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck,
	BlockIcon, MediaPlaceholder,
	RichText,
	PanelColorSettings,
} from '@wordpress/block-editor'
import { Fragment, useState } from '@wordpress/element'
import {
	ToggleControl,
	PanelBody,
	Button,
	ResponsiveWrapper,
	Spinner,
	TextControl,
	TextareaControl,
	__experimentalNumberControl as NumberControl
} from '@wordpress/components';

const attr = {};

const Edit = (props) => {
	const {attributes, setAttributes, className, setState} = props;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('General Setting')}>

				</PanelBody>
			</InspectorControls>

			<div className={['grid-item', className].join(' ')}>
				<div className="grid-item-inner">
					<InnerBlocks
						template={[
							['core/paragraph', {placeholder: 'Grid item...'}],
						]} />
				</div>
			</div>
		</Fragment>
	)
}
const Save = ({attributes, className, clientId}) => {
	return (
		<div className={['grid-item', className].join(' ')}>
			<div className="grid-item-inner">
				<InnerBlocks.Content />
			</div>
		</div>
	)
}

export default registerBlockType('my-block/grid-item', {
	title: __('Grid Item'),
	category: 'aut-blocks',
	icon: 'shield',
	keywords: [
		__('grid'),
		__('item'),
		__('aut')
	],
	parent: ['my-block/grid-container'],
	attributes: attr,

	edit: Edit,
	save: Save
})
