'use strict';

// パッケージの読み込み
// ==================================================
// タスクランナーに必要なパッケージを読み込む
//

// 基本パッケージ
const gulp = require('gulp'); // gulp本体
const watch = require('gulp-watch'); // watch
const browserSync = require('browser-sync'); // ローカルサーバ

// sass用パッケージ（ベンダープレフィックス処理に使用するautoprefixerはpackage.json内での指定に変更された）
const sass = require('gulp-sass'); // Sassコンパイル
const sourcemaps = require('gulp-sourcemaps');

// js用パッケージ
const webpack = require('webpack'); // webpack本体
const webpackStream = require('webpack-stream'); // webpack設定ファイル



// ローカルサーバの立ち上げとブラウザリロード設定
// ==================================================
// ローカルサーバを立ち上げて、htmlの更新・CSSとJSのコンパイルを感知してオートリロード

var port = {}

try {
	port = require('./_config/config-port.json'); // ポート番号を外部jsonファイルから取得
}
catch (ex) {
	port = {
		port: 3000
	}
}

gulp.task('browserSyncTask', function () {
    browserSync({
    		port: port.port,
        server: {
            baseDir: './public' // ルートとなるディレクトリを指定
        }
    });

    // html・css・jsファイルを監視
    gulp.watch(['./public/**/*.html', './public/**/*.css', './public/**/*.js']).on('change', function () {
        // ブラウザをリロード
        browserSync.reload();
    });
});


// Sassコンパイル
// ==================================================
// 案件によりCSSファイルを編集したいとの意向があるためコンパイル時のCSSコード圧縮はなし（必要であれば適宜リリース前に圧縮すること）
// ベンダープレフィックスを自動反映（IE11、Android4以上、他ブラウザの最新2バージョンに最適化）
//

const outputStyle = require('./_config/config-sass.json'); // CSSのアウトプット形式を外部jsonファイルから取得

gulp.task('sass', function() {
	return gulp.src('./origin/_sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: outputStyle.outputStyle
		}).on('error', sass.logError))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./public/_asset/css/'));
});

// sassファイルの更新をwatchしてコンパイルを実行
// --------------------------------------------------
// watchの前に1回だけコンパイルを実行する
//
gulp.task('sass:watch', gulp.series('sass', function () {
	gulp.watch('./origin/_sass/**/*.scss', gulp.task('sass'));
}));


// JSバンドル
// ==================================================
// モジュールごとに分割されたJSを1つに結合する
//
gulp.task('jsbundle', function () {
	/**
	 * コンフィグファイルを取得
	 * @type {Object}
	 */
	const webpackConfig = require('./webpack.config.js');

	return webpackStream(webpackConfig, webpack)
		.pipe(gulp.dest('./public/_asset/js/'));
});

// jsファイルの更新をwatchしてバンドルを実行
// --------------------------------------------------
// watchの前に1回だけbundleを実行する
//
gulp.task('jsbundle:watch', gulp.series('jsbundle', function () {
	gulp.watch('./origin/_js/**/*.js', gulp.task('jsbundle'));
}));



// デフォルトタスク
// --------------------------------------------------
// gulp コマンドだけで実行するタスク
//
gulp.task('default', gulp.parallel('browserSyncTask', 'sass:watch', 'jsbundle:watch'));
