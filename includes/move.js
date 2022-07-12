// ==UserScript==
// @include          http://www.ganjawars.ru/map.php*
// @include          http://www.ganjawars.ru/map.move.php*
// @include          http://www.ganjawars.ru/map.moving.php*
// @version          1.0
// @author           maza511
// ==/UserScript==


window.addEventListener("DOMContentLoaded", function() {
	
	if (widget.preferences.move_beg == 0) return;
	
	var cooc;
	
	if (window.location.href.indexOf('http://www.ganjawars.ru/map.move.php') != -1 || window.location.href.indexOf('http://www.ganjawars.ru/map.moving.php') != -1) {
		
		var center = document.getElementsByTagName('center')[1];
		if (!center) { center = document.getElementsByTagName('center')[0]; }
		
		cooc = getCookie('move_timer');
		var proc;
		
		if (cooc) proc = 100 - (window.timeleft/cooc*100);
		else {
			cooc = window.timeleft;
			var time = window.timeleft; var d = new Date; d.setTime(d.getTime()+time*1000); time = d.toUTCString();
			setCookie('move_timer', window.timeleft, time);
			proc = 100 - (window.timeleft/window.timeleft*100);
		}
		
		center.innerHTML = '<table><tr><td style="position: relative;"><img id="begunok" style="position: absolute;left: '+(proc*5-15)+'px;" src="http://images.ganjawars.ru/q/turist6_0.gif"></td></tr><tr bgcolor="#d0eed0"><td style="width:500px;padding: 1px;"></td></tr></table>'+center.innerHTML;
		pre();
	}
	
	function pre() {
		var ee = 100-(window.timeleft/cooc*100);
		document.getElementById('begunok').setAttribute('style', 'position: absolute;top:-20px;left: '+(ee*5-15)+'px;');
		
		setTimeout( function(){ pre(); }, 100);
	}
	
	if (window.location.href.indexOf('http://www.ganjawars.ru/map.php') != -1) {
		deleteCookie('move_timer');
	}
	
	
	function getCookie(name) {
		var pattern = "(?:; )?" + name + "=([^;]*);?"; var regexp  = new RegExp(pattern);
		if (regexp.test(document.cookie))
		return decodeURIComponent(RegExp["$1"]);
		return false;
	}
	
	function setCookie(name, value, expires, path, domain, secure) {
		document.cookie = name + "=" + escape(value) +
		((expires) ? "; expires=" + expires : "") +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		((secure) ? "; secure" : "");
	}
	
	function deleteCookie( name, path, domain ) {
		if ( getCookie( name ) ) document.cookie = name + '=' +
				( ( path ) ? ';path=' + path : '') +
				( ( domain ) ? ';domain=' + domain : '' ) +
				';expires=Thu, 01-Jan-1970 00:00:01 GMT';
	}
	
}, false);