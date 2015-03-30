/* JavaScript Document */

$(document).ready(function() {
    //alert('working');
	
	loadhero();
});

function loadhero(){
	$('#hero').load('content/hero_content_large.html');
}