var constant = require('./constant');
module.exports = { 
	normalize : function (randomValue) {
		var widthRange = constant.range.step1.maxRange - constant.range.step1.minRange;
		if( randomValue <= constant.range.step1.maxRange ){
			if(randomValue!=0) randomValue *= -1;
		}
		if( randomValue > constant.range.step1.maxRange && randomValue <= widthRange ){
			randomValue -= constant.range.step1.maxRange ;
		}
		if( randomValue >= widthRange ){
			randomValue = constant.range.step1.maxRange ;
		}
		return randomValue;
	}
}