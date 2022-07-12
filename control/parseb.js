function getXmlHttp(){var xmlhttp; try {xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");} catch (e) { try {xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");} catch (E) { xmlhttp = false;}} if (!xmlhttp && typeof XMLHttpRequest!='undefined') {xmlhttp = new XMLHttpRequest();} return xmlhttp;}

opera.extension.bgProcess.doHeight(445);

document.addEventListener("DOMContentLoaded", function() {
	
	if (location.href.indexOf('gland') != -1) { var tmp_name = "g"; }
	else { var tmp_name = "z"; }
	
	var r = getXmlHttp();
	r.open('GET', 'http://vodkapower.ru/gw/controlbarov.php?land='+tmp_name, true);
	r.onreadystatechange = function() {
		if (r.readyState == 4) {
			if(r.status == 200) {
				var txt = r.responseText.match(/<div>(.*)<\/div>/i)[1];
				txt = txt.split('<br>');
				for (i = 0; i < txt.length-1; i++) {
					var tmp = txt[i].match(/<li>(.*)<\/li>/i)[1].split(' | ');
					var t = tmp[0].replace(/amp;/,'');
					var a = document.createElement('a');
					a.target = "_blank";
					a.href = "http://www.ganjawars.ru/map.php?" + t;
					var img = document.createElement('img');
					img.alt = " ";
					img.src = "http://images.ganjawars.ru/img/synds/" + tmp[1] + ".gif";
					a.appendChild(img);
					document.getElementById(t).appendChild(a);
				}
				setTimeout( function(){
					document.getElementById('preload').setAttribute('style', 'display:none');
					document.getElementById('loadmap').setAttribute('style', 'display:table-row');
				}, 500);  // Чтобы успели загрузиться значки и показывало все ровно.
			}
		}
	};
	r.send(null);
	
}, false);