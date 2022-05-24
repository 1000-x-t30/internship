// code_view
// ============================================================
// 
// Google code-prettify　を使って、HTMLコードなどをsyntaxするためのもの。
// http://raimon49.github.io/2017/06/24/usage-google-code-prettify.html
// 
// < > " ' なども、jsにより変換する。
// 

// Google code-prettify のインポート
// --------------------------------------------------
// 
document.write(
	'<script src="http://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>'
);

/**
 * code-prettify初期化用関数
 */
function initPrettyPrint() {
	Array.prototype.slice.call(document.querySelectorAll('main pre')).forEach(function(pre) {
		/**
		 * 既存class属性値を取得
		 * @type {String}
		 */
		var pre_class = pre.getAttribute('class');

		// メインとなる要素直下に存在する全てのpre要素にclass="prettyprint"を追加
		pre.setAttribute('class', (pre_class != null ? pre_class + ' ' : '') + 'prettyprint');
	});
	// 構文ハイライトを実行
	PR.prettyPrint();
};

// 記号のエスケープ処理 ※`<code>`内部の文字を変換する
// --------------------------------------------------
// 
$(function () {

	/**
	 * IEでclosestが使えないので類似のメソッドとして関数化する
	 * @param  {Object} node     ノードオブジェクト
	 * @param  {String} selector closestで見つけたい先祖要素のセレクタを指定
	 * @return {Object}          指定の要素が見つかればノードを返し、見つからなければnullを返す
	 */
	function closest(node, selector) {
	  return (node.closest || function(_selector) {
	    do {
	      // nodeとselectorがマッチしたら返す
	      if ((node.matches || node.msMatchesSelector).call(node, _selector)) {
	        return node;
	      }
	      // マッチしなかったら親要素を代入
	      node = node.parentElement || node.parentNode;
	    } while (node !== null && node.nodeType === 1);

	    return null;
	  }).call(node, selector);
	}

	/**
	 * インデント整形処理用関数（余分削除）
	 * @param  {String} innerHTML innerHTML
	 * @return {String}           インデント余分削除したinnerHTML
	 */
	function indent_prettify(innerHTML) {
		
		/**
		 * innerHTMLを配列化
		 * @type {Array}
		 */
		var textArray = innerHTML.split('\n');

		/**
		 * 1行目を取得
		 * @type {String}
		 */
		var first_line = textArray[0].length ? textArray[0] : textArray[1];


		/**
		 * 1行目のインデント文字数を算出
		 * @type {String}
		 */
		var indents = first_line.split(/\t/).length - 1;

		/**
		 * 整形後のテキスト代入用
		 * @type {String}
		 */
		var prettify_text = '';

		textArray.forEach(function(val) {
			prettify_text = prettify_text + val.slice(indents) + '\n';
		});

		return prettify_text;
	}

	/**
	 * DOMを保持しておくための配列
	 * @type {Array}
	 */
	var code_view_list = [];

	/**
	 * 配列キーの管理用変数
	 * @type {Number}
	 */
	var code_view_count = 0;

	// コピーの下準備とブラウザへのコード表示のための置換処理
	// --------------------------------------------------
	// 
	Array.prototype.slice.call(document.querySelectorAll('.code_view pre code')).forEach(function(code) {

		/**
		 * .code_view--code_areaをもつ先祖要素を取得
		 * @type {Object}
		 */
		var code_view_node = closest(code, '.code_view--code_area');

		// 先祖要素にdiv.code_viewをもつ場合のみ処理する
		if (code_view_node) {

			// インデント整形処理（余分削除）
			// --------------------------------------------------
			code.innerHTML = indent_prettify(code.innerHTML);

			/**
			 * コピーボタンのノードを取得
			 * @type {Object}
			 */
			var copy_button = code_view_node.getElementsByClassName('js-code_copy--trigger');

			// コピー用のDOMを配列に格納
			code_view_list[code_view_count] = code.innerHTML.replace(/<!--\s*<body(.*)>\s*-->/g, '<body$1>').replace(/<!--\s*<\/body>\s*-->/g, '</body>');

			// コピーボタンに配列キーをdata-key属性値として設定
			copy_button[0].setAttribute('data-key', code_view_count);

			// 配列キーの管理用変数をカウントアップ
			code_view_count = code_view_count + 1;

			// ブラウザへのコード表示のためHTML内の記号を文字実体参照へ置換
			// --------------------------------------------------
			// ※空白文字をタブに変換するカスタマイズは不可（文章中の空白文字が置換されるため）
			// 
			code.innerHTML = code.innerHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\t/g, '&nbsp;&nbsp;&nbsp;').replace(/&lt;!--\s*&lt;body(.*)&gt;\s*--&gt;/g, '&lt;body$1&gt;').replace(/&lt;!--\s*&lt;\/body&gt;\s*--&gt;/, '&lt;/body&gt;');
		}

	});

	// コピーボタンクリック時の処理
	// --------------------------------------------------
	// 
	Array.prototype.slice.call(document.querySelectorAll('.js-code_copy--trigger')).forEach(function(copy_button) {
		copy_button.addEventListener('click', function () {
			/**
			 * ボタンに設定しておいた配列キーを取得
			 * @type {Number}
			 */
			var key = parseInt(this.getAttribute('data-key'));

			/**
			 * テキストコピーに使用するtextarea要素を作成
			 * @type {Object}
			 */
			var textarea = document.createElement('textarea');
			textarea.style.position = 'fixed';
			textarea.style.left = '-9999px';

			/**
			 * HTMLのbody要素を取得
			 * @type {Object}
			 */
			var body_element = document.getElementsByTagName('body')[0];

			// テキストコピーに使用するtextarea要素をDOMツリーに追加
			body_element.appendChild(textarea);

			// テキストエリアへ配列からテキストをセットしてクリップボードへコピー
			textarea.textContent = code_view_list[key];
			textarea.select();
			document.execCommand('copy');

			// コピー用に追加した要素を削除
			body_element.removeChild(textarea);
		}, false);
	});
	
});


// initPrettyPrintの初期化処理を画面ロード時に一度だけ呼ぶ
// --------------------------------------------------
// 
window.addEventListener('load', initPrettyPrint, false);


