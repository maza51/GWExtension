function getXmlHttp(){var xmlhttp; try {xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");} catch (e) { try {xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");} catch (E) { xmlhttp = false;}} if (!xmlhttp && typeof XMLHttpRequest!='undefined') {xmlhttp = new XMLHttpRequest();} return xmlhttp;}

var reg = new Array('[<font color=#660000>dm</font>]', '</font> (Захват <a href=/object.php?id=', '</font> (Нападение на <a href=/object.php?id=', '</font> (Захват контроля баров');

document.addEventListener("DOMContentLoaded", function() {
	var nprec = 0;
	var tt2 = 0;
	window.parseBoevik = function () {
		document.getElementById('info').innerHTML = '<div class="scroll"><table id="boi"></table></div>';
		var tmp_span = document.createElement('span');
		var r = getXmlHttp();
		r.open('GET', 'http://www.ganjawars.ru/war/', true);
		r.onreadystatechange = function() {
			if (r.readyState == 4) {
				if(r.status == 200) {
					if (r.responseText.indexOf('Возможные типы боёв:') == -1) { document.getElementById('boi').innerHTML = '<tr><td style="height:24px;" align="left"><nobr>Сейчас нет доступа к информации!</nobr></td></tr>'; return; }
					tmp_span.innerHTML = r.responseText;
					var tmp = tmp_span.getElementsByTagName('a');
					var link_b = {};
					for (i = 0; i < tmp.length; i++) {
						if (/warlog\.php\?bid\=(\d+)\&rev\=1/.test(tmp[i].href)) {
							link_b[nprec] = tmp[i]; // Выбираем только нужные ссылки
							nprec++;
						}
					}
					Sort(link_b);
				}
			}
		};
		r.send(null);
	}
	
	function Sort(obj) {
		document.getElementById('loader').innerHTML = 'Загрузка.. '+(Math.round(tt2/nprec*100))+'%';
		if (!obj[tt2]) return false;
		var vv = getKolvo(obj[tt2].parentNode.nextSibling.innerHTML, obj[tt2].href);
		if (!vv) {
			tt2++; Sort(obj); // Обходим мимо сразу все не подходящие заявки с виду.
		}
		else {
			tt2++; setTimeout( function(){ Sort(obj); }, 1000);
		}
	}
	
	function postInfo(url, num1, num2) {
		var url = url.replace(/(.*)warlog\.php/,'http://www.ganjawars.ru/warlog.php');
		var r = getXmlHttp();
		r.open('GET', url, true);
		r.onreadystatechange = function() {
			if (r.readyState == 4) {
				if(r.status == 200) {
					var txt = r.responseText;
					for (i = 0; i < reg.length; i++) {
						if (txt.indexOf(reg[i]) != -1) return false;
					}
					if(/<font color\=\#660000>(.*)<\/font><\/b>/.test(txt)) return false; // уличные мля..
					if (txt.indexOf('Бой ещё не окончен.') != -1) var boi = true;
					var text = '<a style="width:55px;display:inline-block;">'+num1.red+' x '+num1.blue+'</a> <a style="width:55px;display:inline-block;">['+num2+']</a>'; // поровнять)
					
					var tr = document.createElement('tr');
					tr.innerHTML = '<td style="height:24px;width:232px;" align="left">'+text+'<a '+(!boi?'style="COLOR: red;"':'')+'href="'+url+'">Перейти »</a></td>';
					document.getElementById('boi').appendChild(tr);
				}
			}
		};
		r.send(null);
	}
	
	function getKolvo(rr, url) {
		var num = {};
		var maxLvl = 5;
		if (rr.indexOf('[bf]') != -1) return false; // граф бой в топку.
		var tmp_str = rr.match(/<font color\=\"red\">(.*)<\/font> <b>/);
		if (!tmp_str) return false; 
		tmp_str = tmp_str[1].split(', ');
		
		for (i = 0; i < tmp_str.length; i++) {
			num.red = i+1;
			var lvl = tmp_str[i].match(/\[(\d+)\]/);
			if (!lvl) return false; 
			if (!maxLvl) maxLvl = lvl[1];
			else {
				if (maxLvl < lvl[1]) maxLvl = lvl[1];
			}
		}
		
		var tmp_str = rr.match(/<font color\=\"blue\">(.*)<\/font>/);
		if (!tmp_str) return false;
		tmp_str = tmp_str[1].split(', ');
		
		for (i = 0; i < tmp_str.length; i++) {
			num.blue = i+1;
			var lvl = tmp_str[i].match(/\[(\d+)\]/);
			if (!lvl) return false; 
			if (!maxLvl) maxLvl = lvl[1];
			else {
				if (maxLvl < lvl[1]) maxLvl = lvl[1];
			}
		}
		if (widget.preferences.min_lvl_boevik > (new Number(maxLvl))) return false;
		if (new Number(maxLvl) < 15) return false; // в любом случае не войти
		
		postInfo(url, num, new Number(maxLvl)); // идем далее
		return true;
	}
	
}, false);