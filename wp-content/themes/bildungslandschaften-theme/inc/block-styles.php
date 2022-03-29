<?php
/**
 * Block Styles
 *
 * @link https://developer.wordpress.org/reference/functions/register_block_style/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

if ( function_exists( 'register_block_style' ) ) {
	/**
	 * Register block styles.
	 *
	 * @since Twenty Twenty-One 1.0
	 *
	 * @return void
	 */
	function twenty_twenty_one_register_block_styles() {
		// Columns: Overlap.
		register_block_style(
			'core/columns',
			array(
				'name'  => 'bildungslandschaften-columns-overlap',
				'label' => esc_html__( 'Overlap', 'bildungslandschaften' ),
			)
		);

		// Cover: Borders.
		register_block_style(
			'core/cover',
			array(
				'name'  => 'bildungslandschaften-border',
				'label' => esc_html__( 'Borders', 'bildungslandschaften' ),
			)
		);

		// Group: Borders.
		register_block_style(
			'core/group',
			array(
				'name'  => 'bildungslandschaften-border',
				'label' => esc_html__( 'Borders', 'bildungslandschaften' ),
			)
		);

		// Image: Borders.
		register_block_style(
			'core/image',
			array(
				'name'  => 'bildungslandschaften-border',
				'label' => esc_html__( 'Borders', 'bildungslandschaften' ),
			)
		);

		// Image: Frame.
		register_block_style(
			'core/image',
			array(
				'name'  => 'bildungslandschaften-image-frame',
				'label' => esc_html__( 'Frame', 'bildungslandschaften' ),
			)
		);

		// Latest Posts: Dividers.
		register_block_style(
			'core/latest-posts',
			array(
				'name'  => 'bildungslandschaften-latest-posts-dividers',
				'label' => esc_html__( 'Dividers', 'bildungslandschaften' ),
			)
		);

		// Latest Posts: Borders.
		register_block_style(
			'core/latest-posts',
			array(
				'name'  => 'bildungslandschaften-latest-posts-borders',
				'label' => esc_html__( 'Borders', 'bildungslandschaften' ),
			)
		);

		// Media & Text: Borders.
		register_block_style(
			'core/media-text',
			array(
				'name'  => 'bildungslandschaften-border',
				'label' => esc_html__( 'Borders', 'bildungslandschaften' ),
			)
		);

		// Separator: Thick.
		register_block_style(
			'core/separator',
			array(
				'name'  => 'bildungslandschaften-separator-thick',
				'label' => esc_html__( 'Thick', 'bildungslandschaften' ),
			)
		);

		// Social icons: Dark gray color.
		register_block_style(
			'core/social-links',
			array(
				'name'  => 'bildungslandschaften-social-icons-color',
				'label' => esc_html__( 'Dark gray', 'bildungslandschaften' ),
			)
		);
	}
	add_action( 'init', 'twenty_twenty_one_register_block_styles' );
}
