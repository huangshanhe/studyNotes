# 2017-06-05-freeMaker当日日期+vue相关笔记 #

**freeMaker当前日期获取**

	data-date=".now"

**vue相关**

- 渲染前

			mounted: function() {
                    $XXXX.init();
                    this.reqCustomer();
                }

- 渲染后

			this.$nextTick(function() {
                    $('.J_Checkbox').uniform();
                })
**将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。**