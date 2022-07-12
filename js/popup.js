function getXmlHttp(){var xmlhttp; try {xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");} catch (e) { try {xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");} catch (E) { xmlhttp = false;}} if (!xmlhttp && typeof XMLHttpRequest!='undefined') {xmlhttp = new XMLHttpRequest();} return xmlhttp;}

opera.extension.bgProcess.doHeight(300);
opera.extension.bgProcess.doWidth(430);

document.addEventListener("DOMContentLoaded", function() {
	
	if (widget.preferences.namepers == 'undefined') { opera.extension.bgProcess.doHeight(200); document.getElementById('post').innerHTML = '<br><i>Войдите в игру через браузер или немного подождите.</i><br><br><img title="Войдите в игру или зайдите поже" src="icons/stopping.png"><br>'; return; }
	
	document.getElementById('namePers').innerHTML = '<a>'+widget.preferences.namepers+'</a>';
	if (widget.preferences.update == '1') document.getElementById('checkupdate').style.display = 'inline';

	window.getSetting = function () {
		opera.extension.bgProcess.doOptions();
	}
	window.getAbout = function () {
		document.getElementById('info').innerHTML = '<table align="center">'
		+'<tr><td><b>GW Extension</b></td></tr>'
		+'<tr><td style="FONT-SIZE: 9pt;color:#5C5C5C;">Набор функций для игры ganjawars.ru</td></tr>'
		+'<tr><td class="ab">Версия <b>'+widget.version+'</b></td></tr>'
		+'<tr><td class="ab">Автор <b>maza511</b></td></tr>'
		+'<tr><td class="ab"><font>Если у вас проблемы с данным расширением или у вас есть предложения, то вы можете <a target="_blank" href="http://www.ganjawars.ru/sms-create.php?subject=GW Extension '+widget.version+'&mailto=maza511">обратиться к автору.</a></font></td></tr>'
		+'<tr><td class="ab"></td></tr>'
		+'<tr><td class="ab"><b style="cursor: pointer;" onclick="getChangelog()">Посмотреть историю изминений &#8594;</b></td></tr>'
	}
	window.getChangelog = function () {
		opera.extension.bgProcess.doCangelog();
	}
	
	window.test = function () {
		alert();
	}

	
	window.SumbitInfo = function () {
		var tmp_span = document.createElement('span');
		
		var r = getXmlHttp();
		r.open('GET', 'http://www.ganjawars.ru/sms.php', true);
		r.onreadystatechange = function() {
			if (r.readyState == 4) {
				if(r.status == 200) {
					tmp_span.innerHTML = r.responseText;
					var tmp = tmp_span.getElementsByTagName('b');
					for (i = 0; i < tmp.length; i++) {
						if (tmp[i].parentNode.innerHTML == '<b style="color: #990000">От</b>') {
							
							var string_w = '';
							var obj = tmp[i].parentNode.parentNode;
							
							for (i = 0; i < 5; i++) {
								obj = obj.nextSibling.nextSibling;
								if (obj.innerHTML.indexOf('Удалить отмеченные') != -1) break;
								string_w += fix(obj);
							}
							
							document.getElementById('info').innerHTML = string_w;
							
							break;
						}
					}
				}
			}
		};
		r.send(null);
	}
	
	function fix(value) {
		
		var tmp_sms = value.getElementsByTagName('a');
		
		var nick_href = tmp_sms[0].href.replace(/(.*)info\.php/,'http://www.ganjawars.ru/info.php');
		var nick = tmp_sms[0].innerHTML;
		
		var text_href = tmp_sms[1].href.replace(/(.*)sms-read/,'http://www.ganjawars.ru/sms-read');
		var text = tmp_sms[1].textContent.replace('[новое]','<font color="red"><b>[!]</b></font>');
		
		return '<tr>'
		+'<td><a target="_blank" class="tt" style="width:120px;" href="'+nick_href+'"><nobr>'+nick+'</nobr></a></td>'
		+'<td><a target="_blank" class="tt" style="width:260px;" href="'+text_href+'"><nobr>'+text+'</nobr></a></td></tr>';
	}
	
	var part = 1;
	var a_P = { 1:'one', 2:'two', 3:'three' };
	
	/* мля */
	document.getElementById('back').setAttribute('style', 'opacity: 0.4;cursor: pointer;');
	document.getElementById('next').setAttribute('style', 'opacity: 0.4;cursor: pointer;');
	document.getElementById('back').addEventListener('mouseover', function(){ this.setAttribute('style', 'opacity: 0.9;cursor: pointer;'); }, true);
	document.getElementById('back').addEventListener('mouseout', function(){ this.setAttribute('style', 'opacity: 0.4;cursor: pointer;'); }, true);
	
	document.getElementById('back').addEventListener('click', function(){ changlepart(false); }, true);
	
	document.getElementById('next').addEventListener('mouseover', function(){ this.setAttribute('style', 'opacity: 0.9;cursor: pointer;'); }, true);
	document.getElementById('next').addEventListener('mouseout', function(){ this.setAttribute('style', 'opacity: 0.4;cursor: pointer;'); }, true);
	
	document.getElementById('next').addEventListener('click', function(){ changlepart(true); }, true);
	
	function changlepart(n) {
		if (n) {
			document.getElementById(a_P[part]).style.display = 'none';
			part!=3?part++:part=1;
			document.getElementById(a_P[part]).style.display = 'block';
		}
		else {
			document.getElementById(a_P[part]).style.display = 'none';
			part!=1?part--:part=3;
			document.getElementById(a_P[part]).style.display = 'block';
		}
	}
	
}, false);

