function getXmlHttp(){var xmlhttp; try {xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");} catch (e) { try {xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");} catch (E) { xmlhttp = false;}} if (!xmlhttp && typeof XMLHttpRequest!='undefined') {xmlhttp = new XMLHttpRequest();} return xmlhttp;}

var nobj = {
	el : '[ Электростанция, ГосЭнергоАтом ]',
	ur : '[ Урановый рудник, ГосЭнергоАтом ]',
	cb : '(Захват контроля баров'
}

document.addEventListener("DOMContentLoaded", function() {
	var nprec = 0;
	var tt2 = 0;
	window.parseNaim = function () {
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
					var timer;
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
		var vv = getSindZnak(obj[tt2].parentNode.nextSibling.innerHTML, obj[tt2].href);
		if (!vv) {
			tt2++; Sort(obj); // Обходим мимо сразу все не подходящие заявки с виду.
		}
		else {
			tt2++; setTimeout( function(){ Sort(obj); }, 1000);
		}
	}
	
	function postInfo(url, sindID) {
		var url = url.replace(/(.*)warlog\.php/,'http://www.ganjawars.ru/warlog.php');
		var r = getXmlHttp();
		r.open('GET', url, true);
		r.onreadystatechange = function() {
			if (r.readyState == 4) {
				if(r.status == 200) {
					var txt = r.responseText;
					if (txt.indexOf('</font> (Захват <a href=/object.php?id=') != -1 || txt.indexOf('</font> (Нападение на <a href=/object.php?id=') != -1 || txt.indexOf('</font> (Захват контроля баров') != -1) {
						// alert('ZAHVAT');
						if (txt.indexOf(nobj.el) != -1) return false;
						else if (txt.indexOf(nobj.ur) != -1) var name = 'Урановый рудник';
						else if (txt.indexOf(nobj.cb) != -1) var name = 'Контроль баров';
						else var name = 'Недвижимость';
						if (txt.indexOf('Бой ещё не окончен.') != -1) var boi = true;
						var text = '<a href="http://www.ganjawars.ru/syndicate.php?id='+sindID.red.one+'"><img alt="   " src="http://images.ganjawars.ru/img/synds/'+sindID.red.one+'.gif"/></a>';
						if (sindID.red.two) text += '<a href="http://www.ganjawars.ru/syndicate.php?id='+sindID.red.two+'"><img alt="   " src="http://images.ganjawars.ru/img/synds/'+sindID.red.two+'.gif"/></a>';
						else text += '<a><img alt="   " src="icons/znachok.gif"/></a>';
						text += '<b>vs</b>';
						text += '<a href="http://www.ganjawars.ru/syndicate.php?id='+sindID.blue.one+'"><img alt="   " src="http://images.ganjawars.ru/img/synds/'+sindID.blue.one+'.gif"/></a>';
						if (sindID.blue.two) text += '<a href="http://www.ganjawars.ru/syndicate.php?id='+sindID.blue.two+'"><img alt="   " src="http://images.ganjawars.ru/img/synds/'+sindID.blue.two+'.gif"/></a>';
						else text += '<a><img alt="   " src="icons/znachok.gif"/></a>';
						
						var tr = document.createElement('tr');
						tr.innerHTML = '<td title="'+name+'" style="height:24px;width:232px;" align="left"><nobr>'+text+' <a '+(!boi?'style="COLOR: red;"':'')+'href="'+url+'">Перейти »</a></nobr></td>';
						tr.setAttribute('style', 'display:none');
						document.getElementById('boi').appendChild(tr);
						setTimeout( function(){ tr.setAttribute('style', 'display:table-row'); }, 500); // Чтобы успели загрузиться значки и показывало все ровно.
					}
				}
			}
		};
		r.send(null);
	}
	
	function getSindZnak(rr, url) {
		var sindid = {};
		sindid.red = {};
		sindid.blue = {};
		var maxLvl = 5;
		
		var tmp_str = rr.match(/<font color\=\"red\">(.*)<\/font> <b>/);
		if (!tmp_str) return false; 
		tmp_str = tmp_str[1].split(', ');
		
		for (i = 0; i < tmp_str.length; i++) {
			var sindid_tmp = tmp_str[i].match(/<!-- d(\d+) -->/);
			if (!sindid_tmp) return false;
			
			if(!sindid.red.one) sindid.red.one = sindid_tmp[1];
			else {
				if(!sindid.red.two) {
					if (sindid_tmp[1] != sindid.red.one) sindid.red.two = sindid_tmp[1];
				}
				else {
					if (sindid_tmp[1] != sindid.red.one && sindid_tmp[1] != sindid.red.two) return false;
				}
			}
			var lvl = tmp_str[i].match(/\[(\d+)\]<!/);
			if (!maxLvl) maxLvl = lvl[1];
			else {
				if (maxLvl < lvl[1]) maxLvl = lvl[1];
			}
		}
		
		var tmp_str = rr.match(/<font color\=\"blue\">(.*)<\/font>/);
		if (!tmp_str) return false;
		tmp_str = tmp_str[1].split(', ');
		
		for (i = 0; i < tmp_str.length; i++) {
			var sindid_tmp = tmp_str[i].match(/<!-- d(\d+) -->/);
			if (!sindid_tmp) return false;
			
			if(!sindid.blue.one) sindid.blue.one = sindid_tmp[1]; 
			else {
				if (!sindid.blue.two) { 
					if (sindid_tmp[1] != sindid.blue.one) sindid.blue.two = sindid_tmp[1];
				}
				else {
					if (sindid_tmp[1] != sindid.blue.one && sindid_tmp[1] != sindid.blue.two) return false;
				}
			}
			var lvl = tmp_str[i].match(/\[(\d+)\]<!/);
			if (!maxLvl) maxLvl = lvl[1];
			else {
				if (maxLvl < lvl[1]) maxLvl = lvl[1];
			}
		}
		if (widget.preferences.min_lvl_naim > (new Number(maxLvl))) return false;
		if (new Number(maxLvl) < 12) return false; // в любом случае не войти
		
		postInfo(url, sindid); // идем далее
		return true;
	}
	
}, false);