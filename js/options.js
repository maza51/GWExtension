
window.addEventListener("load", function() {
	
	if (widget.preferences.inform_sound_boi == 1) document.getElementById('songboi').setAttribute('checked', true);
	document.getElementById('songboi').onclick = function() {
		if (widget.preferences.inform_sound_boi == 1) { widget.preferences.inform_sound_boi = 0; }
		else { widget.preferences.inform_sound_boi = 1; }
	}
	
	if (widget.preferences.inform_sound_sms == 1) document.getElementById('songsms').setAttribute('checked', true);
	document.getElementById('songsms').onclick = function() {
		if (widget.preferences.inform_sound_sms == 1) { widget.preferences.inform_sound_sms = 0; }
		else { widget.preferences.inform_sound_sms = 1; }
	}
	
	if (widget.preferences.inform_out == 1) document.getElementById('outrem').setAttribute('checked', true);
	document.getElementById('outrem').onclick = function() {
		if (widget.preferences.inform_out == 1) { widget.preferences.inform_out = 0; }
		else { widget.preferences.inform_out = 1; }
	}
	
	document.getElementById('songboi2').value = widget.preferences.inform_sound_boi2;
	document.getElementById('songboi2').onchange = function() {
		widget.preferences.inform_sound_boi2 = document.getElementById('songboi2').value;
	}
	
	document.getElementById('naim').value = widget.preferences.min_lvl_naim;
	document.getElementById('naim').onchange = function() {
		widget.preferences.min_lvl_naim = document.getElementById('naim').value;
	}
	
	document.getElementById('boevik').value = widget.preferences.min_lvl_boevik;
	document.getElementById('boevik').onchange = function() {
		widget.preferences.min_lvl_boevik = document.getElementById('boevik').value;
	}
	
	if (widget.preferences.out_tt == 1) document.getElementById('outtt').setAttribute('checked', true);
	document.getElementById('outtt').onclick = function() {
		if (widget.preferences.out_tt == 1) { widget.preferences.out_tt = 0; }
		else { widget.preferences.out_tt = 1; }
	}
	
	if (widget.preferences.out_tt2 == 1) document.getElementById('outtt2').setAttribute('checked', true);
	document.getElementById('outtt2').onclick = function() {
		if (widget.preferences.out_tt2 == 1) { widget.preferences.out_tt2 = 0; }
		else { widget.preferences.out_tt2 = 1; }
	}
	
	if (widget.preferences.out_tt3 == 1) document.getElementById('outtt3').setAttribute('checked', true);
	document.getElementById('outtt3').onclick = function() {
		if (widget.preferences.out_tt3 == 1) { widget.preferences.out_tt3 = 0; }
		else { widget.preferences.out_tt3 = 1; }
	}
	
	document.getElementById('out_op').value = widget.preferences.out_op;
	document.getElementById('out_op').onchange = function() {
		widget.preferences.out_op = document.getElementById('out_op').value;
	}
	
	if (widget.preferences.move_beg == 1) document.getElementById('movebeg').setAttribute('checked', true);
	document.getElementById('movebeg').onclick = function() {
		if (widget.preferences.move_beg == 1) { widget.preferences.move_beg = 0; }
		else { widget.preferences.move_beg = 1; }
	}
	
	if (widget.preferences.sort_land == 1) document.getElementById('slom_land').setAttribute('checked', true);
	document.getElementById('slom_land').onclick = function() {
		if (widget.preferences.sort_land == 1) { widget.preferences.sort_land = 0; }
		else { widget.preferences.sort_land = 1; }
	}
	
	// menubar
	
	document.getElementById('menu1').value = widget.preferences.menu1;
	document.getElementById('menu1').onchange = function() {
		widget.preferences.menu1 = document.getElementById('menu1').value;
	}
	document.getElementById('menu2').value = widget.preferences.menu2;
	document.getElementById('menu2').onchange = function() {
		widget.preferences.menu2 = document.getElementById('menu2').value;
	}
	document.getElementById('menu3').value = widget.preferences.menu3;
	document.getElementById('menu3').onchange = function() {
		widget.preferences.menu3 = document.getElementById('menu3').value;
	}
	document.getElementById('menu4').value = widget.preferences.menu4;
	document.getElementById('menu4').onchange = function() {
		widget.preferences.menu4 = document.getElementById('menu4').value;
	}
	document.getElementById('menu5').value = widget.preferences.menu5;
	document.getElementById('menu5').onchange = function() {
		widget.preferences.menu5 = document.getElementById('menu5').value;
	}
	document.getElementById('menu6').value = widget.preferences.menu6;
	document.getElementById('menu6').onchange = function() {
		widget.preferences.menu6 = document.getElementById('menu6').value;
	}
	document.getElementById('menu7').value = widget.preferences.menu7;
	document.getElementById('menu7').onchange = function() {
		widget.preferences.menu7 = document.getElementById('menu7').value;
	}
	
}, false);