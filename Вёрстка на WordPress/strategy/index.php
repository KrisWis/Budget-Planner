

<!-- КАК ПОДКЛЮЧИТЬ САЙТ, НАПИСАННЫЙ НА WORDPRESS НА ХОСТИНГ - https://www.youtube.com/watch?v=BpRJlZ9-8j4&list=PLCMvV-acWe2C3ruTp6kzHU7FqlErsl2nR&index=11. -->


<?php 

get_header() 

?>    
<?php 

/* Следующий комментарий нужен для того, чтобы в WordPress появился шаблон "main" и этот файл был связан со страницей. */
/* Template Name: main */

?>

    <!-- END templateux-navbar -->
    <section class="templateux-hero">
      <div class="container">
        <div class="row align-items-center justify-content-center intro">
          <div class="col-md-10" data-aos="fade-up">
            <h1>We are Strategy. A digitally minded creative agency based in NYC.</h1>
            <a href="#next" class="go-down js-smoothscroll"></a>
          </div>
        </div>
      </div>
    </section>
    <!-- END templateux-hero -->

    <section class="templateux-portfolio-overlap" id="next">
      <div class="container-fluid">
        <div class="row">
          <?php
            // get_posts() - достаём все посты по определённым критериям.
            $my_posts = get_posts( array(
              // 'numberposts' => 5 - делает так, чтобы можно было получить только 5 постов.
              'numberposts' => 5,
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
        <!-- END row -->
      </div>
    </section>

   
    <!-- END section -->
    <section class="templateux-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-4" data-aos="fade-up">
            <h2 class="section-heading mt-3">What We Do</h2>
          </div>
          <div class="col-md-8" data-aos="fade-up" data-aos-delay="100">

            <div class="row">
              <div class="col-md-12">
                <h2 class="mb-5">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</h2>
              </div>
            </div>
            

            <div class="row  pt-sm-0 pt-md-5 mb-5">
              <?php
              $my_posts = get_posts( array(
                // 'numberposts' => 4 - делает так, чтобы можно было получить только 4 поста.
                'numberposts' => 4,
                'category'    => 0,
                'orderby'     => 'date',
                /* 'order'       => 'DESC' - делаем так, чтобы сортировка добавленных постов в WordPress шла по тому, что было добавлено последним, то и будет первым. 
                Если поставить 'ASC', то сортировка будет идти по тому, что первей было добавлено, то и будет идти первым. */
                'order'       => 'ASC',
                'include'     => array(),
                'exclude'     => array(),
                'meta_key'    => '',
                'meta_value'  =>'',
                // Т.к нам нужно вывести только experts-adv, то в 'post_type' пищем experts-adv.
                'post_type'   => 'experts-adv',
                'suppress_filters' => true, // подавление работы фильтров изменения SQL запроса
              ) );

              global $post;
              // foreach - это цикл, и тут он нам нужен, чтобы get_the_ID() получал правильный ID.
              foreach( $my_posts as $post ){
                setup_postdata( $post );
                ?>

                <div class="col-md-6"  data-aos="fade-up" data-aos-delay="100">
                  <div class="media templateux-media mb-4">
                    <div class="mr-4 icon">
                      <span class="<?php echo get_post_meta(get_the_ID(), 'adv-icon', true); ?> display-3"></span>
                    </div>
                    <div class="media-body">
                      <h3 class="h5"><?php the_title(); ?></h3>
                      <p><?php the_content(); ?></p>
                    </div>
                  </div>
                </div>

                <?php
                
              }

              wp_reset_postdata(); // сброс
              ?>
            <!-- END row -->

            
          </div>
        </div>
      </div>
    </section>
    <!-- END section -->

    <!-- END section -->
    <section class="templateux-section mb-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-4" data-aos="fade-up">
            <h2 class="section-heading mt-3">Recent Blog Posts</h2>
          </div>
          <div class="col-md-8">
            <div class="row">
              <div class="col-lg-12">
                <?php
              // get_posts() - достаём все посты по определённым критериям.
              $my_posts = get_posts( array(
                // 'numberposts' => 3 - делает так, чтобы можно было получить только 3 поста.
                'numberposts' => 3,
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

                <div class="main-blog-wrapper" data-aos="fade-up">
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
              </div>
            </div>
          </div>
        </div>
        <div class="row" data-aos="fade-up" data-aos-delay="400">
          <div class="col-md-8 ml-auto">
            <a href="/blog/" class="animsition-link">Read All Blog Posts </a>
          </div>
        </div>
      </div>
    </section>
    <!-- END call to action -->

<?php 

get_footer() 

?>    