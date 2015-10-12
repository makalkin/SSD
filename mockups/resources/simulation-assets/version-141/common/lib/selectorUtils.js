var selectorUtil = {

	getElementsByName : function(name){
		//var elements = document.getElementsByName(name);//getElementsByName geht nicht fuer svg in firefox!
		//unfortunately firefox 3.6 has removed support for getElementsByName in svg elements.
		//try to get elements differently
		var elements = [];
		
		if(typeof document.querySelectorAll === "function"){
			elements = document.querySelectorAll("[name='"+ name +"']");
		}else if((typeof document.getElementsByName === "function") || (navigator.userAgent.toLowerCase().indexOf("msie") != -1 && typeof document.getElementsByName === "object") ) {
			elements = document.getElementsByName(name);
		}

		return elements;
	},

	getElementsByClassName : function(name){
		var elements = [];
		if(typeof document.querySelectorAll === "function"){
			elements = document.querySelectorAll("[class='"+ name +"']");
		}else if(typeof document.getElementsByClassName === "function"){
			elements = document.getElementsByClassName(name);
		}

		return elements;
	}
}


