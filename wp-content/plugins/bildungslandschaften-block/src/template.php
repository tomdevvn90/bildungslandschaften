<?php
function bil_fancy_card_template( $atts, $content ) {
	$a         = shortcode_atts([
			'className'  => '',
			'numberCard' => 7,
	], $atts);
	$the_query = new WP_Query([
			'post_type'      => 'project',
			'post_status'    => 'publish',
			'posts_per_page' => $a['numberCard'] > 0 ? $a['numberCard'] : 5
	]);
	$num       = $the_query->found_posts < intval($a['numberCard']) ? $the_query->found_posts : intval($a['numberCard']);
	ob_start();
	?>
	<div class="fancy-card-block <?= $a['className'] ?>" style="min-height: <?= ($num - 1) * 150 + 500 ?>px">
		<div class="fancy-cards-wrap">
			<?php
			if ( $the_query->have_posts() ) {
				$i = 1;
				while ( $the_query->have_posts() ) {
					$the_query->the_post(); ?>
					<div class="fancy-card-item" style="--card-item-color: <?=__get_field('color_option')?>;--item:<?=$i?>;">
						<div class="base-bg"></div>
						<div class="info">
							<div class="card-header">
								<h3 class="name"><?php the_title();?></h3>
								<span class="num"></span>
							</div>
							<div class="card-content">
								<div class="thumb">
									<?php the_post_thumbnail('full');?>
								</div>
								<div class="text">
									<?php the_content();?>
								</div>
							</div>
						</div>
					</div>
					<?php
					$i++;
				}
			} else {
				// no posts found
			}
			/* Restore original Post Data */
			wp_reset_postdata();
			?>
		</div>
	</div>
	<?php

	return ob_get_clean();
}
