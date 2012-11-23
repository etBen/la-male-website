//Jresig's Class implementation http://ejohn.org/blog/simple-javascript-inheritance/
(function(){var initializing=false, fnTest=/xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/; this.Class = function(){}; Class.extend = function(prop) { var _super = this.prototype; initializing = true; var prototype = new this(); initializing = false; for (var name in prop) { prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function(name, fn){ return function() { var tmp = this._super; this._super = _super[name]; var ret = fn.apply(this, arguments); this._super = tmp; return ret; }; })(name, prop[name]) : prop[name]; } function Class() { if ( !initializing && this.init ) this.init.apply(this, arguments); } Class.prototype = prototype; Class.constructor = Class; Class.extend = arguments.callee; return Class;};})();


// Allows for binding context to functions
// when using in event listeners and timeouts
Function.prototype.context = function(obj) {
  var method = this
  temp = function() {
    return method.apply(obj, arguments)
  }
 return temp
}

var Barometer = Class.extend({

	_degree 		: 0,
	_needleFreq 	: 50,
	_t 				: 0.0,
	_duration 		: 2,
	
	_timeFreq		: 0,//cf init
	

	_dateToday		: undefined,
	_dayToday		: 15,
	_dateMale		: undefined,
	_dayMale		: 26,
	_isAfter		: undefined,
	
	_degreeByDay	: 4,
	_rangeDegree 	: 0,//cf init
	_needleStep		: 1,

	_rotateTo		: 0,
	_degreeDD		: 0,
	_blueNeedle		: undefined,
	_dayTodayLabel	: undefined,
	_intervalRotation   : 0,
	
	_calendrierMois : ['JAN','FÉV','MARS','AVR','MAI','JUIN','JUIL','AOÛT','SEPT','OCT','NOV','DÉC'],
	
	init : function(){
		this._timeFreq		= this._needleFreq/(this._duration*1000);
		this._rangeDegree 	= 31*this._degreeByDay;
	},

	start : function(){
		this._dateToday 	= Date.today();
		//this._dateToday 	= Date.parse("28/11/10");
	
		this._dateMale	= this.getNextMale(this._dateToday);
		this._dayMale  	= this._dateMale.getDate();
		this._dayToday	= this._dateToday.getDate();
	
		if ( this._isAfter ) {
			
			this._dayToday	=  - Date.getDaysInMonth ( this._dateToday.getYear(), this._dateToday.getMonth()) + this._dayToday;
			//alert('isAfter:: '+this._dayToday);
		}
		
		this._rotateTo 	= this._rangeDegree - (31 - this._dayToday )*this._rangeDegree/31; 
		//this._degreeDD 	= this._rangeDegree - (31-this._dayMale)*this._rangeDegree/31; 	

		//alert("this._dayToday is " + this._dayToday+" dayMale is "+this._dayMale+" this._rotateTo "+this._rotateTo+" this._degreeDD is  "+this._degreeDD);
/*
		$("#orangeNeedle").easyRotate({
		       degrees: this._degreeDD-90
		});
*/	
		_startTime = new Date().getTime();
		this._blueNeedle  	= $("#blueNeedle");
		this._dayTodayLabel	= $("#day_today");
		$("#day_male").append("<span>"+this._dayMale.toString()[0]+this._dayMale.toString()[1]+"</span><br/>"+this._calendrierMois[this._dateMale.getMonth()]);
		this.updateRotation();
		this._intervalRotation = setInterval(this.updateRotation.context(this), this._needleFreq);	
	},
	
	getNextMale : function(d){
		var nextMale;

		var lastTuesday = this.getLastTuesday(d);

		if (d.isAfter(lastTuesday)){
			this._isAfter = true;
			
			var nextMonth = new Date(d).addMonths(1);

			nextMale = this.getLastTuesday(nextMonth);	
		}else{
			nextMale = lastTuesday;
			this._isAfter = false;
		}
		return nextMale;
	},

	getLastTuesday : function(d) {
		return new Date(d).final().tuesday();
	},
	
	easeOutBounce2 : function  (t, b, c, d) {
		//window.console.log(t);
		if ((t/=d) < (1/2.75)) {
		return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
		return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
		return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
		return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},

	updateRotation : function(){
	
		//alert("this.easeOutBounce2 " + this.easeOutBounce2);
		
				//window.console.log($(this._dayTodayLabel).text);

	
		this._t += this._timeFreq;//0.025;
		$(this._blueNeedle).easyRotate({ degrees: this._degree-90 });

		 if ( this._isAfter ) {
			if(this._degree <=this._rotateTo){
				this._degree = this._rotateTo;
				//alert('final degree is ' + this._degree);
				clearInterval(this._intervalRotation);
				$(this._blueNeedle).easyRotate({ degrees: this._degree-90 });								var l = String(this._dayMale - Math.round(this._degree/this._degreeByDay));								if(l[1]){					$(this._dayTodayLabel).text("J-"+l[0]+""+l[1]);									}else{					$(this._dayTodayLabel).text("J-0"+l[0]);							}
			}else{
				this._degree = this.easeOutBounce2(this._t, 0, this._rotateTo, this._duration);
				var l = String(this._dayMale - Math.round(this._degree/this._degreeByDay));
				if(l[1]){					$(this._dayTodayLabel).text("J-"+l[0]+""+l[1]);									}else{					$(this._dayTodayLabel).text("J-0"+l[0]);							}
			}
		}else{
			if(this._t >=this._duration ){
				this._degree = this._rotateTo;
				//alert('final degree is ' + this._degree);
				clearInterval(this._intervalRotation);
				$(this._blueNeedle).easyRotate({ degrees: this._degree-90 });
				//alert(new Date().getTime()-_startTime);
			}else{
				//this._degree += expoEaseInOut(this._t);
				this._degree = this.easeOutBounce2(this._t, 0, this._rotateTo, this._duration);
				var l = String(this._dayMale - Math.round(this._degree/this._degreeByDay));
				if(l[1]){
					$(this._dayTodayLabel).text("J-"+l[0]+""+l[1]);					
				}else{
					$(this._dayTodayLabel).text("J-0"+l[0]);			
				}
				
			}
		}
			

	}
})
