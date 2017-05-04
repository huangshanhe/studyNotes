/*windows7安装完启动报错，如下操作即可解决*/
按Win+R（或点击开始-运行），并输入regedit后确定，启动注册表编辑器。
浏览到HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Lsa\FipsAlgorithmPolicy，将Enabled的值改为0
关闭注册表编辑器后，重新启动。
