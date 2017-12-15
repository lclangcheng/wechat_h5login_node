# 第三方网站微信登录实现
公司有个项目需要接入微信登录功能，然后就小试牛刀，写了个小例子。
### 需要准备的资料
一.使用ngrok工具，解决本地项目映射外面访问的地址，官网：https://dashboard.ngrok.com
>>使用方法：执行ngrok http 80命令，然后你就能在终端里看见你的映射的域名
>>缺点：每次重启服务，域名都会改变
二.微信公众平台进行配置
>>地址： http://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
>>1.配置 “接口配置信息”
>>>>URL: 验证的接口
>>>>Token:自定义值（消息验证时需要）
>>>>ps:这里是需要您搭建好接口，并根据要求验证返回“echostr”不然会出现一直配置失败
>>2.配置  功能服务-> 网页账户
>>>>填入项目域名（如：85e497d6.ngrok.io）
