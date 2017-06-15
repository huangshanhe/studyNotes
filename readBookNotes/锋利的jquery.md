# 锋利的jquery先开始 #

- jquery由John Resig创建于2006年1月

		$(document).ready(function(){
	        alert("jquery");
	    })
		//简写
		$(function(){
        	alert("jquery");
    	})

- 链式操作换行缩进格式增加代码可读性

		$(this).removeClass("mouseout")
			   .addClass("mouseover")
			   .stop()
			   .fadeTo("fast",0.6)
			   .fadeTo("fast",1)
			    ..... 

- jQuery.noConflict()将控制权交给其他库


- **选择器过滤器 $="value"以value技术 ^="value"以value开始  eq[1]下标为1**

		属性选择过滤器 [attribute=value]
		$("div[id][title$='test']")选取属性有id并且属性title以"test"结束的<div>元素


- 子元素选择过滤器 :nth-child
- 表单对象属性过滤器 :checked :selected :enabled :disabled

	retrun true； 返回正确的处理结果。
	return false；分会错误的处理结果，终止处理。
	return；把控制权返回给页面。
	return false一般是用来取消默认动作的。
	比如你单击一个链接除了触发你的onclick事件，如果return false的话，就会阻止跳转。
	所以return false基本的作用是取消对象的默认动作。
	return和基本的语言中的return类似，执行到return就返回了，后面的语句将不执行了。
	
- toggle()简化代码

		$(function(){
			 $("#panel h5.head").toggle(function(){
			   $(this).next().toggle();
			 },function(){
			   $(this).next().toggle();
			 })
		 }); 
