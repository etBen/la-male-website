
var seaClass = {
	"timer" : "",
	"updateSea": function() { 
		
		var elem = document.getElementById('sea');
		//window.console.log('u '+elem);
		var dec = (20.5 - Math.floor(Math.random()*4)/8);
		
		elem.style.height = dec+"em";
		elem.style.top	  = "-"+dec+"em";
		
		var elem = document.getElementById('sea_item');
		//window.console.log('u '+elem);

		elem.style.top	  = "-"+dec+"em";
		elem.style.marginTop = "-"+(dec-12.5)+"em";
		
		var elem = document.getElementById('sea_goutte01');
		//window.console.log('u '+elem);

		elem.style.top	  = "-"+dec+"em";
		elem.style.marginTop = "-"+(dec-5.5)+"em";
		
	}, 
 
	"init": function() { 
		seaClass.timer = setInterval(seaClass.updateSea, 300);
		/*var elem = document.getElementById('sea');
		elem.onmouseover = seaClass.updateSea;
		elem.onmouseout = seaClass.updateSea;*/
	}
}; 
 
if (document.getElementById && document.createTextNode) { 
  window.onload = seaClass.init; 
}