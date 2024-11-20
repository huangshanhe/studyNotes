# vue和react的diff算法 #

## vue 参考[这里](https://juejin.im/post/5affd01551882542c83301da) ##

- 主要是patch补丁函数

        function patch (oldVnode, vnode) {
            // some code
            if (sameVnode(oldVnode, vnode)) {
              patchVnode(oldVnode, vnode)
            } else {
              const oEl = oldVnode.el // 当前oldVnode对应的真实元素节点
              let parentEle = api.parentNode(oEl)  // 父元素
              createEle(vnode)  // 根据Vnode生成新元素
              if (parentEle !== null) {
                    api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl)) // 将新元素添加进父元素
                    api.removeChild(parentEle, oldVnode.el)  // 移除以前的旧元素节点
                    oldVnode = null
              }
            }
            // some code 
            return vnode
        }
        
        function sameVnode (a, b) {
          return (
            a.key === b.key &&  // key值111
            a.tag === b.tag &&  // 标签名
            a.isComment === b.isComment &&  // 是否为注释节点
            // 是否都定义了data，data包含一些具体信息，例如onclick , style
            isDef(a.data) === isDef(b.data) &&  
            sameInputType(a, b) // 当标签是<input>的时候，type必须相同
          )
        }
        
        patchVnode (oldVnode, vnode) {
            const el = vnode.el = oldVnode.el
            let i, oldCh = oldVnode.children, ch = vnode.children
            if (oldVnode === vnode) return
            if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {
                api.setTextContent(el, vnode.text)
            }else {
                updateEle(el, vnode, oldVnode)
              if (oldCh && ch && oldCh !== ch) {
                    updateChildren(el, oldCh, ch)
              }else if (ch){
                    createEle(vnode) //create el's children dom
              }else if (oldCh){
                    api.removeChildren(el)
              }
            }
        }



        updateChildren (parentElm, oldCh, newCh) {
            let oldStartIdx = 0, newStartIdx = 0
            let oldEndIdx = oldCh.length - 1
            let oldStartVnode = oldCh[0]
            let oldEndVnode = oldCh[oldEndIdx]
            let newEndIdx = newCh.length - 1
            let newStartVnode = newCh[0]
            let newEndVnode = newCh[newEndIdx]
            let oldKeyToIdx
            let idxInOld
            let elmToMove
            let before
            while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
                if (oldStartVnode == null) {   // 对于vnode.key的比较，会把oldVnode = null
                    oldStartVnode = oldCh[++oldStartIdx] 
                }else if (oldEndVnode == null) {
                    oldEndVnode = oldCh[--oldEndIdx]
                }else if (newStartVnode == null) {
                    newStartVnode = newCh[++newStartIdx]
                }else if (newEndVnode == null) {
                    newEndVnode = newCh[--newEndIdx]
                }else if (sameVnode(oldStartVnode, newStartVnode)) {
                    patchVnode(oldStartVnode, newStartVnode)
                    oldStartVnode = oldCh[++oldStartIdx]
                    newStartVnode = newCh[++newStartIdx]
                }else if (sameVnode(oldEndVnode, newEndVnode)) {
                    patchVnode(oldEndVnode, newEndVnode)
                    oldEndVnode = oldCh[--oldEndIdx]
                    newEndVnode = newCh[--newEndIdx]
                }else if (sameVnode(oldStartVnode, newEndVnode)) {
                    patchVnode(oldStartVnode, newEndVnode)
                    api.insertBefore(parentElm, oldStartVnode.el, api.nextSibling(oldEndVnode.el))
                    oldStartVnode = oldCh[++oldStartIdx]
                    newEndVnode = newCh[--newEndIdx]
                }else if (sameVnode(oldEndVnode, newStartVnode)) {
                    patchVnode(oldEndVnode, newStartVnode)
                    api.insertBefore(parentElm, oldEndVnode.el, oldStartVnode.el)
                    oldEndVnode = oldCh[--oldEndIdx]
                    newStartVnode = newCh[++newStartIdx]
                }else {
                   // 使用key时的比较
                    if (oldKeyToIdx === undefined) {
                        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx) // 有key生成index表
                    }
                    idxInOld = oldKeyToIdx[newStartVnode.key]
                    if (!idxInOld) {
                        api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                        newStartVnode = newCh[++newStartIdx]
                    }
                    else {
                        elmToMove = oldCh[idxInOld]
                        if (elmToMove.sel !== newStartVnode.sel) {
                            api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                        }else {
                            patchVnode(elmToMove, newStartVnode)
                            oldCh[idxInOld] = null
                            api.insertBefore(parentElm, elmToMove.el, oldStartVnode.el)
                        }
                        newStartVnode = newCh[++newStartIdx]
                    }
                }
            }
            if (oldStartIdx > oldEndIdx) {
                before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].el
                addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx)
            }else if (newStartIdx > newEndIdx) {
                removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
            }
        }




## react [参考](https://segmentfault.com/a/1190000000606216) ##
## [参考git](https://github.com/lanjingling0510/blog/issues/1#title4) ##

          _updateChildren: function(nextNestedChildrenElements, transaction, context) {
            var prevChildren = this._renderedChildren;
            var removedNodes = {};
            var mountImages = [];

            // 获取新的子元素数组
            var nextChildren = this._reconcilerUpdateChildren(
              prevChildren,
              nextNestedChildrenElements,
              mountImages,
              removedNodes,
              transaction,
              context
            );

            if (!nextChildren && !prevChildren) {
              return;
            }

            var updates = null;
            var name;
            var nextIndex = 0;
            var lastIndex = 0;
            var nextMountIndex = 0;
            var lastPlacedNode = null;

            for (name in nextChildren) {
              if (!nextChildren.hasOwnProperty(name)) {
                continue;
              }
              var prevChild = prevChildren && prevChildren[name];
              var nextChild = nextChildren[name];
              if (prevChild === nextChild) {
                // 同一个引用，说明是使用的同一个component,所以我们需要做移动的操作
                // 移动已有的子节点
                // NOTICE：这里根据nextIndex, lastIndex决定是否移动
                updates = enqueue(
                  updates,
                  this.moveChild(prevChild, lastPlacedNode, nextIndex, lastIndex)
                );

                // 更新lastIndex
                lastIndex = Math.max(prevChild._mountIndex, lastIndex);
                // 更新component的.mountIndex属性
                prevChild._mountIndex = nextIndex;

              } else {
                if (prevChild) {
                  // 更新lastIndex
                  lastIndex = Math.max(prevChild._mountIndex, lastIndex);
                }

                // 添加新的子节点在指定的位置上
                updates = enqueue(
                  updates,
                  this._mountChildAtIndex(
                    nextChild,
                    mountImages[nextMountIndex],
                    lastPlacedNode,
                    nextIndex,
                    transaction,
                    context
                  )
                );


                nextMountIndex++;
              }

              // 更新nextIndex
              nextIndex++;
              lastPlacedNode = ReactReconciler.getHostNode(nextChild);
            }

            // 移除掉不存在的旧子节点，和旧子节点和新子节点不同的旧子节点
            for (name in removedNodes) {
              if (removedNodes.hasOwnProperty(name)) {
                updates = enqueue(
                  updates,
                  this._unmountChild(prevChildren[name], removedNodes[name])
                );
              }
            }
          }
