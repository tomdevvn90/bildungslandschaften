<?php
/**
 * Displays the post header
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */
?>
    <a href="<?= site_url(); ?>" class="close-icon-title">
        <svg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' viewBox='0 0 63 63'>
            <path fill='none' stroke='#272727' stroke-linecap='round' stroke-linejoin='round'
                  d='m23.4 39.1 16.2-16.2m-16.2 0 16.2 16.2'/>
        </svg>
    </a>
<?php
the_title('<h1 class="entry-title">', '</h1>');
