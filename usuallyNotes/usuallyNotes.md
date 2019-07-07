# 经常容易忘记的知识点以及快捷键 #

## 快捷键 ##

**新建文件窗口:ctrl+n**

- 刷新跳转返回页面顶部

		window.onbeforeunload = function(){
		    document.documentElement.scrollTop = 0;  //ie下
		    document.body.scrollTop = 0;  //非ie
		};

**原生js性能好,jquery是库不是框架，vue、react、angularjs、bootstrap是框架，框架要按规则来**

**div内的两个并排div顶对齐有时候会被内容干扰不对齐,vertical-align: top 即可**

** setTimeout(test,600)或者  如下  如果是方法，不要加()会失效，()加习惯了好坑**

	setTimeout(function time(){
		this.priceLazy = true;
		this.$nextTick(() => {
		    $('.price').addClass('price-animated');
		})
	 },480);

- 选择符 $('.aaa.bbb')表示并且(同一个class)    
- $('.aaa .bbb')bbb为aaa子元素(可以是孙子或者孙孙子)  
- $('.aaa>.bbb')(bbb为aaa儿子(只能是儿子))
- $('.aa,.bb,.cc')没有父子关系的

# 基础、算法、项目经历、react、node 123456789#

# webgl、opengl、canvas、three.js、3d 加分 #
