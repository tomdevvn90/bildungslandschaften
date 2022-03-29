<?php

/**
 * Use this file to register any custom post types you wish to create.
 */
if ( ! function_exists( 'bild_create_custom_post_type' ) ) {
	// Register Custom Post Type
	function bild_create_custom_post_type() {
		register_post_type( 'project', array(
			'label'               => __( 'Project', 'bild' ),
			'description'         => __( 'Project', 'bild' ),
			//'labels'                => $labels,
			'supports'            => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'excerpt', ),
			'taxonomies'          => array(),
			'hierarchical'        => false,
			'public'              => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'menu_position'       => 5,
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'can_export'          => true,
			'has_archive'         => false,
			'exclude_from_search' => false,
			'publicly_queryable'  => true,
			'capability_type'     => 'post',
			'show_in_rest'        => true,
		) );
	}

	add_action( 'init', 'bild_create_custom_post_type', 0 ); // Register Custom Taxonomy
}
