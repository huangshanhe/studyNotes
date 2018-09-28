# 用FileReader实现前端图片预览 #


        在FileReader出现之前，前端的图片预览是这样实现的：把本地图片上传到服务器，
        服务器把图片地址返回，并把它替换到图片元素的src属性。
        这种方法的缺点是：必须要先把图片上传到服务器。那么问题来了，如果上传的图片很大，
        而网速又很慢，这就需要等待很久预览图片才会显示出来了，而且，如果用户预览图片后发现不太满意，
        想重新选择一张图片，这时候还要把已经上传到服务器上的图片给删除掉。
        自从有了HTML5的FileReader对象以后，预览图片变得简单多了，不再需要后台的配合，
        并且JS操作本地文件已经成为了可能。这种方法的思路是：
        通过FileReader.prototype.readAsDataURL()方法把图片文件转成base64编码，然后把base64编码替换到预览图片的src属性即可。
        
     
     
     
        let file = this.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = function (file) {
          // 图片上传操作，那么this.url可以为服务器图片地址
          this.url = file.target.result
        }
