<?php get_header(); ?>


<?php 

/* Следующий комментарий нужен для того, чтобы в WordPress появился шаблон "portfolio" и этот файл был связан со страницей. */
/* Template Name: portfolio */

?>

<!-- END templateux-navbar -->
<section class="templateux-hero"  data-scrollax-parent="true">
      <!-- <div class="cover" data-scrollax="properties: { translateY: '30%' }"><img src="images/hero_2.jpg" /></div> -->

      <div class="container">
        <div class="row align-items-center justify-content-center intro">
          <div class="col-md-10" data-aos="fade-up">
            <!-- Следующий код достаёт название заголовка в нашем шаблоне и применяет его в теге h1. 
            Если изменить текст заголовка в админке WordPress, то он измениться и тут. -->
            <h1><?php the_title(); ?></h1>
            <!-- echo - выводит данные, которые идут после него.
            get_post_meta() - нужно для того, чтобы получать определённые данные.
            get_the_ID() - получаем id элемента, который имеет название 'desc'.
            В конце функции мы ставим true, чтобы предотвратить работу с массивом. -->
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
            // get_posts() - достаём все посты по определённым критериям.
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
              // Т.к нам нужно вывести только посты Portfolio, то в 'post_type' пищем portfolio.
              'post_type'   => 'portfolio',
              'suppress_filters' => true, // подавление работы фильтров изменения SQL запроса
            ) );

            global $post;
            // foreach - это цикл, и мы проходимся по всем постам, чтобы выводить их с одной и той же разметкой.
            foreach( $my_posts as $post ){
              setup_postdata( $post );
              ?>

              <article class="proj-article">
                <!-- the_permalink() - ссылка на текущий пост. -->
                <a class="project animsition-link" href="<?php the_permalink(); ?>">
                  <figure>
                    <!-- echo get_the_post_thumbnail_url() - выводит миниатюру записи(картинку), которою мы добавили в WordPress. -->
                    <img src="<?php echo get_the_post_thumbnail_url(); ?>" alt="Free Template" class="img-fluid">  
                  </figure>
                  <div class="project-hover">
                    <div class="project-hover-inner">
                      <h2><?php the_title(); ?></h2>
                      <span><?php the_content(); ?></span>
                    </div>
                  </div>
                </a>
              </article>

              <?php
              
            }

            wp_reset_postdata(); // сброс
          ?>
        </div>

<?php get_footer(); ?>
