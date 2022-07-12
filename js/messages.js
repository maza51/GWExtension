
var out_status_rem = false;
var out_status_rem_value = 0;

window.addEventListener("load", function() {
	
	opera.extension.onmessage = function(event) {
		var message = event.data;
		if (message == 'outland_remont_status') {
			if (!out_status_rem) {
				postRem();
				out_status_rem = true;
			}
			else {
				if (out_status_rem_value == 1) opera.extension.broadcastMessage('outland_remont_status_1');
			}
		}
		if (message == 'outland_inboi') {
			out_status_rem = false;
		}
	}
	
	function postRem() {
		var r = getXmlHttp();
		r.open('GET', 'http://www.ganjawars.ru/workshop.php', true);
		r.onreadystatechange = function() {
			if (r.readyState == 4) {
				if(r.status == 200) {
					var txt = r.responseText;
					if (txt.indexOf('У вас нет предметов, нуждающихся в ремонте') != -1) { out_status_rem_value = 0; }
					else { opera.extension.broadcastMessage('outland_remont_status_1'); out_status_rem_value = 1; }
				}
			}
		};
		r.send(null);
	}
	
}, false);