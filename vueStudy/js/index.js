/**
 * Created by hsh on 2017/3/17.
 */

//组件
var data = {first:'我的第一个组件'};
 Vue.component('my-component',{
    template:'<div>{{first}}</div>',
    data: function(){
        return data;
    }
 });

var vue = new Vue({
    el: '#demo1',
    data: {
        items: [1,2,3,4,5,6,7,8,9],
        nextNum: 10,
        name:'hello vue2.0!',
        todos: [
            { text: 'Learn JavaScript',id:1 },
            { text: 'Learn Vue',id:2 },
            { text: 'Build something awesome',id:3  }
        ]
    },
    methods: {
        say: function(){
            var a = '提交成功';
            var start = Date.now();
            var start1 = new Date();
            alert(a);
            var end = Date.now();
            var end1 = new Date();
            alert(end-start);
            alert(end1.getTime()-start1.getTime());
        },
        reverse: function(){
            this.name = this.name.split('').reverse().join('');
        },
        randomIndex: function () {
            return Math.floor(Math.random() * this.items.length);
        },
        add: function () {
            this.items.splice(this.randomIndex(), 0, this.nextNum++);
        },
        remove: function () {
            this.items.splice(this.randomIndex(), 1);
        },
        shuffle: function () {
            this.items = _.shuffle(this.items);
        },
        test: function(){debugger
            alert("test");
        }
    }
});

var data = { counter: 0 };
Vue.component('simple-counter', {
  props: ['message'],
  template: '<button class="btn btn-info" v-on:click="counter += 1">{{message}}:{{ counter }}</button>',
  // 技术上 data 的确是一个函数了，因此 Vue 不会警告，
  // 但是我们返回给每个组件的实例的却引用了同一个data对象
  data: function () {
    return {
    counter: 0
   };
  }
});
//另一个实例
 var another = new Vue({
    el:'#another',
    data:{
        another:'另一个实例',
        message:'msg'
    }
 });

vue.todos.push({text:'push',id:4});



//路由demo
// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)
// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Home = { template: '<div>home</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  { path: '/', component: Home }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')

// 现在，应用已经启动了！


