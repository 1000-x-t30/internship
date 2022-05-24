/**
 * 対称となるバージョンのブラウザにメッセージを表示する
 * ==================================================
 */


/**
 * 各種設定
 * --------------------------------------------------
 */

/**
 * 設定に使用するネームスペースとなるオブジェクト（編集禁止）
 * @type {Object}
 */
var browsing_notice_settings = {};

/**
 * テストモードの有効設定
 * @type {Number}
 *
 * 0: 以下の設定に応じてメッセージを表示する
 * 1: 以下の設定に関係なく常にメッセージを表示する（Cookie削除ボタンも表示される）
 */
browsing_notice_settings.test_mode = 1;


/**
 * 各ブラウザの有効設定
 * @type {Object}
 *
 * 0: メッセージを表示しない
 * 1: 設定したバージョン以下の場合でメッセージを表示する
 */
browsing_notice_settings.target_browser = {
	'windows': {
		'edge':          0,
		'ie':            1,
		'chrome':        1,
		'firefox':       1,
		'other_browser': 0
	},
	'macos': {
		'safari':        1,
		'chrome':        1,
		'firefox':       1,
		'other_browser': 0
	},
	'ios': {
		'safari':        0,
		'chrome':        0,
		'firefox':       0,
		'other_browser': 0
	},
	'android': {
		'chrome':        0,
		'firefox':       0,
		'standard':      0, // Android標準ブラウザ
		'other_browser': 0
	}
};

/**
 * 各ブラウザのターゲットバージョン設定
 * @type {Object}
 *
 * バージョンは文字列で指定
 * 指定したバージョン以下の場合にメッセージを表示する（有効設定が1の場合のみ）
 * 名称の特定できるブラウザ以外（other_browser）はバージョン設定は省略
 */

browsing_notice_settings.target_version = {
	'windows': {
		'edge':    '0',
		'ie':      '10',
		'chrome':  '21',
		'firefox': '28'
	},
	'macos': {
		'safari':  '6.1',
		'chrome':  '21',
		'firefox': '28'
	},
	'ios': {
		'safari':  '0',
		'chrome':  '0',
		'firefox': '0'
	},
	'android': {
		'chrome':   '0',
		'firefox':  '0',
		'standard': '0' // Android標準ブラウザ
	}
};


/**
 * メッセージテンプレート
 * @type {String}
 *
 * ヒアドキュメントでhtmlを記述する
 *
 * ■ 置換文字リスト
 * [version] ブラウザのバージョン
 */
browsing_notice_settings.message = (function () {/*
	<div class="browsing_notice">
		<aside>
			<div class="browsing_notice-inner">
				<div class="browsing_notice-header">
					<div class="headline">
						<h1 class="title">閲覧環境に関するお知らせ</h1>
					</div>
				</div>
				<div class="browsing_notice-body">
					<p>ご利用中のブラウザは[version]よりも古いバージョンです</p>
					<p>ご利用ブラウザが対応していない処理を使用しているため、一部で表示崩れが発生する可能性があります</p>
					<p>最適な環境でご覧頂くには、お使いのブラウザの最新版をインストールしてご覧下さい</p>
					<p>この表示を閉じることができない場合はブラウザを更新（F5）してください</p>
				</div>
				<div class="browsing_notice-footer">
					<a href="javascript:void(0)" class="js-close_browsing_notice">閉じる</a>
				</div>
			</div>
		</aside>
	</div>
*/}).toString().replace(/(\n)/g, '').split('*')[1];





// =============== 設定ここまで（以下編集禁止） ===============






/**
 * UserAgentを判定してメッセージを表示する一連の処理
 * --------------------------------------------------
 */

/**
 * 処理に使用するネームスペースとなるオブジェクト
 * @type {Object}
 */
var browsing_notice = {};

/**
 * バージョンを配列化するメソッド
 * @param  {String} version バージョンを表すドット区切りの文字列
 * @return {Array}          バージョンをドットで区切った配列
 */
