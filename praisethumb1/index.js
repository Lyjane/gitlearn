window.add=function (num) {
	return num+1;
}

//函数式编程    涵子 柯里化
const result=(function(){
	function _(){

	}
	_.add=function(){
		return function(){

		}
	}
	function aa(){

	}
	return {aa}
})();