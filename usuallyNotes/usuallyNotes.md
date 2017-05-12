#经常容易忘记的知识点以及快捷键
---
##快捷键
**新建文件窗口:ctrl+n**
##代码片段
- ajax

		var data = {  }
		async: false,//关闭异步，防止数据还没拿到下面就开始用报错
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
	
		        <div id="div2" style="width:33%;dispaly:inline-block;">
				内容
				</div>
		
				<div id="div3" style="width:33%;dispaly:inline-block;">
				内容
				</div>
		
				<div id="div4" style="width:33%;dispaly:inline-block;">
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