# 处理安卓手机输入法遮挡输入框问题 #

- 为什么会挡住呢，因为在安卓部分机型下容器高度在键盘弹出的时候会减去键盘这部分高度，
fix的导航或者按钮就会顶上来，而IOS不会，所以通过onresize调整底部fix啊按钮样式

        // 处理安卓手机输入法遮挡输入框问题
            let windheight = window.innerHeight
            let _this = this
            window.onresize = adjuest
            adjuest()
            function adjuest () {
              let docheight = window.innerHeight
              if (docheight < windheight) {
                _this.ifFocus = true
              } else {
                _this.ifFocus = false
              }
            }
