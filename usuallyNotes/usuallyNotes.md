# 经常容易忘记的知识点以及快捷键 #

## 快捷键666 ##

* [解构不定参数](http://www.infoq.com/cn/articles/es6-in-depth-destructuring/ "解构不定参数")

**新建文件窗口:ctrl+n**

** 鼠标移上去变手：cursor:pointer; **

**原生js性能好,jquery是库不是框架，vue、react、angularjs、bootstrap是框架，框架要按规则来**

**如果一个方法定义了但是报错undefine，可能和vue冲突，或者和框架冲突，尝试换个位置，放在vue外面或者框架外面**

**直接在chrome控制台的console可以操作**

- 选择符 $('.aaa.bbb')表示并且(同一个class)    
- $('.aaa .bbb')bbb为aaa子元素(可以是孙子或者孙孙子)  
- $('.aaa>.bbb')(bbb为aaa儿子(只能是儿子))
- $('.aa,.bb,.cc')没有父子关系的class一起选择

**背景图样式**

	.bg-pic{
		background: url("a.png") no-repeat left center;
	}

**获取url里的参数**

	var str = location.search.split('='),//search()取'?'后面的内容
	    projectId = str[1];

**对象合并**

	var dataObjec={},ruleDatas={},values={},options={};//初始化
	values[字段名]=data.value;//赋值
	var postDate = $.extend({},dataObject,ruleDatas,values,options)//合并对象

**attr()和addClass()区别：attr('class','')直接全部覆盖，而addClass()在原来基础上追加class,removeClass('a b c')空格隔开**

**jquery选择器-----eq等于-----gt大于------lt小于-----**

**@submit.prevent="test" 表单提交前执行,数据处理 vue2.0**

	retrun true； 返回正确的处理结果。
	return false；返回错误的处理结果，终止处理。
	return；把控制权返回给页面。

## sublime快速整理代码(缩进) ##

	{ "keys": ["ctrl+q"], "command": "reindent" }

## javascript学习笔记 ##

- switch 语句会使用恒等计算符(===)进行比较:

		var x = 10;
		switch(x) {
		    case "10": alert("Hello");
		}//该实例由于类型不一致不会执行 alert 弹窗

- 变量提升：函数声明和变量声明总是会被解释器悄悄地被"提升"到方法体的最顶部。
函数及变量的声明都将被提升到函数的最顶部。JavaScript 中，变量可以在使用后声明，也就是变量可以先使用再声明。

		x = 5; // 变量 x 设置为 5		
		elem = document.getElementById("demo"); // 查找元素 
		elem.innerHTML = x;                     // 在元素中显示 x		
		var x; // 声明 x
		resule: 5
	
- 但是JavaScript 只有声明的变量会提升，初始化的不会。

		var x = 5; // 初始化 x
		var y = 7; // 初始化 y
		elem = document.getElementById("demo"); // 查找元素 
		elem.innerHTML = x + " " + y;           // 显示 x 和 y
		结果：5 7

		var x = 5; // 初始化 x
		elem = document.getElementById("demo"); // 查找元素 
		elem.innerHTML = x + " " + y;           // 显示 x 和 y
		var y = 7; // 初始化 y
		结果：5 undefine
	
- 函数提升（Hoisting）在之前的教程中我们已经了解了 "hoisting(提升)"。
提升（Hoisting）是 JavaScript 默认将当前作用域提升到前面去的的行为。
提升（Hoisting）应用在变量的声明与函数的声明。因此，函数可以在声明之前调用：

		myFunction(5);
		function myFunction(y) {
		    return y * y;
		}
		resule: 25
		
- Arguments 对象JavaScript 函数有个内置的对象 arguments 对象。argument 对象包含了函数调用的参数数组。通过这种方式你可以很方便的找到最大的一个参数的值：实例

		x = findMax(1, 123, 500, 115, 44, 88); 
		function findMax() {
		    var i, max = arguments[0];
		    if(arguments.length < 2) return max;
		    for (i = 0; i < arguments.length; i++) {
			if (arguments[i] > max) {
			    max = arguments[i];
			}
		    }
		    return max;
		}

## 代码片段 ##
- ajax

		var data = {  }
		async: false,//关闭异步，防止数据还没拿到下面就开始用报错，不推荐，会导致主线程阻塞卡死！
		$http.post('/people/deleteBatch',data,postCfg)
		     .success(function(resp){
		   })

			mui.ajax(base+'/personaldayYield/findPeopleReportStates', {//mui的ajax
				data: {
				'checkDate':data,
			       'personaldayYield.project.id':projectId
				},
				dataType: 'json',
				type: 'POST',
				async: false,//这句是关键,刚接触前端的时候被坑过
				timeout: 5000,
				success: function(data) {  
			 }
		    })

- div并排显示和阴影
 		
		<div id="div1" style="width:100;">
			<div id="div2" style="width:33%;display:inline-block;">
			内容
			</div>

			<div id="div3" style="width:33%;display:inline-block;">
			内容
			</div>

			<div id="div4" style="width:33%;display:inline-block;">
			内容
			</div>
		</div>

		//阴影
		<div id="shadow" style="box-shadow: 3px 3px 5px -3px red;">
		   box-shadow:x轴距离,y轴距离，阴影的模糊程度，阴影的大小，颜色。
		</div>
	
- html拼接

		 `onclick=\"test(&quot;"+files[i].name+"&quot;)\"`

## 循环 ##

### $.each( object||array, callback ) ###


 	$.each([52, 97], function(index, value) {
		alert(index + ': ' + value);
	});

	var arr1 = [ “one”, “two”, “three”, “four”, “five” ];
	$.each(arr1, function(){
		alert(this);
	});
	输出：one   two  three  four   five

	var arr2 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
	$.each(arr2, function(i, item){
		alert(item[0]);
	});
	输出：1   4   7

	var obj = { one:1, two:2, three:3, four:4, five:5 };
	$.each(obj, function(key, val) {
		alert(obj[key]);
	});
	输出：1   2  3  4  5


### jQuery 遍历 - each() 方法主要用于DOM遍历，each() 方法规定为每个匹配元素规定运行的函数。  ###

* 语法：$(selector).each(function(index,element))

	    $("li").each(function(){
		alert($(this).text())
	    });

		$(“input[name=’ch’]”).each(function(i){
		if($(this).attr(‘checked’)==true)
		{
			//一些操作代码
		}

## 英文缩写 ##

- SEO 是由英文Search Engine Optimization  (搜索引擎优化)
- UED User Experience Design             (用户体验设计)
- BD 即Business Development              (业务拓展或商务拓展)
