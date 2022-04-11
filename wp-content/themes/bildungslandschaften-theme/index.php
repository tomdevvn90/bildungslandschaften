<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

get_header(); ?>

<?php if ( is_home() && ! is_front_page() && ! empty( single_post_title( '', false ) ) ) : ?>
    <header class="entry-header alignwide text-center">
		<?php get_template_part( 'template-parts/header/entry-header' ); ?>
    </header><!-- .entry-header -->
<?php endif;
if ( have_posts() ) {
	$i = 1; ?>
    <div class="posts-wrap default-max-width">
		<?php
		// Load posts loop.
		while ( have_posts() ) {
			the_post();

			//get_template_part( 'template-parts/content/content', get_theme_mod( 'display_excerpt_or_full_post', 'excerpt' ) );

			?>
            <article id="post-<?php the_ID(); ?>" <?php post_class( ( $i != 1 && $i % 4 !== 0 ? '__equal' : '' ) ); ?>>
                <div class="ar-inner">
                    <div class="__thumb">
                        <a href="<?= get_the_permalink() ?>"><?php the_post_thumbnail(); ?></a>
                    </div>
                    <div class="__content">
                        <div class="__top-content">
                            <h2 class="__title"><a href="<?= get_the_permalink() ?>"><?= get_the_title() ?></a></h2>
                            <div class="__excerpt">
								<?= wp_trim_words( apply_filters( 'the_excerpt', get_the_excerpt() ), 40 ); ?>
                            </div>
                        </div>
                        <a href="<?= get_the_permalink() ?>" class="__btn-detail">
                            <span>Découvrir l’actualité</span>
                            <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.25 87.68" width="30" height="58">
                                <g data-name="Layer 2">
                                    <path fill="transparent" stroke="currentColor" stroke-miterlimit="10"
                                          stroke-width="2" d="m.71.71 43.13 43.13L.71 86.97"/>
                                </g>
                            </svg>
                        </span>
                        </a>
                    </div>
                </div>
            </article>
			<?php
			$i ++;
		}
		?>
    </div>
	<?php

	// Previous/next page navigation.
	twenty_twenty_one_the_posts_navigation();
} else {

	// If no content, include the "No posts found" template.
	get_template_part( 'template-parts/content/content-none' );

}

get_footer();
