//Variables
var focused = true;

//Functions
function onFocus() {
  focused = true;
}

function onBlur() {
  focused = false;
}

if (/*@cc_on!@*/false) { 
	document.onfocusin = onFocus;
	document.onfocusout = onBlur;
} else {
	window.onfocus = onFocus;
	window.onblur = onBlur;
}