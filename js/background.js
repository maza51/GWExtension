function getXmlHttp(){var xmlhttp; try {xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");} catch (e) { try {xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");} catch (E) { xmlhttp = false;}} if (!xmlhttp && typeof XMLHttpRequest!='undefined') {xmlhttp = new XMLHttpRequest();} return xmlhttp;}

var color_r = "rgba(250, 5, 5, 0.8)";
var color_g = "rgba(25, 150, 25, 0.8)";
	
var strip_s_b = false;
var strip_s_s = false;

/* Вроде оптимально */
var uptime = 8;
var upExttime = 18000; // 5h
var timer;
var timer_time

var theButton;

var WP = widget.preferences;

if (WP.first != widget.version) {
	WP.idpers = 965772;
	WP.namepers = 'undefined';
	WP.sector = 'undefined';
	WP.inform_out = 1;
	WP.inform_sound_boi = 1;
	WP.inform_sound_boi2 = 120;
	WP.inform_sound_sms = 1;
	WP.out_tt = 1;
	WP.out_tt2 = 0;
	WP.out_tt3 = 1;
	WP.out_op = 0.6;
	WP.move_beg = 1;
	WP.min_lvl_naim = 17;
	WP.min_lvl_boevik = 20;
	WP.sort_land = 1;
	WP.forum = 'oi';
	WP.update = 0;
	WP.menu1 = 'boevik';
	WP.menu2 = 'naim';
	WP.menu3 = 'sms';
	WP.menu4 = 'forum';
	WP.menu5 = 'slom';
	WP.menu6 = 'options';
	WP.menu7 = 'about';
	WP.first = widget.version;
}

function doHeight(ff) {
	theButton.popup.height = ff;
}
function doWidth(ff) {
	theButton.popup.width = ff;
}
function doOptions() {
	opera.extension.tabs.create({url: '/options.html', focused: true});
}
function doCangelog() {
	opera.extension.tabs.create({url: 'http://vodkapower.ru/gw/extension.php', focused: true});
}

window.addEventListener("load", function() {
	
	var Toolbar = {
		disabled: false,
		title: "GW Extension",
		icon: "icons/icon-18.png",
		popup: {
			href: "popup.html",
			width: 430,
			height: 300
		},
		badge: {
			display: "none",
			textContent: "0",
			color: "white",
			backgroundColor: color_g
		}
	}
	theButton = opera.contexts.toolbar.createItem(Toolbar);
	//opera.contexts.toolbar.addItem(theButton);
	setTimeout( function(){ opera.contexts.toolbar.addItem(theButton); Update(); }, 1000);
	
	function Update() {
		var r = getXmlHttp();
		r.open('GET', 'http://www.ganjawars.ru/info.php?id='+WP.idpers, true);
		r.onreadystatechange = function() {
			if (r.readyState == 4) {
				if (r.status == 200) {
					var txt = r.responseText;
					var tmp_idnick = txt.match(/info\.php\?id\=(\d+).?\><b>(.*)<\/b>/i);
					if (!tmp_idnick) { WP.namepers = 'undefined'; return; }
					
					var tmp_sector = txt.match(/Район\:<\/b> <a[^>]+>([^<]+)/i);
					if (tmp_sector) WP.sector = tmp_sector[1];
					
					WP.idpers = tmp_idnick[1];
					WP.namepers = tmp_idnick[2];
					
					if(txt.indexOf('Ваш синдикат в нападении') != -1) {
						var tmp = txt.match(/\[(\d+)\:(\d+)]/i);
						if (tmp) {
							timer_time = new Number(tmp[1]) * 60 + new Number(tmp[2]);
							
							if (!strip_s_b && WP.inform_sound_boi == 1) new Audio(song[1]).play();
							strip_s_b = true;
							
							theButton.badge.display = "block";
							theButton.badge.textContent = getString(timer_time);
									
							/* tick timer */
							if (timer) clearInterval(timer);
							timer = setInterval(function() {
								timer_time--;
								theButton.badge.textContent = getString(timer_time);
								if (timer_time > 0) {
									if (WP.inform_sound_boi2 != 0) {
										if (timer_time <= WP.inform_sound_boi2) { 
											theButton.badge.backgroundColor = color_r; 
											if (timer_time > (WP.inform_sound_boi2-1)) new Audio(song[2]).play();
										}
										else { theButton.badge.backgroundColor = color_g;  }
									}
									else { theButton.badge.backgroundColor = color_g; }
								}
								else { clearInterval(timer); theButton.badge.display = "none"; }
							}, 1000);
						}
					} else {
						theButton.badge.display = "none";
						strip_s_b = false;
					}
					
					if(txt.indexOf('Вам пришла почта!') != -1) {
						if (!strip_s_s && WP.inform_sound_sms == 1) new Audio(song[3]).play();
						strip_s_s = true;
						theButton.icon = "icons/icon-18-sms.png";
					} else {
						strip_s_s = false;
						theButton.icon = "icons/icon-18.png";
					}
				}
			}
		};
		r.send(null);
		setTimeout( function(){ Update(); }, uptime*1000);
	}
	
	function UpdateExt() {
		var r = getXmlHttp();
		r.open('GET', 'http://vodkapower.ru/gw/extension.php?id='+WP.idpers+'&v='+widget.version+'?'+Math.random(), true);
		r.onreadystatechange = function() {
			if (r.readyState == 4) {
				if (r.status == 200) {
					var txt = r.responseText;
					var version = txt.match(/<b id\=\"version\">(.*)<\/b>/);
					if (version) {
						if (new Number(version[1]) > new Number(widget.version)) WP.update = "1";
						else WP.update = "0";
					}
				}
			}
		};
		r.send(null);
		setTimeout( function(){ UpdateExt(); }, upExttime*1000);
	}
	setTimeout( function(){ UpdateExt(); }, 3000);
	
	function getString(time) {
		var timeStr = new String();
		var min = Math.floor(time/60);
		var sec = time - min*60;
		timeStr = ''+(min<10?'0':'')+min+':'+(sec<10?'0':'')+sec+'';
		return timeStr;
	}

}, false);