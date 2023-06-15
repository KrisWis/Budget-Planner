<?php

/* Создаём функция, которая будет доставать все стили, скрипты и тд. */
function strategy_assets() {

	wp_enqueue_style( "bootstrap", get_template_directory_uri() . '/assets/css/bootstrap.min.css' );

	wp_enqueue_style( "aos", get_template_directory_uri() . '/assets/css/aos.min.css' );

	wp_enqueue_style( "hamb", get_template_directory_uri() . '/assets/hamburgers/hamburgers.min.css' );

	wp_enqueue_style( "owl", get_template_directory_uri() . '/assets/css/owl.carousel.min.css' );

	wp_enqueue_style( "icomoon", get_template_directory_uri() . '/assets/fonts/icomoon/style.css' );

	wp_enqueue_style( "anim", get_template_directory_uri() . '/assets/css/animsition.min.css' );

	/* Достаём наш файл стилей. get_template_directory_uri() достаёт полный путь до нашей папки и соединяем с путём до файла со стилями. 
	maincss лучше подключать самым последним из css файлов. */
	wp_enqueue_style( "maincss", get_template_directory_uri() . '/assets/css/style.css' );

	/* Подключаем скрипты JavaScript. */
	wp_enqueue_script( 'script-all', get_template_directory_uri() . '/assets/js/scripts-all.js', array(), '20151215', true );
    
    wp_enqueue_script( 'main', get_template_directory_uri() . '/assets/js/main.js', array(), '20151215', true );
}

/* add_action() - вызывает нужное нам событие в WordPress. 
В нашем случае, мы хотим добавить в WordPress все скрипты, и вызываем соотвествующую функцию. */
add_action( 'wp_enqueue_scripts', 'strategy_assets' );

// show_admin_bar(false) - скрывает админ-панель.
show_admin_bar(false);

add_theme_support('post-thumbnails');

add_theme_support('post-thumbnails', array('portfolio'));

// Добавляем поддержку нашего меню, которое добавили в WordPress.
add_theme_support("menus");

// Добавляем событие в WordPress, чтобы была отправка почты, и указываем нашу функцию, которая будет осуществлять это.
add_action("wp_ajax_callback_mail", "callback_mail");

// Следующее событие делает так, чтобы привелегии не учитывались и почту могли отправлять и обычный пользователь, и админ.
add_action("wp_ajax_nopriv_callback_mail", "callback_mail");

// Функция для отправки почты.
function callback_mail() {
	/* Инициализируем переменные, обращаясь к специальной переменной $_POST, которая отвечает за данные формы. 
	В скобках указываем текст, который указан в атрибуте name у input`ов в форме. */
	$name = $_POST['name'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$zone = $_POST['zone'];
	$budget = $_POST['budget'];
	$type = $_POST['type'];

	// В переменную $to добавляем электронную почту, на которую должно будет придти сообщение формы.
	$to = "nekrasov.2h@yandex.ru";
	$subject = "asd";
	$message = "asd";

	// Специальные фильтры, чтобы всё правильно работало.
	remove_all_filters("wp_mail_from");
	remove_all_filters("wp_mail_from_name");

	// Специальный массив, в котором собраны данные для отправки формы.
	$headers = array(
		'From: Me Myself <me@example.net>',
		'content-type: text/html',
		'Cc: John Q Codex <jqc@wordpress.org>',
		'Cc: iluvwp@wordpress.org', // тут можно использовать только простой email адрес
	);

	// В функцию wp_mail() мы передаём данные, и отправляем с помощью неё письмо.
	wp_mail($to, $subject, $message, $headers);
	
	// Функция wp_die() завершает функцию.
	wp_die();
}