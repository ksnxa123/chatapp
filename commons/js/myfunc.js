export default{
	dateTime(e){
		let old = new Date(e);
		let now = new Date();
		
		let d = old.getTime();
		let h = old.getHours();
		let m = old.getMinutes();
		let Y = old.getFullYear();
		let M = old.getMonth()+1;
		let D = old.getDate();
		
		let nd = now.getTime();
		let nh = now.getHours();
		let nm = now.getMinutes();
		let nY = now.getFullYear();
		let nM = now.getMonth()+1;
		let nD = now.getDate();
		if(D === nD&&M === nM && Y === nY){
			if(h<10){
				h = '0' + h;
			}
			if(m<10){
				m = '0' + m;
			}
			return h + ':' + m;
		}
		//前天时间
		if(D+1 === nD&&M === nM && Y === nY){
			if(h<10){
				h = '0' + h;
			}
			if(m<10){
				m = '0' + m;
			}
			return '前天' + h + ':' + m;
		}else{
			//大于两天前
			return Y + '/' + M + '/' + D;
		}
		return old;
	}
}