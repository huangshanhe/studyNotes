# 锋利的jquery #

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

## 选择器是jquery的根基 ##

- CSS 选择器
- 群组选择器 E1,E2,E3{CSS}  td,p,div.a{font-size:14px;} 
- 后代选择器 E F{}  .btn span{}
- 通配符选择器 * {}

-jquery选择器继承了CSS选择器
-基本选择器
-层次选择器

		$("ancestor descendant") 后代元素
		$("parent > child")  子元素
		$(“prev + next”) 下一个元素 可以直接用.next()方法
		$(”prev̚siblings”) 后面的同辈元素

- **选择器过滤器 $="value"以value结束 ^="value"以value开始  eq(1)下标为1**

		属性选择过滤器 [attribute=value]
		$("div[id][title$='test']")选取属性有id并且属性title以"test"结束的<div>元素

- 过滤选择器 :
- 属性选择器 []

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
		 
- jquery动画 show() hide() 'slow' 'normal' 'fast' 分别是 0.6 0.4 0.2秒 或者 show(10000) 10s  .fadeIn .fadeOut淡入淡出
- animate animate(params, speed , callback); delay(1000)延迟一秒 

		$(this).animate({left: "500px"}, 3000)
		 .animate({height: "200px"}, 3000); 
		  toggle( speed, [callback] )
		  
		 slideToggle( speed, [ easing ], [callback] )
		 fadeTo( speed, opacity, [callback] )
		 fadeToggle ( speed, [ easing ], [callback] )
		 
		 $(function(){
		 var $comment = $('#comment'); //获取评论框
		 $('.bigger').click(function(){ //“放大”按钮绑定单击事件
			 if(!$comment.is(":animated")){ //判断是否处于动画
		 		if( $comment.height() < 500 ){
		 			//重新设置高度，在原有的基础上加 50
		 		$comment.animate({ height : "+=50" },400);
				 }
			 }
		 })
		 $('.smaller').click(function(){ //“缩小”按钮绑定单击事件
		 if(!$comment.is(":animated")){ //判断是否处于动画
		 	if( $comment.height() > 50 ){
		 		//重新设置高度，在原有的基础上减 50
				 $comment.animate({ height : "-=50" },400);
		 		}
			 }
		 });
		}); 

- jquery表单应用
表单校验-现在有组件可用就不用自己写了
网页选项卡就是通过显示和隐藏来控制 也可以换肤

- jquery中的ajax global是否触发ajax全局事件，默认true

使用jQuery进行ajax编码的时候，经常会使用到这3个API，本文学习下这3个API的使用方式。如下的HTML片段，如果我们将holder表单下的控件值提交到服务器。就需要用到serialize或者serializeArray了。

		[html] view plain copy
		<form id="holder">  
		  <input type="text" name="a" value="1"/>  
		  <div>  
		    <input type="text" name="b" value="2" id="b" />  
		  </div>  
		  <input type="hidden" name="c" value="3" id="c" />  
		  <div>  
		    <input type="checkbox" name="f" value="8" checked="true"/>  
		    <input type="checkbox" name="f" value="9" checked="true"/>  
		  </div>  
		</form>  
		
		$("#holder").serialize()   输出结果是 a=1&b=2&c=3&f=8&f=9

		$("#holder").serializeArray() 输出结果如下：

		[plain] view plain copy
		[   
		  {name: 'a', value: '1'},   
		  {name: 'b', value: '2'},  
		  {name: 'c', value: '3'},  
		  {name: 'f', value: '8'},  
		  {name: 'f', value: '9'}  
		]  
		
		$.param()方法是serialize()方法的核心，用来对一个数组或对象按照key/value进行序列化。
		比如将一个普通的对象序列化：
		var obj = {a:1,b:2,c:3};
		var k = $.param(obj);
		alert(k);    //输出a=1&b=2&c=3


- jquery扩展 mobile html5  (jqMobi Zeoto.js phoneGap)


# jquery性能优化(当用jquery开发一个复杂的动画和web应用,jquery可能成为性能上的终极噩梦) #

- 选择最佳选择器  如$("#id")性能最佳

- 避免使用：

		$("[attribute=value]") 
		$("#content").find(":hidden");
		$("a.button").filter(":animated"); 
		
- 链式操作 全局缓存dom对象或者jquery对象

		var $activeBlight = $("#trafficBlight input.on");
		$activeBlight.bind("click", function(){ ... })
		 .css({
			 "border":"1px dashed yellow",
			 "background-color":"orange"
		 })
		 .fadeIn("slow"); 
	
- 用 for 替代 each()
- 写成插件复用
- 使用 join('')代替拼接
- 有时候使用原生javascript方法

		var $cr = $("#cr"); //jQuery 对象
		var cr = $cr.get(0); //DOM 对象，获取 $cr[0]
		$cr.click(function(){
		 if( cr.checked ){ //原生的 JavaScript 方式判断
		 	alert("感谢你的支持!你可以继续操作!");
		 	}
		}) 

# jquery技巧 基本都基于 $(document).ready(function() {}); #

- 判断元素是否存在

		$(document).ready(function() {
			 if ($('#id').length){
		 // do something
		 }
		}); 
- div居中

		$(document).ready(function() {
		 jQuery.fn.center = function () {
			 this.css("position","absolute");
			 this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
			 this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
			 return this;
		 }
		 //use
		 $("#XY").center();
		}); 
		
- 回车表单提交

		$(document).ready(function() {
			 $("input").keyup(function(e){
			 if(e.which=="13") {
				alert("回车提交!")
				}
			 })
		}); 
		
- 设置全局 ajax参数

		$("#load").ajaxStart(function(){
			 showLoading(); //显示 loading
			 disableButtons(); //禁用按钮
		});
		$("#load").ajaxComplete(function(){
			 hideLoading(); //隐藏 loading
			 enableButtons(); //启用按钮
		}); 
		
- 获取选中下拉框

		$('#someElement').find('option:selected');
		$('#someElement option:selected'); 
		
- 切换复选框

		var tog = false;
		$('button').click(function(){
			 $("input[type=checkbox]").attr("checked",!tog);
			 tog = !tog;
		}); 
		
- 使用siblings()来选择同辈元素

		// 不这样做
		$('#nav li').click(function(){
			 $('#nav li').removeClass('active');
			 $(this).addClass('active');
		});
		//替代做法是
		$('#nav li').click(function(){
			 $(this).addClass('active')
			 .siblings().removeClass('active');
		}); 

- 个性化链接

		$(document).ready(function(){
			 $("a[href$='pdf']").addClass("pdf");
			 $("a[href$='zip']").addClass("zip");
			 $("a[href$='psd']").addClass("psd");
		}); 
		
- 在一段时间后自动显示隐藏 setTimeout

		//这是 1.3.2 中我们使用 setTimeout 来实现的方式
		setTimeout(function() {
		 $('div').fadeIn(400)
		}, 3000);
		//而在 1.4 之后的版本可以使用 delay()这一功能来实现的方式
		$("div").slideUp(300).delay(3000).fadeIn(400); 
		
- html5本地存储新属性 localStorage sessionStorage
