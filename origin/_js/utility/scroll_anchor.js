$(function(){
//---


// scroll_anchor
// ============================================================
// ページ内スクロールのためのjs
// インポートするだけで「#」付きのアンカーリンクがスムーススクロールになる。
// 


	// 初期設定
	// --------------------------------------------------
	// 移動後の上部の余白を指定する
	// gnavをfixさせている場合は.ナビゲーションの要素の高さを入れる

	// 上部にバー上の固定要素があれば、その高さを指定
	var navbar_height = 0;　
	// スクロール時に、対象の要素の上部に必要な余白感を指定
	var top_margin = 0;　
	// バー固定分と必要な余白感を足して実際のスペースを決定
	var top_space = navbar_height + top_margin;
	// スクロールスピード
	var speed = 500;
	// スクロールアニメーションのタイプ(デフォルトでは、linear/swingのどちらか)
	var easing = "swing";

	// クリックした要素が特定のセレクタに合致する場合、trueを返すよう条件式を書いて設定する
	// * モジュールごとに個別のスクロール挙動を設定している場合などに使用する
	// * 初期状態ではモバイル用メニュー内のリンクには反応しないよう設定している
	function is_exclude(element) {
		if ($(element).parents().closest('.scm-move_slide_side--container').length) {
			return true;
		} else {
			return false;
		}
	}

	// 関数
	// --------------------------------------------------

	/**
	 * a要素のhref属性値を絶対パスにして返す関数
	 * @param  {String} pathname 変換したいパスの文字列
	 * @return {String}      変換した絶対パス
	 */
	function convert_absolute_path(pathname) {
		/**
		 * 絶対パスの変換に利用するa要素を作成する
		 * @type {Object}
		 */
		var anchor = document.createElement('a');
		anchor.href = pathname;

		return anchor.href;
	}

	/**
	 * URLやパスからハッシュ（#）以降を削除して返す関数
	 * @param  {String} url ハッシュを削除したいURLの文字列
	 * @return {String}     ハッシュ削除後のURL文字列
	 */
	function remove_hash(url) {
		/**
		 * ハッシュ削除後のURL
		 * @type {String}
		 */
		var removed_url = url.replace(/#.*$/,'');

		return removed_url;
	}


	/**
	 * ページスクロールを実行する関数
	 * @param  {String} href スクロール先のid指定が含まれたパス文字列
	 */
	function page_scroll(href) {

		/**
		 * href属性値にmatchをかけて配列で情報を取得
		 * @type {Array}
		 */
		var target_match = href.match(/#.+/);

		// #の後に一文字でも入っていれば、ページ内アンカーの処理を実行
		if(target_match != null){

			/**
			 * ターゲットとなるidを#（シャープ）つきのセレクタ形式で取得
			 * @type {String}
			 */
			var target = $(target_match[0]);

			/**
			 * ターゲットの座標を取得
			 * @type {Number}
			 */
			var position = target.offset().top - top_space;

			// URLを整形
			setTimeout(function(){
				var locPath = href;
				window.history.replaceState('','', locPath);
			},1);
			$("html, body").animate({scrollTop:position}, speed, easing);
		}
		// #のみの場合は、ページ最上部へスクロール
		else {
			// URLを整形
			setTimeout(function(){
				var locPath = location.pathname;
				window.history.replaceState('','', locPath);
			},1);
			$("html, body").animate({scrollTop:0}, speed, easing);
		}
	}


	// 実行処理
	// --------------------------------------------------
	// ページ最上部スクロールと、任意のアンカーへのスクロールを、HTMLの#の指定のみで目的のスクロールをおこなう
	// 

	$('a[href*="#"]').click(function(e){
		/**
		 * href属性値を取得
		 * @type {String}
		 */
		var href = $(this).attr('href');

		/**
		 * 取得したhref属性値を絶対パスに変換してハッシュ以降を削除
		 * @type {String}
		 */
		var target_url = remove_hash(convert_absolute_path(href));

		/**
		 * 現在のURLからハッシュ以降を削除して取得
		 * @type {String}
		 */
		var current_url = remove_hash(location.href);

		// 除外対象でなく、かつ別ページへの遷移を含まない場合のみページスクロールを実行する
		if (is_exclude(this) === false && target_url === current_url) {
			page_scroll(href);
			// URLはjsで整形するため、HTMLでの#付与を停止させる（画面のブレ防止）
			e.preventDefault();
		}
	});
// ページ内アンカースクロール　END

//---
}); // function END


