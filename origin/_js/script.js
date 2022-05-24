'use strict';

// JavaScript
// ==================================================
// JSファイル（および外部プラグイン専用CSSファイル）は、このファイルを基点にして「public/_asset/js/script.js」にバンドルされる。
//
// 必要に応じてコメントアウト解除したり、新しくファイルを追加して読み込む。
//


// ◆Frame
// ==================================================
// ヘッダーやフッター、ナビゲーションなど大外枠のサイトフレームとして配置される各ページ共通のモジュール
//

// スクリーンナビゲーション
import './frame/screen_nav-slide.js';
// import './frame/screen_nav-over.js';

// ページスクロールの分量に応じて、要素をフェードイン、フェードアウト
import './frame/scroll_fade.js';


// ◆Contents
// ==================================================
// コンテンツ領域用のモジュール

// メインビジュアル カルーセル「Swiper」動作設定
// import './contents/main_visual_carousel.js';
import './contents/flex_video_carousel.js';


// ◆Utility
// ==================================================
// 各種便利系スクリプト
//

// ページTOP スクロールJS
import './utility/scroll_top.js';

// ページ内スクロールのためのJS
import './utility/scroll_anchor.js';

// スマートフォン以外でのhref="tel:"を無効化する
import './utility/disable_telephone.js';

// bodyタグへのclass埋め込み
// --------------------------------------------------
import './utility/bodyclass.js';

// UserAgentを判定してメッセージを表示する
// --------------------------------------------------
// import './utility/browsing_notice.js';



// ◆Vender
// ==================================================
// 外部開発のプラグインなど
//
// ここではimportせず、それぞれ依存するモジュール用JSファイルの中でimportする。
// importの書き方は下記の各説明を参照。（プラグイン依存のCSSもJS内で一括import可能）
//
// webpackの機能により、複数モジュールJSで読み込んでも重複して結合されることはない。
//
// Swiperやperfect-scrollbarのようにJSのClassとして呼び出す必要があるものは`import [Class] from [ファイルパス]`のように記述する。
//

import './contents/video_over-btn.js';
import './contents/color_change-header.js';
import './contents/gnav-toggle.js';
import './contents/form-toggle.js';
import './contents/cart_overlay-toggle.js';
import './contents/cart_window-toggle.js';
import './contents/count-btn.js';

// jQueryコアファイル
// --------------------------------------------------
// jQueryコアファイルはwebpackのpluginsとしてグローバルに読み込んでいるため、import不要
// （各モジュール用JSファイルの中でもimport不要で従来通り記述可能）
// ※ただしjQueryプラグインを使用する場合には本体をimportする必要あり（後述）
//

// jQueryプラグイン
// --------------------------------------------------
// 各モジュール用JSファイルの中でjQueryプラグインはjQuery本体をimportしたあとimportする
// import $ from 'jquery'; ← モジュール内でjQueryプラグインを適用するためjQuery本体を呼び出す
// import 'bootstrap/js/dist/modal'; ← jQueryプラグインの呼び出し

// ### jQueryをグローバルに展開
// システム側viewファイルなどHTMLファイル内にjQueryを記述する際に必要（以下2行をコメントアウトする）
//
// import $ from 'jquery';
// window.$ = window.jQuery = $;




// カルーセル「Swiper」
// --------------------------------------------------
// 利用するモジュールJS内で以下のimport文をコピー＆ペーストしてモジュールごとに呼び出す
// import Swiper from '../vender/swiper/swiper.min.js';
// import '../vender/swiper/swiper.min.css';
//

// スクロールバーカスタマイズ「perfect-scrollbar」
// --------------------------------------------------
// 利用するモジュールJS内で以下のimport文をコピー＆ペーストしてモジュールごとに呼び出す
// import PerfectScrollbar from '../vender/perfect-scrollbar/perfect-scrollbar.min.js';
// import '../vender/perfect-scrollbar/perfect-scrollbar.css';
//

// モーダルウィンドウ「iziModal」
// --------------------------------------------------
// 利用するモジュールJS内で以下のimport文をコピー＆ペーストしてモジュールごとに呼び出す
// import '../vender/iziModal/iziModal.min.js';
// import '../vender/iziModal/iziModal.min.css';
//
