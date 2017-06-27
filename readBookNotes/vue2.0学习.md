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

## 生命周期-钩子 ##

        - **beforeCreate**:在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。
        - **created**:实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回 调。然而，挂载阶段还没开始，$el 属性目前不可见。
        - **beforeMount**:在挂载开始之前被调用：相关的 render 函数首次被调用。
        - **mounted**:el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
        - **beforedUpdate**:数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
        - **updated**:由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
        - **activated**:keep-alive 组件激活时调用。

**computed(不是生命周期)**:计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。
