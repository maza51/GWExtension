// ==UserScript==
// @include          *quest.ganjawars.ru/walk*
// @include          *ganjawars.ru/b0/*
// @include          *ganjawars.ru/workshop.php*
// @version          1.4
// @author           maza511
// ==/UserScript==


window.addEventListener("DOMContentLoaded", function() {
	
	if (widget.preferences.inform_out == 1) {
		
		if (window.location.href.indexOf('ganjawars.ru/walk') != -1) {
			opera.extension.postMessage('outland_remont_status');
		}
		
		if (window.location.href.indexOf('ganjawars.ru/b0/') != -1) {
			opera.extension.postMessage('outland_inboi');
		}
		
		if (window.location.href.indexOf('ganjawars.ru/workshop.php') != -1) {
			if (window.document.documentElement.innerHTML.indexOf('У вас нет предметов, нуждающихся в ремонте.') != -1) {
				opera.extension.postMessage('outland_inboi');
			}
		}
	}
	
	if (widget.preferences.out_tt == 1 && window.location.href.indexOf('quest.ganjawars.ru/walk') != -1) {
		var tmp = document.body.getElementsByTagName('IMG');
		for (i = 0; i < tmp.length; i++) {
			if (tmp[i].src == 'http://images.ganjawars.ru/q-new/bot100.gif') {
				var tmp_i = tmp[i];
				var xy = tmp_i.parentNode.innerHTML.match(/overat\((\d+)\,(\d+)\)\;\" onmouseout/);
				var bot = window.userhere(xy[1], xy[2]);
				
				var txt = window.users[bot]['info'].match(/Вероятное количество\: (\d+) на бойца<br><li>\% от премии за убийство\: (\d+)\%/);
				if (txt) {
					var m = window.users[bot]['info'].match(/Мощность: ~(\d+)<br>/);
					
					var div = document.createElement('div');
					div.innerHTML = (m?'<font style color=red>Мощность: '+m[1]+'<br></font>':'')+'кол-во: <b>'+txt[1]+'</b><br>премия: <b>'+txt[2]+'</b>';
					div.setAttribute('style', 'position: absolute; border: solid #339933 1px; background-color: #DAFFB5; font-family: Tahoma, sans-serif; font-size: 11px;opacity:'+widget.preferences.out_op+';padding: 1px;');
					div.style.left = (tmp_i.x) + "px";
					div.style.top = (tmp_i.y-(m?42:28)) + "px";
					document.body.appendChild(div);
					div.style.cursor = "pointer";
					div.onclick = function() { this.style.display = "none"; }
				}
			}
			if (tmp[i].src == 'http://images.ganjawars.ru/q-new/bot.gif' && widget.preferences.out_tt2 == 1) {
				var tmp_i = tmp[i];
				var xy = tmp_i.parentNode.innerHTML.match(/overat\((\d+)\,(\d+)\)\;\" onmouseout/);
				var bot = window.userhere(xy[1], xy[2]);
				
				var txt = window.users[bot]['info'].match(/Бот, (\d+) уровень сложности/);
				if (txt) {
					var div = document.createElement('div');
					div.innerHTML = '<b>'+txt[1]+'</b> уровень';
					div.setAttribute('style', 'position: absolute; border: solid #339933 1px; background-color: #DAFFB5; font-family: Tahoma, sans-serif; font-size: 11px;opacity:'+widget.preferences.out_op+';padding: 1px;');
					div.style.left = (tmp_i.x) + "px";
					div.style.top = (tmp_i.y-16) + "px";
					document.body.appendChild(div);
					div.style.cursor = "pointer";
					div.onclick = function() { this.style.display = "none"; }
				}
			}
			if (tmp[i].src == 'http://images.ganjawars.ru/q-new/flag.gif' && widget.preferences.out_tt3 == 1) {
				var tmp_i = tmp[i];
				var xy = tmp_i.parentNode.innerHTML.match(/overat\((\d+)\,(\d+)\)\;\" onmouseout/);
				var bot = window.userhere(xy[1], xy[2]);
				
				var txt = window.users[bot]['info'].match(/Флаг для ([^[]+) \[(\d+) мин. назад\]/);
				if (txt) {
					var div = document.createElement('div');
					div.innerHTML = '<b style="color:#FF3300">'+txt[1]+'</b><br/>'+txt[2]+' м. н.';
					div.setAttribute('style', 'position: absolute; border: solid #339933 1px; background-color: #DAFFB5; font-family: Tahoma, sans-serif; font-size: 11px;opacity:'+widget.preferences.out_op+';padding: 1px;');
					div.style.left = (tmp_i.x) + "px";
					div.style.top = (tmp_i.y-(m?42:28)) + "px";
					document.body.appendChild(div);
					div.style.cursor = "pointer";
					div.onclick = function() { this.style.display = "none"; }
				}
			}
		}
	}
	
	opera.extension.onmessage = function(event) {
		var messages = event.data
		if (messages == 'outland_remont_status_1') {
			var tmp = document.getElementsByTagName('table');
			for (i = 0; i < tmp.length; i++) {
				if (/Сектор\:/.test(tmp[i].textContent)) {
					tmp[i].style.backgroundColor = '#FFCCCC';
					tmp[i].firstChild.firstChild.firstChild.nextSibling.innerHTML += ' | <a style="text-decoration: none" href="http://www.ganjawars.ru/workshop.php"><b style="color:#990000;">Ремонт</b></a>';
				}
			}
		}
	}
	
}, false);