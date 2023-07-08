
<a class="templateux-section templateux-cta animsition-link mt-5" href="/contacts/" data-aos="fade-up">
  <div class="container-fluid">
    <div class="cta-inner">
      <h2><span class="words-1">Start a Project.</span> <span class="words-2">Let's chat we are good people.</span></h2>
    </div>
  </div>
</a>

<footer class="templateux-footer">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6 text-md-left text-center">
        <p>
        <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
        Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" class="text-primary">Colorlib</a>
        <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
      </p>
      </div>
      <div class="col-md-6 text-md-right text-center footer-social">
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
            // Т.к нам нужно вывести только посты social, то в 'post_type' пищем social.
            'post_type'   => 'social',
            'suppress_filters' => true, // подавление работы фильтров изменения SQL запроса
          ) );

          global $post;
          // foreach - это цикл, и мы проходимся по всем постам, чтобы выводить их с одной и той же разметкой.
          foreach( $my_posts as $post ){
            setup_postdata( $post );
            ?>

            <a href="<?php echo get_post_meta(get_the_ID(), 'link', true); ?>" class="p-3" target="_blank"><span class="icon-<?php the_title(); ?>"></span></a>

            <?php
            
          }

          wp_reset_postdata(); // сброс
        ?>
      </div>
    </div>
  </div>
</footer>

  <?php 

  // wp_footer() - подключит все файлы для футера, которые написаны в functions.php.
  wp_footer()

  ?>
  <!-- <script src="js/scripts-all.js"></script>
  <script src="js/main.js"></script> -->
  
  </body>
</html>