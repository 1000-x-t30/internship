/**
 * @fileOverview スマートフォン以外でのhref="tel:"を無効化する
 */
$(function () {

/**
 * 処理に使用するネームスペースとなるオブジェクト
 * @type {Object}
 */
	var disable_telephone = {};

	/**
	 * 全て小文字にしたUserAgent
	 * @type  {String}
	 */
	disable_telephone.ua = (function () {
		var ua = window.navigator.userAgent;
		ua = ua.toLowerCase();

		return ua;
	})();

	/**
	 * 合致するデバイスタイプでの閲覧時にtrueを返すメソッド群
	 * @param  {String}  ua 全て小文字にしたUserAgent
	 * @return {Boolean}    trueまたはfalse
	 */
	disable_telephone.is_smartphone = function (ua) {
		if (ua.match('nexus 10') || ua.match('nexus 9') || ua.match('nexus 7')) {
			return false;
		} else if (ua.match('iphone')) {
			return true;
		} else if ((ua.match('android') && ua.match('mobile')) || (ua.match('android') && !ua.match('mobile') && !ua.match('tablet'))) {
			return true;
		} else if (ua.match('windows') && ua.match('phone')) {
			return true;
		} else {
			return false;
		}
	};	

	// 実行処理
	// --------------------------------------------------
	// 
	if (disable_telephone.is_smartphone(disable_telephone.ua) === false) {
		$('a[href^="tel:"]').on('click', function (event) {
			alert('スマートフォンでクリックすると電話をかけられます');
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			return false;
		});
		$('a[href^="tel:"]').css('cursor', 'default');
	}

});