browsing_notice.to_array_version = function (version) {
	version_array = version.split('.');
	for (var i=0; i < version_array.length; i++) {
		version_array[i] = parseFloat(version_array[i]) || 0;
	}
	return version_array;
};

/**
 * ターゲットバージョンよりも新しいかを判定するメソッド
 * @param  {Array}   current_version 現在のバージョン
 * @param  {Array}   target_version  ターゲットバージョン
 * @return {Boolean} true または falseを返す
 */
browsing_notice.is_new_than_target = function (current_version, target_version) {

	/**
	 * 現在のバージョンがターゲットよりも新しいかを判定用
	 * @type {Boolean}
	 */
	var is_new = true;

	for (var i=0; i < target_version.length; i++) {
		if ([i] in current_version && target_version[i] > current_version[i]) {
			is_new = false;
			break;
		} else if (!current_version[i] && current_version[i] !== 0) {
			break;
		}
	}

	return is_new;
};


/**
 * 合致するOSでの閲覧時にtrueを返すメソッド群
 * @param  {String}  ua 全て小文字にしたUserAgent
 * @return {Boolean}    trueまたはfalse
 */
browsing_notice.is_windows = function (ua) {
	if (ua.match('windows')) {
		return true;
	} else {
		return false;
	}
};
browsing_notice.is_macos = function (ua) {
	if (ua.match('macintosh')) {
		return true;
	} else {
		return false;
	}
};
browsing_notice.is_ios = function (ua) {
	if (ua.match('iphone') || ua.match('ipod') || ua.match('ipad')) {
		return true;
	} else {
		return false;
	}
};
browsing_notice.is_android = function(ua) {
	if (ua.match('android')) {
		return true;
	} else {
		return false;
	}
};


/**
 * 合致するブラウザでの閲覧時にtrueを返すメソッド群
 * @param  {String}  ua 全て小文字にしたUserAgent
 * @return {Boolean}    trueまたはfalse
 */
browsing_notice.is_chrome = function (ua) {
	if (ua.match('chrome') && !ua.match('edge')) {
		return true;
	} else {
		return false;
	}
};
browsing_notice.is_firefox = function (ua) {
	if (ua.match('firefox')) {
		return true;
	} else {
		return false;
	}
};
browsing_notice.is_safari = function (ua) {
	if (ua.match('safari') && !ua.match('chrome') && !ua.match('linux; u;')) {
		return true;
	} else {
		return false;
	}
};
browsing_notice.is_edge = function (ua) {
	if (ua.match('edge') && ua.match('chrome') && !ua.match('opera')) {
		return true;
	} else {
		return false;
	}
};
browsing_notice.is_ie = function (ua) {
	if ((ua.match('msie') || ua.match('trident/7')) && !ua.match('chrome') && !ua.match('opera')) {
		return true;
	} else {
		return false;
	}
};
browsing_notice.is_standard = function (ua) {
	if ((ua.match('android')) && ua.match('linux; u;') && !ua.match('chrome') || (ua.match('android'))  && ua.match('chrome') && ua.match('version')) {
		return true;
	} else {
		return false;
	}
};


/**
 * 全て小文字にしたUserAgent
 * @type  {String}
 */
browsing_notice.ua = (function () {
	var ua = window.navigator.userAgent;
	ua = ua.toLowerCase();

	return ua;
})();


/**
 * OS名
 * @type  {String}
 */
browsing_notice.os_name = (function () {
	switch (true) {
		case browsing_notice.is_windows(browsing_notice.ua):
			return 'windows';

		case browsing_notice.is_macos(browsing_notice.ua):
			return 'macos';

		case browsing_notice.is_ios(browsing_notice.ua):
			return 'ios';

		case browsing_notice.is_android(browsing_notice.ua):
			return 'android';

		default:
			return 'other_os';
	}
})();

/**
 * ブラウザ名
 * @type  {String}
 */
