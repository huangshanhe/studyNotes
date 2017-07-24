# bootstrap美化alert-自定义模态框 #

- 先引入 bootstrap的css 和　js

- 然后在头文件顶部

                <button class="btn btn-primary btn-lg J_Alert" style="display:none" data-toggle="modal" data-target="#myModal">alert</button>
                
                <!-- 模态框（Modal） -->
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog"  style="width:300px;">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h4 class="modal-title" id="myModalLabel">系统消息</h4>
                            </div>
                            <div class="modal-body J_Info">网络连接失败，请稍后再试！</div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
                            </div>
                        </div>
                    </div>
                </div>

- 最后在头文件尾部封装方法 或者 直接在页面调用

                $('.J_Info').text(res.message);//错误信息
                $('.J_Alert').click();//弹出提示信息
