/**
 * BLOCK: Gap
 */

import './style.scss'
import './editor.scss'

import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import { Fragment } from '@wordpress/element'
import { InspectorControls, BlockControls } from '@wordpress/block-editor'
import {
	PanelBody,
	TextControl,
	ToggleControl
} from '@wordpress/components'

export default registerBlockType('my-block/gap', {
	title: __('Gap'),
	icon: <svg enableBackground="new 0 0 64 64" viewBox="0 0 64 64"><path d="m54 8h-24c-1.104 0-2 .896-2 2s.896 2 2 2h24c1.104 0 2-.896 2-2s-.896-2-2-2z" /><path d="m54 52h-24c-1.104 0-2 .896-2 2s.896 2 2 2h24c1.104 0 2-.896 2-2s-.896-2-2-2z" /><path d="m54 19h-24c-1.104 0-2 .896-2 2s.896 2 2 2h24c1.104 0 2-.896 2-2s-.896-2-2-2z" /><path d="m54 30h-24c-1.104 0-2 .896-2 2s.896 2 2 2h24c1.104 0 2-.896 2-2s-.896-2-2-2z" /><path d="m54 41h-24c-1.104 0-2 .896-2 2s.896 2 2 2h24c1.104 0 2-.896 2-2s-.896-2-2-2z" /><path d="m11.414 46.586c-.78-.781-2.048-.781-2.828 0-.781.781-.781 2.047 0 2.828l6 6c.39.391.902.586 1.414.586s1.024-.195 1.414-.586l6-6c.781-.781.781-2.047 0-2.828-.78-.781-2.048-.781-2.828 0l-2.586 2.586v-34.344l2.586 2.586c.39.391.902.586 1.414.586s1.024-.195 1.414-.586c.781-.781.781-2.047 0-2.828l-6-6c-.78-.781-2.048-.781-2.828 0l-6 6c-.781.781-.781 2.047 0 2.828.78.781 2.048.781 2.828 0l2.586-2.586v34.343z" /></svg>,
	category: 'common',
	keywords: [
		__('space'),
		__('gap'),
	],
	attributes: {
		size: {
			type: 'Object',
			default: {
				default: '10vh',
				tablet: '10vh',
				mobile: '10vh',
				sync: true,
			}
		}
	},
	edit: ({attributes, setAttributes, className, clientId}) => {
		const {size} = attributes
		const onChangeSize = (value, screen) => {
			let newSize = {...size}
			newSize[screen] = value
			if (screen == 'default' && size.sync == true) {
				newSize.tablet = value
				newSize.mobile = value
			}
			setAttributes({size: newSize})
		}

		const onChangeSizeResponsive = (value) => {
			let newSize = {...size}
			newSize.sync = value
			setAttributes({size: newSize})
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={__('Size')}>
						<TextControl
							help={__('Set size')}
							value={size.default}
							onChange={(value) => {
								onChangeSize(value, 'default')
							}}
						/>
						{
							(() => {
								if (size.sync) return
								return (
									<div>
										<TextControl
											label={__('on Tablet (≦768px)')}
											help={__('Set size for tablet')}
											value={size.tablet}
											onChange={(value) => {
												onChangeSize(value, 'tablet')
											}}
										/>
										<TextControl
											label={__('on Mobile (≦425px)')}
											help={__('Set size for mobile')}
											value={size.mobile}
											onChange={(value) => {
												onChangeSize(value, 'mobile')
											}}
										/>
									</div>
								)
							})()

						}
						<ToggleControl
							label={__('Sync')}
							help={__('Disable to custom size for each screen (Desktop, Tablet, Mobile)')}
							checked={size.sync}
							onChange={onChangeSizeResponsive}
						/>
					</PanelBody>
				</InspectorControls>
				<BlockControls />
				<div id={`my-block-${clientId}`} className={['my-block', 'block-gap', className].join(' ')} style={(() => {
					return {
						'--size-default': size.default,
						'--size-tablet': size.tablet,
						'--size-mobile': size.mobile,
					}
				})()} />
			</Fragment>
		)
	},
	save: ({attributes, className}) => {
		const {size} = attributes;
		return (
			<div className={['my-block', 'block-gap', className].join(' ')} style={(() => {
				return {
					'--size-default': size.default,
					'--size-tablet': size.tablet,
					'--size-mobile': size.mobile,
				}
			})()} data-size-default={size.default} data-size-tablet={size.tablet} data-size-mobile={size.mobile} />
		)
	}
})
