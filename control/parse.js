function getXmlHttp(){var xmlhttp; try {xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");} catch (e) { try {xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");} catch (E) { xmlhttp = false;}} if (!xmlhttp && typeof XMLHttpRequest!='undefined') {xmlhttp = new XMLHttpRequest();} return xmlhttp;}

opera.extension.bgProcess.doHeight(445);

document.addEventListener("DOMContentLoaded", function() {
	
	window.SumbitCl = function (e) {
		
		var num = new String(e);
		var tmp = document.getElementsByTagName('img');
		for (i = 0; i < tmp.length; i++) {
			if (tmp[i].title != num) {
				tmp[i].setAttribute('style', 'display:none');
			}
			if (tmp[i].title == num) {
				tmp[i].setAttribute('style', 'display:inline-block');
			}
		}
	}
	
	var DT = {};
	var tmp_span = document.createElement('span');
	
	var r = getXmlHttp();
	r.open('GET', 'http://www.ganjawars.ru/info.realty.php?id=2', true);
	r.onreadystatechange = function() {
		if (r.readyState == 4) {
			if(r.status == 200) {
				tmp_span.innerHTML = r.responseText;
				var tmp = tmp_span.getElementsByTagName('a');
				for (i = 0; i < tmp.length; i++) {
					var tmp_name;
					if (location.href.indexOf('electro') != -1) { tmp_name = "Электростанция"; }
					else { tmp_name = "Урановый рудник"; }
					
					if (tmp[i].innerHTML == tmp_name) {
						
						var tmp_link = /id\=(\d+)/i.exec(tmp[i].href)[1];
						tmp_link = 'http://www.ganjawars.ru/object.php?id='+tmp_link+'&attack=1';
						
						if (/http\:\/\/images.ganjawars.ru\/img\/synds\/(\d+)\.gif/i.test(tmp[i].parentNode.innerHTML)) var tmp_sind = /http\:\/\/images.ganjawars.ru\/img\/synds\/(\d+)\.gif/i.exec(tmp[i].parentNode.innerHTML)[1];
						else { var tmp_sind = 3 }
						
						var tmp_cl = /\&nbsp\;\[(\d+)]/i.exec(tmp[i].parentNode.innerHTML)[1];
						
						var tmp_sec = />(.*)</i.exec(tmp[i].parentNode.nextSibling.nextSibling.innerHTML)[1];
						if(tmp_sec == '[G] Tishka &amp; Тихая Valley') tmp_sec = '[G] Tishka & Тихая Valley';  //fix
						
						DT[tmp_sec]?(DT[tmp_sec] += '<a target="_blank" href="'+tmp_link+'"><img title="'+tmp_cl+'" alt=" " src="http://images.ganjawars.ru/img/synds/'+tmp_sind+'.gif" border="0"></a>'):(DT[tmp_sec] = '<a target="_blank" href="'+tmp_link+'"><img title="'+tmp_cl+'" alt=" " src="http://images.ganjawars.ru/img/synds/'+tmp_sind+'.gif" border="0"></a>')
						
					}
				}
				parseMap();
			}
		}
	};
	r.send(null);
	
	function parseMap() {
		var tmp = document.getElementsByTagName('td');
		for (i = 0; i < tmp.length; i++) {
			if (tmp[i].className == "sec") {
				var ret = tmp[i];
				ret.innerHTML = DT[ret.title];
			}
		}
		//document.getElementById('preload').setAttribute('style', 'display:none');
		//document.getElementById('loadmap').setAttribute('style', 'display:table-row');
		setTimeout( function(){ 
			document.getElementById('preload').setAttribute('style', 'display:none');
			document.getElementById('loadmap').setAttribute('style', 'display:table-row');
		}, 500);  // Чтобы успели загрузиться значки и показывало все ровно.
	}
	
	
}, false);