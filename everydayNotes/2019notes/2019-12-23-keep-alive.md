# keep-alive和actived、deactived #

- 只有被<keep-alive>包裹才会有actived、deactived钩子
- 包含了keep-alive的组件，created()、mounted()都只会触发一次。但是activated每一次进入组件，都会触发一次
  
      keep-alive是vue.js的内置组件，它能够把不活动的组件的实例保存在内存中，而不是直接的销毁，
      它是一个抽象组件，不会被渲染到真实DOM中，也不会出现在父组件链中。
      它提供了exclude和include两个属性，允许组件有条件的缓存。
      eep-alive组件提供了include和exclude两个属性来进行有条件的缓存，二者都可以用逗号分隔字符串、正则表达式或则数组表示。
      
      <keep-alive include="a">
          <component></component>
      </keep-alive>
      //name名为a的组件会被缓存起来

      <keep-alive exclude="a">
          <component></component>
      </keep-alive>
      //name名为a的组件将不会被缓存。

- keep-alive提供了两个生命钩子，actived与deactived。

      因为keep-alive会把组件保存到内存中，并不会销毁或则重新构建，所以不会调用组件的creted等方法，
      需要使用actived和deactived两个钩子判断组件是否处于活动状态。
      
      
      created和destroyed钩子
      created钩子会创建一个cache对象，用来作为缓存容器，保存Vnode节点。

      created{
          this.cache=Object.create(null);
      }
      destroyed钩子则在组件销毁的时候清除cache缓存中的所有组件实例。

      /* destroyed钩子中销毁所有cache中的组件实例 */
      destroyed () {
          for (const key in this.cache) {
              pruneCacheEntry(this.cache[key])
          }
      },
