# CSS3属性transform详解之（旋转:rotate,缩放:scale,倾斜:skew,移动:translat额) # 

 
- 在CSS3中，可以利用transform功能来实现文字或图像的旋转、缩放、倾斜、移动这四种类型的变形处理，本文将对此做详细介绍。

- 一.旋转 rotate

                用法：transform: rotate(45deg);
                共一个参数“角度”，单位deg为度的意思，正数为顺时针旋转，
                负数为逆时针旋转，上述代码作用是顺时针旋转45度。

- 二.缩放 scale

                用法：transform: scale(0.5)  或者  transform: scale(0.5, 2);
                参数表示缩放倍数；
                一个参数时：表示水平和垂直同时缩放该倍率
                两个参数时：第一个参数指定水平方向的缩放倍率，第二个参数指定垂直方向的缩放倍率。

- 三.倾斜 skew

                用法：transform: skew(30deg)  或者 transform: skew(30deg, 30deg);
                参数表示倾斜角度，单位deg
                一个参数时：表示水平方向的倾斜角度；
                两个参数时：第一个参数表示水平方向的倾斜角度，第二个参数表示垂直方向的倾斜角度。
                关于skew倾斜角度的计算方式表面上看并不是那么直观，这里借鉴某大拿绘制的图举例说明一下：
                首先需要说明的是skew的默认原点transform-origin是这个物件的中心点
                我当初就是看到此图瞬间理解的。

- 四.移动 translate

                用法：transform: translate(45px)  或者 transform: translate(45px, 150px);
                参数表示移动距离，单位px，
                一个参数时：表示水平方向的移动距离；
                两个参数时：第一个参数表示水平方向的移动距离，第二个参数表示垂直方向的移动距离。

- 五.基准点 transform-origin

                在使用transform方法进行文字或图像的变形时，是以元素的中心点为基准点进行的。
                使用transform-origin属性，可以改变变形的基准点。
                用法：transform-origin: 10px 10px;
                共两个参数，表示相对左上角原点的距离，单位px，第一个参数表示相对左上角原点水平方向的距离，
                第二个参数表示相对左上角原点垂直方向的距离；
                两个参数除了可以设置为具体的像素值，其中第一个参数可以指定为left、center、right，
                第二个参数可以指定为top、center、bottom。

- 六.多方法组合变形

                上面我们介绍了使用transform对元素进行旋转、缩放、倾斜、移动的方法，
                这里讲介绍综合使用这几个方法来对一个元素进行多重变形。
                用法：transform: rotate(45deg) scale(0.5) skew(30deg, 30deg) translate(100px, 100px);
                这四种变形方法顺序可以随意，但不同的顺序导致变形结果不同，
                原因是变形的顺序是从左到右依次进行，这个用法中的执行顺序为1.rotate  2.scalse  3.skew  4.translate
                注：浏览器支持性不做介绍，具体使用时请做具体测试，

