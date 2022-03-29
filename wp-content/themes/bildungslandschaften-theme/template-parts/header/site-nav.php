<?php
/**
 * Displays the site navigation.
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

?>

<?php if ( has_nav_menu( 'primary' ) ) : ?>
	<div id="site-navigation" class="navigation-wrap">
        <div class="resp_menu_dark"></div>
        <div class="menu-container-wrap">
            <div class="menu_header"><div class="close_menu_btn"></div></div>
            <nav class="primary-navigation" aria-label="<?php esc_attr_e( 'Primary menu', 'bildungslandschaften' ); ?>">
                <?php
                wp_nav_menu(
                    array(
                        'theme_location'  => 'primary',
                        'menu_class'      => 'menu-wrapper',
                        'container_class' => 'primary-menu-container',
                        'items_wrap'      => '<ul id="primary-menu-list" class="%2$s">%3$s</ul>',
                        'fallback_cb'     => false,
                    )
                );
                ?>
            </nav>
            <div class="menu_footer">
                <?php if ( has_nav_menu( 'secondary' ) ) : ?>
                    <nav aria-label="<?php esc_attr_e( 'Secondary menu', 'bildungslandschaften' ); ?>" class="secondary-navigation">
                        <ul class="secondary-navigation-wrapper">
                            <?php
                            wp_nav_menu(
                                array(
                                    'theme_location' => 'secondary',
                                    'items_wrap'     => '%3$s',
                                    'container'      => false,
                                    'depth'          => 1,
                                    'link_before'    => '<span>',
                                    'link_after'     => '</span>',
                                    'fallback_cb'    => false,
                                )
                            );
                            ?>
                        </ul>
                    </nav>
                <?php endif; ?>

                <div class="socials-wrap">
                    <?php if ( has_nav_menu( 'socials' ) ) : ?>
                        <nav aria-label="<?php esc_attr_e( 'Socials menu', 'bildungslandschaften' ); ?>" class="socials-navigation">
                            <ul class="socials-navigation-wrapper">
                                <?php
                                wp_nav_menu(
                                    array(
                                        'theme_location' => 'socials',
                                        'items_wrap'     => '%3$s',
                                        'container'      => false,
                                        'depth'          => 1,
                                        'link_before'    => '<span>',
                                        'link_after'     => '</span>',
                                        'fallback_cb'    => false,
                                    )
                                );
                                ?>
                            </ul>
                        </nav>
                    <?php endif; ?>
                </div>
            </div>
        </div>
	</div><!-- #site-navigation -->
<?php endif; ?>
