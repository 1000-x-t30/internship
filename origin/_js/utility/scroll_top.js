$(function(){
//---


// scroll_top
// ============================================================
// ページ最上部へのスクロール用js
// トリガーとなる要素に`.scroll_top`を付与する
//

	// 初期設定
	// --------------------------------------------------
	// 対象とする要素
	var scrollTop_trigger = $('.scroll_top');
	// スクロールスピード
	var speed = 500;
	// スクロールアニメーションのタイプ(デフォルトでは、linear/swingのどちらか)
	var easing = "swing"


	// 実行処理
	// --------------------------------------------------
	// 指定要素がHTML上にある場合のみ処理を実行
	if(scrollTop_trigger.length >= 1) {
		scrollTop_trigger.click(function(e){
			$("html, body").animate({scrollTop:0}, speed, easing);
			// HTMLでの#付与を停止させる（画面のブレ防止）
			e.preventDefault();
		});
	} else {
		// 指定必須要素が無い場合には何もしない
		return false;
	};

// scroll_top END



//---
}); // function END


