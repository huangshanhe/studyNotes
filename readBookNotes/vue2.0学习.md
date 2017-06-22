# vue2.0学习 #

- 核心:组件 props down, events up 

绑定style

    <div v-bind:style="styleObject"></div>
    data: {
      styleObject: {
        color: 'red',
        fontSize: '13px'
      }
    }
    
    <!-- 同上 -->
    <input v-on:keyup.enter="submit">
    <!-- 缩写语法 -->
    <input @keyup.enter="submit">

单文件组件: template <script> <style scoped> 需要 webPack 解析

- 在 .vue 组件, data 必须是一个函数，它return（返回一个对象），这个返回的对象的数据，供组件实现。

- methods和computed区别

        methods是个方法，比如你点击事件要执行一个方法，这时候就用methods,
        computed是计算属性，实时响应的，比如你要根据data里一个值随时变化做出一些处理，就用computed。
        官方文档还是得多看几遍才能更好理解。

- v-bind:style直接绑定到一个样式对象通常更好，让模板更清晰：

        <div v-bind:style="styleObject"></div>
        data: {
          styleObject: {
            color: 'red',
            fontSize: '13px'
          }
        }

- 自定义组件 <my-row> 被认为是无效的内容，因此在渲染的时候会导致错误。变通的方案是使用特殊的 is 属性：

        <table>
          <tr is="my-row"></tr>
        </table>

- 组件引用循环

        beforeCreate: function () {
          this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue')
        }
