<?php
/**
 * Displays the site header.
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

$wrapper_classes = 'site-header';
$wrapper_classes .= has_custom_logo() ? ' has-logo' : '';
$wrapper_classes .= (true === get_theme_mod('display_title_and_tagline', true)) ? ' has-title-and-tagline' : '';
$wrapper_classes .= has_nav_menu('primary') ? ' has-menu' : '';
?>

<header id="masthead" class="<?php echo esc_attr($wrapper_classes); ?>">
    <?php get_template_part('template-parts/header/site-branding'); ?>
    <div class="menu-button-container">
        <a href="#" class="button btn-toolbox">TOOLBOX</a>
        <button class="button open-primary-menu" aria-controls="primary-menu-list" aria-expanded="false">
            <div class="white_area"></div>
        </button><!-- #primary-mobile-menu -->
    </div><!-- .menu-button-container -->
</header><!-- #masthead -->

<?php get_template_part('template-parts/header/site-nav'); ?>
