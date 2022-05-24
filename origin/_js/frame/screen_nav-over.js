// スクリーンナビゲーション（オーバーレイ式）の表示・非表示切替処理
// ==================================================
// オーバーレイ式メニューの場合はウィンドウ幅とメニュー幅の差分に応じて
// メニュー項目をクリックした場合のスクロールアニメーションが異なる
//

$(window).on('load', function() {

	// 設定
	// ==================================================

	/**
	 * CSSのtransition-duration に設定した値をミリ秒に変換して設定（0.1s = 100）
	 * （開閉挙動後に処理する際に使用する）
	 * @type {Number}
	 */
	 var css_transition_duration = 300;

	 /**
		* メニューの各構造部の名前を.（ドット）または#（シャープ）つきのセレクタ形式で設定
		* @type {String}
		*/
	 var menu_selector        = '.screen_nav';
	 var menu_header_selector = '.screen_nav--header';
	 var menu_main_selector   = '.screen_nav--body';
	 var menu_footer_selector = '.screen_nav--footer';

	 /**
		* メニューを開くボタンの名前を.（ドット）または#（シャープ）つきのセレクタ形式で設定
		* @type {String}
		*/
	 var open_trigger_selector = '.screen_nav--btn-open';

	 /**
		* メニューを閉じるボタンの名前を.（ドット）または#（シャープ）つきのセレクタ形式で設定
		* @type {String}
		*/
	 var close_trigger_selector = '.screen_nav--btn-close';

	 /**
		* コンテンツ部分を覆う下地の出力切替用変数（0を代入すると無効）
		* @type {Number}
		*/
	 var ground_enabled = 1;

	 /**
		* コンテンツ部分を覆う下地に付与するclass名を指定（ドットやシャープは含まない）
		* @type {String}
		*/
	 var ground_name = 'screen_nav-ground';

	 /**
		* ウィンドウ幅とメニュー幅の差分値を指定（下回るとメニュー内のリンクをクリックでメニューを閉じる挙動に切り替える）
		* @type {Number}
		*/
	 var close_difference_threshold = 100;

	 /**
		* メニュー開閉のためのclassを埋め込む対象となる要素の指定
		* @type {String}
		*/
	 var state_target = 'body';
	 // js使用の識別子をメニュー開閉のためのclassを埋め込む対象となる要素に埋め込む
	 $(state_target).addClass('use-screen_nav');

	 /**
		* メニュー開閉のためのclass名を指定（ドットやシャープは含まない）
		* @type {String}
		*/
	 var open_state_name = 'screen_nav-is-open';


	 // ページスクロールの設定
	 // --------------------------------------------------

	 // 上部にバー上の固定要素があれば、その高さを指定
	 var navbar_height = 0;　
	 // スクロール時に、対象の要素の上部に必要な余白感を指定
	 var top_margin = 0;　
	 // バー固定分と必要な余白感を足して実際のスペースを決定
	 var top_space = navbar_height + top_margin;
	 // スクロールスピード
	 var speed = 500;
	 // スクロールアニメーションのタイプ(デフォルトでは、linear/swingのどちらか)
	 var easing = 'swing';




	// 処理用の変数（編集禁止）
	// ==================================================

	/**
	 * スクロール座標の保持用変数
	 * @type {Number}
	 */
	var scroll_position = 0;

	// 関数
	// ==================================================

	/**
	 * ウィンドウとメニュー幅の差分を計測する関数
	 * @return {Number} 差分の数値を返す
	 */
	function calculate_difference() {

		var window_width = $(window).innerWidth();

		var menu_width   = $(menu_selector).innerWidth();

		return window_width - menu_width;
	}

	/**
	 * メニューを開く関数
	 */
	function open_menu() {
		// メニュー内構造部分のリセット
		reset_menu_construction()

		/**
		 * 現在のスクロール座標を取得
		 * @type {Number}
		 */
		scroll_position = $(document).scrollTop();

		// 現在のスクロール座標を負の数にしてtopに設定
		$('.l-site--outer', state_target).css('top', (scroll_position * -1)+'px');

		// メニューを開くためのclassを付与
		$(state_target).addClass(open_state_name);
	}

	/**
	 * メニューを閉じる関数
	 */
	function close_menu() {
		$('.l-site--outer', state_target).css('top', '');
		$(state_target).removeClass(open_state_name);
	}

	/**
	 * スクロール位置の復元用関数
	 */
	function recover_scroll_position() {
		$(document).scrollTop(scroll_position);
	}

	/**
	 * メニュー内の構造部リセット用関数
	 */
	function reset_menu_construction() {

		/**
		 * メニューコンテナの高さを取得
		 * @type {Number}
		 */
		var menu_container_height = $(menu_selector).innerHeight();

		/**
		 * メニューヘッダー部とメニューフッター部の高さを取得
		 * @type {Number}
		 */
		var menu_header_height = $(menu_header_selector).innerHeight();
		var menu_footer_height = $(menu_footer_selector).innerHeight();

		/**
		 * メニューメイン部の上下padding値を取得
		 * @type {Number}
		 */
		// var menu_main_padding_top    = parseInt($(menu_main_selector).css('padding-top'));
		var menu_main_padding_bottom = parseInt($(menu_main_selector).css('padding-bottom'));

		/**
		 * メニューメイン部の高さを算出
		 * @type {Number}
		 */
		// var menu_main_height = menu_container_height - menu_header_height - menu_footer_height - menu_main_padding_top - menu_main_padding_bottom;
		var menu_main_height = menu_container_height - menu_header_height - menu_footer_height - menu_main_padding_bottom;


		// メニューメイン部のheightを設定
		$(menu_main_selector).height(menu_main_height);

		// メニューコンテナ部の上下paddingにメニューヘッダー部・メニューフッター部の高さを設定
		// $(menu_selector).css('padding-top', menu_header_height);
		$(menu_selector).css('padding-bottom', menu_footer_height);
	}

	/**
	 * CSSのtopプロパティによるページ内スクロール
	 * @param  {String} href   URL書換に使用する文字列
	 * @param  {Object} target ターゲットとなる要素のオブジェクト
	 */
	function scroll_by_css_top(href, target) {
		/**
		 * ターゲットの座標を取得
		 * @type {Number}
		 *
		 * target.offset().topの値に小数点が入り込む場合があり、メニューを閉じる際にズレて動くのでparseInt()により整数化する
		 */
		var position = parseInt(target.offset().top - top_space);

		// スクロールポジションを更新
		scroll_position = position + (parseInt($('.l-site--outer', state_target).css('top')) * -1);

		// URLを整形
		setTimeout(function(){
			var locPath = href;
			window.history.replaceState('','', locPath);
		},1);
		$('.l-site--outer', state_target).animate({'top': (scroll_position * -1)+'px'});
	}

	/**
	 * jQueryのanimateによるページ内スクロール
	 * @param  {String} href   URL書換に使用する文字列
	 * @param  {Object} target ターゲットとなる要素のオブジェクト
	 */
	function scroll_by_animate(href, target) {
		/**
		 * ターゲットの座標を取得
		 * @type {Number}
		 *
		 * target.offset().topの値に小数点が入り込む場合があり、メニューを閉じる際にズレて動くのでparseInt()により整数化する
		 */
		var position = parseInt(target.offset().top - top_space);

		// URLを整形
		setTimeout(function(){
			var locPath = href;
			window.history.replaceState('','', locPath);
		},1);
		$("html, body").animate({scrollTop:position}, speed, easing);
	}


	// 開くボタンのクリック（タップ）による処理
	// ==================================================

	$(open_trigger_selector).on('click', function (event) {

		// メニュー開閉のためのclass埋め込みとフラグの処理
		// --------------------------------------------------
		if ($(state_target).hasClass(open_state_name)) {
			close_menu();
			recover_scroll_position();
		} else {
			open_menu();
		}

		event.preventDefault();
	});


	// 閉じるボタンのクリック（タップ）による処理
	// ==================================================

	$(close_trigger_selector).on('click', function (event) {
		close_menu();
		recover_scroll_position();
		event.preventDefault();
	});


	// モバイルメニューの範囲外クリック（タップ）による処理
	// ==================================================
	$(document).on('click touchend', function (event) {
		// 範囲外の領域をクリック（タップ）した場合の処理
		if (!$(event.target).closest(menu_selector).length && !$(event.target).closest(open_trigger_selector).length) {
			if ($(state_target).hasClass(open_state_name)) {
				close_menu();
				recover_scroll_position();

				return false;
			}
		}
	});

	// 範囲内のリンク（閉じるボタン以外）をクリック（タップ）した場合の処理
	$('a', menu_selector).on('click', function (event) {

		/**
		 * close_trigger_selectorから.と#を削除して代入する
		 * @type {String}
		 */
		var close_trigger_text = close_trigger_selector.replace(/\.|\#/, '');

		if (!$(this).hasClass(close_trigger_text) && !$(this).attr('id') != close_trigger_text) {
			/**
			 * href属性値を取得
			 * @type {String}
			 */
			var href = $(this).attr('href');

			/**
			 * href属性値にmatchをかけて配列で情報を取得
			 * @type {Array}
			 */
			var target_match = href.match(/#.+/);

			/**
			 * ターゲットとなるidを#（シャープ）つきのセレクタ形式で取得
			 * @type {String}
			 */
			var target = $(target_match[0]);


			// ウィンドウサイズとメニューの幅の差分が指定値を下回る場合の挙動
			if (calculate_difference() < close_difference_threshold) {
				close_menu();
				recover_scroll_position();

				// 該当する要素があればページ内スクロール
				if($(target).length){
					setTimeout(function () {
						scroll_by_animate(href, target);
					}, css_transition_duration);

					event.preventDefault();
				}

			}
			// ウィンドウサイズとメニューの幅の差分が指定値以上の場合の挙動
			else {
				// 該当する要素があればページ内スクロール
				if($(target).length){
					setTimeout(function () {
						scroll_by_css_top(href, target);
					}, 100);

					event.preventDefault();
				}
			}
		}
	});


	// ウィンドウリサイズでメニューを閉じる処理
	// ==================================================

	// UserAgentを小文字で取得
	var ua = navigator.userAgent.toLowerCase();

	//
	// スマホ回転時にも処理したほうがよいのでコメントアウト（識別処理が必要になったら戻せるように）
	//

	// 識別処理
	// --------------------------------------------------
	//
	// //smartphone
	// if(ua.indexOf('iphone') != -1 || ua.indexOf('ipod') != -1 || (ua.indexOf('android') != -1 && ua.indexOf('mobile') != -1 ) ) {
	// 	var device = 'smartphone';
	// }
	// //tablet
	// else if(ua.indexOf('ipad') != -1 || ua.indexOf('android') != -1) {
	// 	var device = 'tablet';
	// }
	// //PC
	// else {
	// 	var device = 'pc';
	// }

	// // PCの時だけ処理をおこなう
	// if (device == 'pc') {

		// iOS Safari対策のため横幅リサイズ時のみ挙動させる
		// --------------------------------------------------
		//

		/**
		 * 画面表示時の横幅を記憶させる
		 * @type {[type]}
		 */
		var currentWidth = window.innerWidth;

		// ウィンドウリサイズ時の処理
		$(window).on('orientationchange resize', function (event) {
			if (currentWidth == window.innerWidth) { // ウィンドウ幅が変わっていなければ処理をキャンセル
				return;
			}

			setTimeout(function () {
				currentWidth = window.innerWidth;
			}, 100);

			// メニューを開いた状態でリサイズした場合のみスクロールポジションを復元する
			if ($(state_target).hasClass(open_state_name)) {
				close_menu();
				recover_scroll_position();
			} else {
				close_menu();
			}
		});

	// }


	// 画面読込直後の処理
	// ==================================================

	// コンテンツ部分を覆う下地となる要素を出力
	if (ground_enabled) {
		$(menu_selector).parent().append('<div class="'+ground_name+'"></div>');
	}
});

