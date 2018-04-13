# keep-alive #

        项目进行到了一定程度，然而项目缺少了缓存机制，所以每次跳转页面都会重新created一下数据，
        虽说系统的数据请求速度很快，但是这样做对系统的性能会有很大的坏处的，所以到这里就要对系统优化下，添加缓存了。
        其实到现在，对于vue还是没有玩通，每深挖一次，就会发现一次vue的精彩，开始不清楚要用什么实现缓存，
        找了好久，有好几种说法，就是用vuex、vuet或者keep-alive，然后对比了一下，在我认为，
        vuex和vuet是实现状态管理，重心是在数据处理上；想要实现整体的缓存，阻止created的刷新，就要用keep-alive。
        所以这里我想要给大家介绍下如何用keep-alive实现缓存的页面？其实很简单，就是几句话而已。

        1、keep-alive要配合router-view使用，这里要注意一点就是，keep-alive本身是vue2.0的功能，
        并不是vue-router的，所以再vue1.0版本是不支持的。keep-alive官方文档点这里，代码实现如下，router-view是在入口APP.vue里面

        <template>
          <div id="app">

            <keep-alive>
              <router-view></router-view>
            </keep-alive>

            <!--这里是其他的代码-->
          </div>
        </template>
        2、这样就会实现组件的缓存，但是有个缺点就是所有组件都会被缓存，可是现实中就是我们有些页面还是要及时刷新的，
        比如列表数据，想要查看详情的时候都是共用一个组件，只是刷新页面，所以这个共用的组件是不能够缓存的，
        不然会造成点其他的条目都是之前缓存的数据。那要怎么自定义呢，那就要在router-view里面多加个v-if判断了，
        然后在router定义的文件里面在想要缓存的页面多加上“meta:{keepAlive:true}”，
        不想要缓存就是“meta:{keepAlive:false}”或者不写，只有为true的时候是会被keep-alive识别然后缓存的。

        <template>
          <div id="app">
            <!--缓存想要缓存的页面，实现后退不刷新-->
            <!--加上v-if的判断，可以自定义想要缓存的组件，自定义在router里面-->
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>

            <!--这里是其他的代码-->
          </div>
        </template>

        3、在router文件加上meta判断

        import Vue from 'vue'
        import Router from 'vue-router'

        Vue.use(Router)
        export default new Router({
            {//home会被缓存
                path:"/home",
                component:home,
                meta:{keepAlive: true}
            }
            {//hello不会被缓存
                path:"/hello",
                component:hello,
                meta:{keepAlive: false}
            }
        })
        想要看有没有缓存成功，可以在各个组件的created钩子里面打印输出标志，缓存成功就是首次进入页面，
        created会请求数据，后面就不会再次请求而是直接调用缓存的

        添加了缓存可以大大减少对系统性能的损坏，毕竟做数据处理型的系统，数据过于庞大，每次都要请求一下页面是很不好的，
        有了缓存，该缓存的缓存，不想缓存也可以实时刷新
