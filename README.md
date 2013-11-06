开发者如何使用Portal Rest API
===================================
Portal API 是ArcGIS Rest API的重要组成部分，帮助开发者访问和管理Portal中的资源。开发者可以通过各种客户端来调用，在不同端上进行访问和管理Portal。Portal API 也是Portal的核心部分，有了Portal API 我们可以实现通过操作Portal实现的几乎所有功能.本Demo主要演示如何使用java/Python/Javascript来使用Portal api 来访问Portal.为开发者开发调用Portal中的资源或者管理Portal提供开发示例。
api的调用方式也比较容易，只需要发送http请求即可。  
访问Portal的注意事项
-----------------------------------
1.  对于公共的资源 无需token 即可正常访问
2.  对于访问私有资源，要首先调用api中的/sharing/generateToken获得token，发送请求的时候将token作为一个请求参数即可。
3.  对于访问资源的服务支持Get/Post两种访问方式，推荐使用Get来访问，对于修改或者创建资源的服务，只能使用Post方式来调用。具体API 支持那些访问方式请参阅api 文档http://resources.arcgis.com/en/help/arcgis-rest-api/#/Overview_of_portal_administration_in_the_ArcGIS_REST_API/02r300000246000000/
4.  注意有些服务必须要用https方式才能访问。具体查看上面的链接。
  
#####下面介绍我开发过程中遇到的问题
 

### Javascript:
1. 可以使用浏览器原生的XMLHttpRequest来发送Ajax请求。或者使用框架也可以，比如dojo.xhr等。jquery中的$ajax等。
2. 跨域访问本Demo中提供了两种方式CORS、代理两种方式。可以仿照ArcGIS APIfor Javascript 中带的poxy.jsp来写代理，原来的代理文件访问https的服务会出现问题，demo中用的poxy.jsp已经解决了这个问题。
3. demo中有个手动制作webmap的例子，用的是一个图片符号，先将图片处理成base64编码形式，然后给符号的imagedata赋值。制作完webmap之后保存为JSON文件。通过调用Portal api中的/sharing/content/users/esri001/addItem 添加到我的内容里面。难点是先熟悉WebMap的标准自己构造个JSON。

### Java
由于服务器证书的问题。正常的发送https请求会失败，通过结合 X509TrustManager 来实现，我已经封装好了一个发送https请求的方法，如果要访问http的方法，按照正常的方式访问即可。
        
### Python  
之前只是学习过这门语言，不是太熟悉，这里我是用httplib.HTTPSConnection 来发送https请求，没有遇到java中的证书问题。可以正常访问。可以结合 urllib.urlencode来构造查询参数，很方便。
>
>
>
>
>
>
>
>
>
>
>
>[博客](http://www.cnblogs.com/dubaokun/)
>[新浪微博](http://weibo.com/u/1821556025)


