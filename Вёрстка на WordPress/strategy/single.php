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
                    <?php the_content() ?>

                    <div class="pt-5 mt-5">
                        <h3 class="mb-5">6 Comments</h3>
                        <ul class="comment-list">
                        <li class="comment">
                            <div class="vcard bio">
                            <img src="images/person_1.jpg" alt="Image placeholder">
                            </div>
                            <div class="comment-body">
                            <h3>Jean Doe</h3>
                            <div class="meta">January 9, 2018 at 2:21pm</div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                            <p><a href="#" class="reply">Reply</a></p>
                            </div>
                        </li>

                        <li class="comment">
                            <div class="vcard bio">
                            <img src="images/person_1.jpg" alt="Image placeholder">
                            </div>
                            <div class="comment-body">
                            <h3>Jean Doe</h3>
                            <div class="meta">January 9, 2018 at 2:21pm</div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                            <p><a href="#" class="reply">Reply</a></p>
                            </div>

                            <ul class="children">
                            <li class="comment">
                                <div class="vcard bio">
                                <img src="images/person_1.jpg" alt="Image placeholder">
                                </div>
                                <div class="comment-body">
                                <h3>Jean Doe</h3>
                                <div class="meta">January 9, 2018 at 2:21pm</div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                <p><a href="#" class="reply">Reply</a></p>
                                </div>


                                <ul class="children">
                                <li class="comment">
                                    <div class="vcard bio">
                                    <img src="images/person_1.jpg" alt="Image placeholder">
                                    </div>
                                    <div class="comment-body">
                                    <h3>Jean Doe</h3>
                                    <div class="meta">January 9, 2018 at 2:21pm</div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                    <p><a href="#" class="reply">Reply</a></p>
                                    </div>

                                    <ul class="children">
                                        <li class="comment">
                                        <div class="vcard bio">
                                            <img src="images/person_1.jpg" alt="Image placeholder">
                                        </div>
                                        <div class="comment-body">
                                            <h3>Jean Doe</h3>
                                            <div class="meta">January 9, 2018 at 2:21pm</div>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                            <p><a href="#" class="reply">Reply</a></p>
                                        </div>
                                        </li>
                                    </ul>
                                </li>
                                </ul>
                            </li>
                            </ul>
                        </li>

                        <li class="comment">
                            <div class="vcard bio">
                            <img src="images/person_1.jpg" alt="Image placeholder">
                            </div>
                            <div class="comment-body">
                            <h3>Jean Doe</h3>
                            <div class="meta">January 9, 2018 at 2:21pm</div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                            <p><a href="#" class="reply">Reply</a></p>
                            </div>
                        </li>
                        </ul>
                        <!-- END comment-list -->
                        
                        <div class="comment-form-wrap pt-5">
                        <h3 class="mb-5">Leave a comment</h3>
                        <form action="#" class="">
                            <div class="form-group">
                            <label for="name">Name *</label>
                            <input type="text" class="form-control" id="name">
                            </div>
                            <div class="form-group">
                            <label for="email">Email *</label>
                            <input type="email" class="form-control" id="email">
                            </div>
                            <div class="form-group">
                            <label for="website">Website</label>
                            <input type="url" class="form-control" id="website">
                            </div>

                            <div class="form-group">
                            <label for="message">Message</label>
                            <textarea name="" id="message" cols="30" rows="10" class="form-control"></textarea>
                            </div>
                            <div class="form-group">
                            <input type="submit" value="Post Comment" class="btn py-3 px-4 btn-primary">
                            </div>

                        </form>
                    </div>
                </div>

                </div> <!-- .col-md-8 -->
                <div class="col-md-4 sidebar pl-md-5">
                    <div class="sidebar-box">
                        <!-- echo get_avatar(get_the_ID()) - выводит изображение профиля пользователя, который добавил статью. -->
                        <?php echo get_avatar(get_the_ID()); ?>
                        <h3>About The Author</h3>
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