browsing_notice.browser_name = (function () {
	switch (true) {
		case browsing_notice.is_edge(browsing_notice.ua):
			return 'edge';

		case browsing_notice.is_ie(browsing_notice.ua):
			return 'ie';

		case browsing_notice.is_chrome(browsing_notice.ua):
			return 'chrome';

		case browsing_notice.is_firefox(browsing_notice.ua):
			return 'firefox';

		case browsing_notice.is_safari(browsing_notice.ua):
			return 'safari';

		case browsing_notice.is_standard(browsing_notice.ua):
			return 'standard';

		default:
			return 'other_browser';
	}	
})();

/**
 * ブラウザのバージョン
 * @type  {Array}
 */
browsing_notice.browser_version = (function () {
	/**
	 * バージョン
	 * @type {Number}
	 */
	var version = 0;

	// バージョン判定処理
	switch (browsing_notice.os_name) {
		case 'windows':
			switch (browsing_notice.browser_name) {
				case 'edge':
					version = browsing_notice.ua.match(/edge\/[0-9]+\.[0-9]+/)[0].replace('edge/','');
					break;
				case 'ie':
					// IE11
					if (browsing_notice.ua.indexOf('msie') === -1) {
						version = browsing_notice.ua.match(/rv:([0-9]+\.*)+/)[0].replace('rv:','');
					// IE10以前
					} else {
						version = browsing_notice.ua.match(/msie\s([0-9]+\.*)+/)[0].replace('msie ','');
					}
					break;
				case 'chrome':
					version = browsing_notice.ua.match(/chrome\/([0-9]+\.*)+/)[0].replace('chrome/','');
					break;
				case 'firefox':
					version = browsing_notice.ua.match(/firefox\/([0-9]+\.*)+/)[0].replace('firefox/','');
					break;
				case 'other_browser':
					version = 0;
					break;
			}
			break;

		case 'macos':
			switch (browsing_notice.browser_name) {
				case 'safari':
					version = browsing_notice.ua.match(/version\/([0-9]+\.*)+/)[0].replace('version/','');
					break;
				case 'chrome':
					version = browsing_notice.ua.match(/chrome\/([0-9]+\.*)+/)[0].replace('chrome/','');
					break;
				case 'firefox':
					version = browsing_notice.ua.match(/firefox\/([0-9]+\.*)+/)[0].replace('firefox/','');
					break;
				case 'other_browser':
					version = 0;
					break;
			}
			break;

		case 'ios':
			switch (browsing_notice.browser_name) {
				case 'safari':
					version = browsing_notice.ua.match(/version\/([0-9]+\.*)+/)[0].replace('version/','');
					break;
				case 'chrome':
					version = browsing_notice.ua.match(/chrome\/([0-9]+\.*)+/)[0].replace('chrome/','');
					break;
				case 'firefox':
					version = browsing_notice.ua.match(/firefox\/([0-9]+\.*)+/)[0].replace('firefox/','');
					break;
				case 'other_browser':
					version = 0;
					break;
			}
			break;

		case 'android':
			switch (browsing_notice.browser_name) {
				case 'chrome':
					version = browsing_notice.ua.match(/chrome\/([0-9]+\.*)+/)[0].replace('chrome/','');
					break;
				case 'firefox':
					version = browsing_notice.ua.match(/firefox\/([0-9]+\.*)+/)[0].replace('firefox/','');
					break;
				case 'standard':
					version = browsing_notice.ua.match(/android ([0-9]+\.*)+/)[0].replace('android ','');
					break;
				case 'other_browser':
					version = 0;
					break;
			}
			break;

		case 'other_os':
			switch (browsing_notice.browser_name) {
				case 'chrome':
					version = browsing_notice.ua.match(/chrome\/([0-9]+\.*)+/)[0].replace('chrome/','');
					break;
				case 'firefox':
					version = browsing_notice.ua.match(/firefox\/([0-9]+\.*)+/)[0].replace('firefox/','');
					break;
				case 'other_browser':
					version = 0;
					break;
			}
			break;
	}

	return version;
})();

