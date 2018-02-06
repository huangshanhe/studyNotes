# flex布局-align-items与align-content和justify-content的区别 #

- align-items:单行水平居中，有padding
- align-content:多行水平居中，粘在一起
- justify-content:在主轴上对其方式-一般用于垂直居中

- align-items属性适用于所有的flex容器，它是用来让每一个单行的容器居中
而不是让整个容器居中。单行时候垂直居中使用align-items: center;
align-content属性只适用于多行的flex容器，并且当侧轴上有多余空间
使flex容器内的flex线对齐。单行显示时align-content: center没有作用。
