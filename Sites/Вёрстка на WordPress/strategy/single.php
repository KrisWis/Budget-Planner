<?php get_header() ?>

<!-- 
ПО ИТОГУ, ЭТОТ ВАРИАНТ НЕ ПОДОШЁЛ И ПРИШЛОСЬ ИСПОЛЬЗОВАТЬ ОБЫЧНЫЙ ЦИКЛ.
WordPress цикл. 
Если есть записи в WordPress (т.к WordPress изначально был создан для блогов), то запускаем цикл и берём записи через цикл. -->
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

<!-- То, что будем выводить с помощью цикла -->
<section class="templateux-hero"  data-scrollax-parent="true">
    <!-- <div class="cover" data-scrollax="properties: { translateY: '30%' }"><img src="images/hero_2.jpg" /></div> -->

    <div class="container">
    <div class="row align-items-center justify-content-center intro">
        <div class="col-md-12" data-aos="fade-up">
        <div class="post-meta">
            <span>Posted in <?php echo date('F j, Y'); ?></span> 
            <span class="sep">&bullet;</span>
            <!-- the_author_meta("user_login") - получаем никнейм пользователя. -->
            <span>Posted by <?php the_author_meta("user_login"); ?></span>  
        </div>
        <h1><?php the_title(); ?></h1>
        
        <a href="#next" class="go-down js-smoothscroll"></a>
        </div>
    </div>
    </div>
</section>

<section class="templateux-portfolio-overlap mb-5" id="next">
    <div id="blog" class="site-section">
    <div class="container">
        
            <div class="row">

                <div class="col-md-8">
                    <div>
                        <?php the_content() ?>
                    </div>

                    <div class="pt-5 mt-5">
                    <?php 
                        // Получаем ID поста.
                        $post_id = get_the_ID();
                        // Получаем количество комментариев в разделе "Комментарии" в WordPress.
                        $comments_count = wp_count_comments($post_id);

                        ?>  
                            <!-- $comments_count->total_comments - так мы получаем общее количество комментариев на сайте. -->
                            <h3 class="mb-5"><?php echo $comments_count->total_comments . " комментариев"; ?></h3>
                        <?php


                        ?>
                    <!-- comments_template() - загружает наш шаблон комментариев (функция mytheme_comment из файла comments.php). -->
                    <?php comments_template(); ?>
                    <!-- comment_form() - выводит на экран готовый код формы комментирования. -->
                    <?php comment_form(); ?>
                </div>

                </div> <!-- .col-md-8 -->
                <div class="col-md-4 sidebar pl-md-5">
                    <div class="sidebar-box">
                        <!-- echo get_avatar(get_the_ID()) - выводит изображение профиля пользователя, который добавил статью. -->
                        <?php echo get_avatar(get_the_ID()); ?>
                        <h3 class="mt-3">About The Author</h3>
                        <!-- the_author_meta("description") - получаем биографию пользователя. -->
                        <?php the_author_meta("description"); ?>
                    </div>

                    <div class="sidebar-box">
                        <h3>Tags</h3>
                        <div class="tagcloud">
                        <!-- the_tags(__("Tags: "), ' ') -  получаем "Метки", которые указываем в WordPress. 
                        Также, в первых кавычках можно указать слово, которое будет стоять перед отметками, а дальше разделитель отметок. -->
                        <?php the_tags(__(""), ' ') ?>
                        </div>
                    </div>
                </div>
            </div>

            
            </div>
    </div>
  
</section>
<?php endwhile; else : ?>
<?php endif; ?>


<?php get_footer() ?>