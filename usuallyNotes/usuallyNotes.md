#经常容易忘记的知识点以及快捷键
---
## 快捷键 ##
**新建文件窗口:ctrl+n**
## sublime快速整理代码(缩进) ##
	{ "keys": ["ctrl+q"], "command": "reindent" }
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
