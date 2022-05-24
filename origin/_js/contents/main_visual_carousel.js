//
// メインビジュアル　カルーセルの設定
// ==================================================
//

import Swiper from '../vender/swiper/swiper.min.js';
import '../vender/swiper/swiper.min.css';

// jQueryプラグイン　Swiper　の設定

$(function () {

	// 要素（id）に対するカルーセルの挙動設定
	// --------------------------------------------------
	// .swiper-container に、以下で指定するidを付与する事で、
	// 複数の異なる設定のカルーセルを設置できる。

	// ### カルーセル
	// カルーセル設定
	var visual = new Swiper('#swiper', { //対象カルーセルのidを指定（.swiper-container にid付与）
		navigation: {
			nextEl: '.next', //次へのボタン要素名
			prevEl: '.prev' //前へのボタン要素名
		},
		pagination: {
			el: '.pagination', //ページネーションの要素名
			type: 'bullets', // bullets, fraction, progressbar, custom
			clickable: true
		},
		effect:'slide', //slide, fade, cube, coverflow, flip
		roundLengths: true, //中身をぼやけさせない設定
		slidesPerView: 'auto',
		centeredSlides: true,
		paginationClickable: true,
		spaceBetween: 30,
		loop: true,
		loopedSlides: 7, // コンテンツの数＋2 の数字を指定（指定が漏れると、ループの最後のリンクが反応しなくなる事が多い）
		autoplay: {
			delay: 3000
		}
	});

	// ### カルーセル2
	// 全幅ワイド　左右見切れタイプのカルーセル設定
	// var visual = new Swiper('#swiper_wide', { //対象カルーセルのidを指定（.swiper-container にid付与）
	// 	navigation: {
	// 		nextEl: '.swiper-button-next', //次へのボタン要素名
	// 		prevEl: '.swiper-button-prev' //前へのボタン要素名
	// 	},
	// 	pagination: {
	// 		el: '.pagination-wide', //ページネーションの要素名
	// 		type: 'bullets', // bullets, fraction, progressbar, custom
	// 		clickable: true
	// 	},
	// 	effect:'slide', //slide, fade, cube, coverflow, flip
	// 	roundLengths: true, //中身をぼやけさせない設定
	// 	slidesPerView: 'auto',
	// 	centeredSlides: true,
	// 	paginationClickable: true,
	// 	spaceBetween: 30,
	// 	loop: true,
	// 	loopedSlides: 7, // コンテンツの数＋2 の数字を指定（指定が漏れると、ループの最後のリンクが反応しなくなる事が多い）
	// 	autoplay: {
	// 		delay: 3000
	// 	}
	// });


	// 共通設定(Qwi独自)
	// --------------------------------------------------
	//
	// Swiperから直接リンクが効かない事があるため、classを付与する事によりjsで遷移可能にする。
	$('.swiper-slide a').on('click', function () {
		var url = $(this).attr('href');
		// 以下1、2のうちどちらかを使用
		// 1・　通常の遷移
		// location.href = url;
		// 2・　別ウィンドウで表示
		// window.open(url);
		location.href = url;
		event.preventDefault();
	});

	// マウスホバーでオートプレイを止める処理
	$('.swiper-slide').on('touchstart mouseenter', function () {
		visual.autoplay.stop();
	});

	// オートプレイを再開する処理
	$('.swiper-slide').on('mouseleave', function () {
		visual.autoplay.start();
	});

});
