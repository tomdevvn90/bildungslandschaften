<?php

add_action( 'acf/init', 'bild_acf_init' );
function bild_acf_init() {
	if ( function_exists( 'acf_add_options_page' ) ) {
		if ( current_user_can( 'administrator' ) ):
			acf_add_options_page( array(
				'page_title'  => __( 'Theme Options', 'bild' ),
				'menu_title'  => __( 'Theme Options', 'bild' ),
				'menu_slug'   => 'theme-options',
				'parent_slug' => 'themes.php',
			) );
		endif;
	}
}

add_filter( 'acf/settings/save_json', 'bild_acf_json_save_point' );
function bild_acf_json_save_point( $path ) {
	// update path
	$path = get_stylesheet_directory() . '/inc/acf-options';

	// return
	return $path;
}

add_filter( 'acf/settings/load_json', 'bild_acf_json_load_point' );
function bild_acf_json_load_point( $paths ) {
	// remove original path (optional)
	unset( $paths[0] );
	// append path
	$paths[] = get_stylesheet_directory() . '/inc/acf-options';

	// return
	return $paths;
}

if ( ! function_exists( '__get_field' ) ) {
	function __get_field( $selector, $post_id = false, $format_value = true ) {
		if ( function_exists( 'get_field' ) ) {
			return get_field( $selector, $post_id, $format_value );
		}

		return false;
	}
}
if ( ! function_exists( '__get_fields' ) ) {
	function __get_fields( $post_id = false, $format_value = true ) {
		if ( function_exists( 'get_fields' ) ) {
			return get_fields( $post_id, $format_value );
		}

		return [];
	}
}
