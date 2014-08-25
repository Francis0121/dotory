/**
 * Extraction Image Color Function And Variabel
 */
extraction = {
		
	colors : {
		black : 1,
		white : 2,
		gray : 3,
		red : 4,
		yellow : 5,
		green : 6,
		cyan : 7,
		blue : 8,
		magenta :9
	},
	
	fromRgbToHsl : function(r, g, b){
		r /= 255, g /= 255, b /= 255;
	    var max = Math.max(r, g, b), min = Math.min(r, g, b);
	    var h, s, l = (max + min) / 2;

	    if(max == min){
	        h = s = 0; // achromatic
	    }else{
	        var d = max - min;
	        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	        switch(max){
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	        }
	        h*=60;
	        if (h < 0) {
	            h +=360;
	        }
	    }
		
		return { hue : h, sat : s, lgt : l};
	},
	
	fromHslToColor : function(hue, sat, lgt){
		if (lgt < 0.2)  return extraction.colors.black;
	    if (lgt > 0.8)  return extraction.colors.white;
	    
	    if (sat < 0.25) return extraction.colors.gray;
	    
	    if (hue < 30)   return extraction.colors.red;
	    if (hue < 90)   return extraction.colors.yellow;
	    if (hue < 150)  return extraction.colors.green;
	    if (hue < 210)  return extraction.colors.cyan;
	    if (hue < 270)  return extraction.colors.blue;
	    if (hue < 330)  return extraction.colors.magenta;
	    return extraction.colors.red;
	}
		
};