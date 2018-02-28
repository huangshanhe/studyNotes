# for-in ifelse逻辑+jquery$('.XX, .XX, .xx') 晓聪教 #

- for-in

	json是js里的一种数据格式。
	var obj={a:15,b:8,c:12} json数组对象 
	var arr=[15,8,12]; 数组
	alert(obj.a); ---15
	alert(obj['a']);---15
	alert(arr[0]);---15
	
	
	for(var i=0;i<arr.length;i++){ //数组循环第一种写法
	alert(i+"="+arr[i]);
	}弹出：0=15 1=8 2=12
	
	for(var i in arr){ //数组循环第二种写法
	}
	
	for(var i in obj){ //json循环
	alert(i+"="+obj[i]);
	}弹出：a=15 b=8 c=12
	
	总结：数组既可以用for循环，也可以用for in循环（区别：for循环可以设置i的开始数字，可以从任何一个位置开始循环，但是for in循环不能设置，只能从第一个到最后一个进行循环）。
	json只能用for in循环，因为json的下标是没有规律的字符串，没有length。
	所以，一般数组就用for循环，json用for in循环。

- if else 尽可能合并相同部分

- jquery .#合并 jquery$('.XX, .XX, .xx') (晓聪教) 

-测试测试
