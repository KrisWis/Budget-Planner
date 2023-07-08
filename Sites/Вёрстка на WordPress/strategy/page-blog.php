
<?php get_header(); ?>


<?php 

/* Следующий комментарий нужен для того, чтобы в WordPress появился шаблон "blog" и этот файл был связан со страницей. */
/* Template Name: blog */

?>

<!-- END templateux-navbar -->
<section class="templateux-hero"  data-scrollax-parent="true">
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


<section class="templateux-portfolio-overlap mb-5" id="next">
    <div class="container-fluid">
        <div class="row">

        <?php
          $my_posts = get_posts( array(
            // 'numberposts' => -1 - делает так, чтобы можно было получить любое количество постов.
            'numberposts' => -1,
            'category'    => 0,
            'orderby'     => 'date',
            /* 'order'       => 'DESC' - делаем так, чтобы сортировка добавленных постов в WordPress шла по тому, что было добавлено последним, то и будет первым. 
            Если поставить 'ASC', то сортировка будет идти по тому, что первей было добавлено, то и будет идти первым. */
            'order'       => 'ASC',
            'include'     => array(),
            'exclude'     => array(),
            'meta_key'    => '',
            'meta_value'  =>'',
            // Т.к нам нужно вывести только experts, то в 'post_type' пищем experts.
            'post_type'   => 'post',
            'suppress_filters' => true, // подавление работы фильтров изменения SQL запроса
          ) );

          global $post;
          // Т.к WordPress изначально был создан для блогов, то запускаем цикл и берём записи(которые в WordPress) через цикл.
          foreach( $my_posts as $post ){
            setup_postdata( $post );
            ?>

            <div class="col-md-6" data-aos="fade-up">
                <a class="post animsition-link" href="<?php the_permalink(); ?>">
                    <figure>
                        <img src="<?php echo get_the_post_thumbnail_url(); ?>" alt="Free Template" class="img-fluid">  
                    </figure>
                    <div class="project-hover">
                        <div class="project-hover-inner">
                            <h2><?php the_title(); ?></h2>
                            <!-- echo date('F j, Y') - выводит месяц, день и год создания записи. -->
                            <span><?php echo date('F j, Y'); ?></span>
                        </div>
                    </div>
                </a>
            </div>

            <?php
            
          }

          wp_reset_postdata(); // сброс
      ?>

        <!-- 
        ПО ИТОГУ, ЭТОТ ВАРИАНТ НЕ ПОДОШЁЛ И ПРИШЛОСЬ ИСПОЛЬЗОВАТЬ ОБЫЧНЫЙ ЦИКЛ.
        WordPress цикл. 
        Если есть записи в WordPress (т.к WordPress изначально был создан для блогов), то запускаем цикл и берём записи через цикл. 
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        
        То, что будем выводить с помощью цикла 
        <div class="col-md-6" data-aos="fade-up">
            <a class="post animsition-link" href="<?php the_permalink(); ?>">
                <figure>
                    <img src="images/img_1.jpg" alt="Free Template" class="img-fluid">  
                </figure>
                <div class="project-hover">
                    <div class="project-hover-inner">
                        <h2><?php the_title(); ?></h2>
                        the_excerpt() - достаёт описание записи.
                        <span><?php the_excerpt(); ?></span>
                    </div>
                </div>
            </a>
        </div>

        Завершаем цикл.
        <?php endwhile; else : ?>
            <p>Записей нет.</p>
        <?php endif; ?>
        -->
    </div>
    <!-- END row -->

    <div class="row pt-5" data-aos="fade-up" data-aos-delay="100">
        <div class="col-md-12 text-center">
        <a href="#" class="button button--red  mb-5">Load More Posts...</a>
        </div>
    </div>

    </div>
</section>

<?php get_footer(); ?>