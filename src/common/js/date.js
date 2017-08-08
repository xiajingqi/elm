/**
 * 返回日期格式
 * @return 2017-08-08 16:16
 */
export function formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (str > 10) ? str :"0"+str)
		}
	}
	return fmt;
};
/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse() {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  // ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
};
/**
 * 存ID
 *
 *
 */
export function saveToLocal(id,key,val){
	let seller=window.localStorage.__seller__;
	// seller不存在
	if(!seller){
		seller={};
		seller[id]={};
	}else{
		// json格式字符串转换成json对象
		seller=JSON.parse(seller);
		// id不存在
		if(!seller[id]){
			seller[id]={};
		}
	}
	seller[id][key]=val;
	// 转换成json格式字符串
	window.localStorage.__seller__=JSON.stringify(seller);
}
/**
 * 取数据
 *
 *
 */
export function loadFromLocal(id, key, def) {
	let seller = window.localStorage.__seller__;
	if (!seller) {
		return def;
	}
	seller = JSON.parse(seller)[id];
	if (!seller) {
		return def;
	}
	let ret = seller[key];
	return ret || def;
};