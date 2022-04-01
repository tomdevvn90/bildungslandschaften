<?php
function bil_fancy_card_template( $atts, $content ) {
	$a         = shortcode_atts( [
			'className' => '',
	], $atts );
	$the_query = new WP_Query( [
			'post_type'      => 'project',
			'post_status'    => 'publish',
			'posts_per_page' => 5
	] );
	ob_start();
	?>
	<div class="fancy-card-block <?= $a['className'] ?>">
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
<!--			<div class="fancy-card-item" style="--card-item-color: #b9e7de;--item:1;">-->
<!--				<div class="base-bg"></div>-->
<!--				<div class="info">-->
<!--					<div class="card-header">-->
<!--						<h3 class="name">Priorité à la jeunesse </h3>-->
<!--						<span class="num"></span>-->
<!--					</div>-->
<!--					<div class="card-content">-->
<!--						<div class="thumb">-->
<!--							<img src="http://bildungslandschaften.local/wp-content/uploads/2022/03/Vero-logo-header.png"-->
<!--								 alt="#"/>-->
<!--						</div>-->
<!--						<div class="text">-->
<!--							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh-->
<!--							euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad-->
<!--							minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip-->
<!--							ex ea commodo consequat. Duis-->
<!--						</div>-->
<!--					</div>-->
<!--				</div>-->
<!--			</div>-->
<!--			<div class="fancy-card-item" style="--card-item-color: #ec9f75;--item:2;">-->
<!--				<div class="base-bg"></div>-->
<!--				<div class="info">-->
<!--					<div class="card-header">-->
<!--						<h3 class="name">Priorité à la jeunesse </h3>-->
<!--						<span class="num"></span>-->
<!--					</div>-->
<!--					<div class="card-content">-->
<!--						<div class="thumb">-->
<!--							<img src="http://bildungslandschaften.local/wp-content/uploads/2022/03/Vero-logo-header.png"-->
<!--								 alt="#"/>-->
<!--						</div>-->
<!--						<div class="text">-->
<!--							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh-->
<!--							euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad-->
<!--							minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip-->
<!--							ex ea commodo consequat. Duis-->
<!--						</div>-->
<!--					</div>-->
<!--				</div>-->
<!--			</div>-->
<!--			<div class="fancy-card-item" style="--card-item-color: #e767cc;--item:3;">-->
<!--				<div class="base-bg"></div>-->
<!--				<div class="info">-->
<!--					<div class="card-header">-->
<!--						<h3 class="name">Priorité à la jeunesse </h3>-->
<!--						<span class="num"></span>-->
<!--					</div>-->
<!--					<div class="card-content">-->
<!--						<div class="thumb">-->
<!--							<img src="http://bildungslandschaften.local/wp-content/uploads/2022/03/Vero-logo-header.png"-->
<!--								 alt="#"/>-->
<!--						</div>-->
<!--						<div class="text">-->
<!--							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh-->
<!--							euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad-->
<!--							minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip-->
<!--							ex ea commodo consequat. Duis-->
<!--						</div>-->
<!--					</div>-->
<!--				</div>-->
<!--			</div>-->
<!--			<div class="fancy-card-item" style="--card-item-color: #67e76d;--item:4;">-->
<!--				<div class="base-bg"></div>-->
<!--				<div class="info">-->
<!--					<div class="card-header">-->
<!--						<h3 class="name">Priorité à la jeunesse </h3>-->
<!--						<span class="num"></span>-->
<!--					</div>-->
<!--					<div class="card-content">-->
<!--						<div class="thumb">-->
<!--							<img src="http://bildungslandschaften.local/wp-content/uploads/2022/03/Vero-logo-header.png"-->
<!--								 alt="#"/>-->
<!--						</div>-->
<!--						<div class="text">-->
<!--							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh-->
<!--							euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad-->
<!--							minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip-->
<!--							ex ea commodo consequat. Duis-->
<!--						</div>-->
<!--					</div>-->
<!--				</div>-->
<!--			</div>-->
<!--			<div class="fancy-card-item" style="--card-item-color: #e97c5b;--item:5;">-->
<!--				<div class="base-bg"></div>-->
<!--				<div class="info">-->
<!--					<div class="card-header">-->
<!--						<h3 class="name">Priorité à la jeunesse </h3>-->
<!--						<span class="num"></span>-->
<!--					</div>-->
<!--					<div class="card-content">-->
<!--						<div class="thumb">-->
<!--							<img src="http://bildungslandschaften.local/wp-content/uploads/2022/03/Vero-logo-header.png"-->
<!--								 alt="#"/>-->
<!--						</div>-->
<!--						<div class="text">-->
<!--							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh-->
<!--							euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad-->
<!--							minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip-->
<!--							ex ea commodo consequat. Duis-->
<!--						</div>-->
<!--					</div>-->
<!--				</div>-->
<!--			</div>-->
		</div>
	</div>
	<?php

	return ob_get_clean();
}