// 実行処理
$(function () {

	// テストモードの場合のみ各種変数の値をconsoleに出力する
	if (browsing_notice_settings.test_mode === 1) {
		console.log('UserAgent: '+browsing_notice.ua);
		console.log('現在のOS: '+browsing_notice.os_name);
		console.log('現在のブラウザ: '+browsing_notice.browser_name);
		console.log('現在のバージョン: '+browsing_notice.browser_version);
		console.log('ターゲットバージョン: '+browsing_notice_settings.target_version[browsing_notice.os_name][browsing_notice.browser_name]);
	}

	/**
	 * クッキーが設定されているかの判定用変数
	 * @type {Number}
	 */
	browsing_notice.cookie = document.cookie.indexOf('browsing_notice=1');

	// テストモードの場合のみクッキー削除ボタンを表示する
	if (browsing_notice.cookie != -1 && browsing_notice_settings.test_mode === 1) {
		$('body').append('<a href="javascript:void(0)" class="js-cookie_clear" style="position:fixed;top:0;left:0;display:block;padding:4px;background:#fff;border:solid #cdcdcd;border-width: 0 1px 1px;border-radius:0 0 4px 0;box-shadow:0 1px 1px rgba(0,0,0,0.1);color:#333;font-size:12px;">Cookie削除</a>');
		$('.js-cookie_clear').on('click', function () {
			document.cookie = "browsing_notice=; max-age=0";
			location.reload();
		});
	}

	// クッキーが設定されていない場合のみ処理する
	if (browsing_notice.cookie == -1) {

		// メッセージ表示処理（テストモードで強制的に処理 それ以外では現在のブラウザが対象ブラウザになっていれば処理）
		if (browsing_notice_settings.target_browser[browsing_notice.os_name][browsing_notice.browser_name] === 1 || browsing_notice_settings.test_mode === 1) {

			/**
			 * 現在のバージョン
			 * @type {Array}
			 */
			browsing_notice.current_version = browsing_notice.to_array_version(browsing_notice.browser_version);

			/**
			 * ターゲットバージョン
			 * @type {Array}
			 */
			browsing_notice.target_version  = browsing_notice.to_array_version(browsing_notice_settings.target_version[browsing_notice.os_name][browsing_notice.browser_name]);

			// 現在のバージョンがターゲットバージョンよりも新しい場合のみ処理する
			if (browsing_notice.is_new_than_target(browsing_notice.current_version, browsing_notice.target_version) === false || browsing_notice_settings.test_mode === 1) {

				// 表示されるメッセージの内容にターゲットバージョンを入れる
				browsing_notice_settings.message = browsing_notice_settings.message.replace('[version]', browsing_notice_settings.target_version[browsing_notice.os_name][browsing_notice.browser_name]);

				// モーダルの表示処理
				$('body').css({
					'position': 'fixed',
					'width':    '100%',
					'overflow-y': 'scroll'
				});
				$('body').append(browsing_notice_settings.message);

				// Cookieを設定する
				document.cookie = 'browsing_notice=1';

				// 閉じるボタンをクリックした場合の処理
				$('.js-close_browsing_notice').on('click', function () {

					// モーダルを非表示
					$('.browsing_notice').fadeOut('fast', function () {
						$('body').css('position', 'static');
					});
					
					// テストモードの場合のみクッキー削除ボタンを表示する
					if (browsing_notice_settings.test_mode === 1) {
						$('body').append('<a href="javascript:void(0)" class="js-cookie_clear" style="position:fixed;top:0;left:0;display:block;padding:4px;background:#fff;border:solid #cdcdcd;border-width: 0 1px 1px;border-radius:0 0 4px 0;box-shadow:0 1px 1px rgba(0,0,0,0.1);color:#333;font-size:12px;">Cookie削除</a>');
						$('.js-cookie_clear').on('click', function () {
							// Cookieを削除する
							document.cookie = "browsing_notice=; max-age=0";
							location.reload();
						});
					}
				});
			}
		}
	}
});
