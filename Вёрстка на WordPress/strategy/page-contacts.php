
<?php get_header(); ?>


<?php 

/* Следующий комментарий нужен для того, чтобы в WordPress появился шаблон "portfolio" и этот файл был связан со страницей. */
/* Template Name: сontacts */

?>

<section class="templateux-hero mb-5"  data-scrollax-parent="true">
    <!-- <div class="cover" data-scrollax="properties: { translateY: '30%' }"><img src="images/hero_2.jpg" /></div> -->

    <div class="container">
    <div class="row align-items-center justify-content-center intro">
        <div class="col-md-10" data-aos="fade-up">
        <h1><?php the_title(); ?></h1>
        <p class="lead"><?php echo get_post_meta(get_the_ID(), 'desc', true); ?></p>
        <a href="#next" class="go-down js-smoothscroll"></a>
        </div>
    </div>
    </div>
</section>
<!-- END templateux-hero -->


<section class="templateux-portfolio-overlap mb-5" data-aos="fade-up" id="next">
    <div class="container">
    <!-- <div class="row"> -->
        <form action="#" method="post">
        <div class="row">
            <div class="col-md-4  mb-4">
            <input type="text" class="form-control" placeholder="Name">
            </div>
            <div class="col-md-4  mb-4">
            <input type="email" class="form-control" placeholder="Email">
            </div>
            <div class="col-md-4  mb-4">
            <input type="text" class="form-control" placeholder="Phone">
            </div>
        </div>
        <div class="row">
            <div class="col-md-4  mb-4">
            <input type="text" class="form-control" placeholder="Time Zone">
            </div>
            <div class="col-md-4  mb-4">
            <input type="email" class="form-control" placeholder="Budget">
            </div>
            <div class="col-md-4  mb-4">
            <input type="text" class="form-control" placeholder="Type of Work">
            </div>
        </div>
        <div class="row">
            <div class="col-md-12  mb-4">
            <textarea name="" class="form-control" id="" cols="30" rows="10" placeholder="Write your message"></textarea>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4  mb-4">
            <input type="submit" class="button button--red" value="Send your message">
            </div>
        </div>
        </form>
    <!-- </div> -->
    </div>
</section>

<section id="map">
    <?php echo do_shortcode('[wpgmza id="1"]'); ?>
</section>

<?php get_footer(); ?>