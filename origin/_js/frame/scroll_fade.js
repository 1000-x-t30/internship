$(window).on('load', function() {
//---


// scroll_fade
// ============================================================
// ページスクロールの分量に応じて、要素をフェードイン、フェードアウトする。
//

	// 初期設定
	// --------------------------------------------------
	// 対象とする要素
	var fixed_target = $('.scroll_fade');
	// 画面最上部からの距離(px)
	var scrollFade_pos = 600;


	// 実行処理
	// --------------------------------------------------
	// 指定要素がHTML上にある場合のみ処理を実行
	if(fixed_target.length >= 1) {

		// ページロード時には対象を非表示(※チラつき防止のため、CSS側でもdisplay:noneのプロパティ必須)
		fixed_target.hide();
		$(window).scroll(function(){
			//最上部から現在位置までの距離を取得して、変数[now]に格納
			var now = $(window).scrollTop();
			//最上部から現在位置までの距離(now)が200以上の時
			if(now > scrollFade_pos){
				//フェードインする
				fixed_target.fadeIn(400);
			//それ以外だったらフェードアウトする
			}else{
				fixed_target.fadeOut(400);
			}
		});
	} else {
		// 指定必須要素が無い場合には何もしない
		return false;
	};

// scroll_top-btn-fixed END



//---
}); // function END


