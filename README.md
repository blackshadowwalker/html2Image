# html2Image

phantomjs 服务器，模拟浏览器请求，然后将整个页面转出成图片

## Usage:

### 1. 启动服务端:
  
  cmd: `phantomjs html2Image.js  port`

  e.g : `phantomjs html2Image.js 7777`
    
### 2. 客户的请求
  - Method:  POST
  - URI: `/html2Image`
  - Parameters: 
    - url: full url
    - quality : default -1
    - type : html base64, default 'html'
    - format :   PNG GIF JPEG, default 'PNG', 
    - width :  default '1024'
    - height : default '768'
  - 返回值: `data:image/png;base64,`开头的base64图片数据，可以直接在 img 标签中使用

 e.g : 
 
```shell
curl -X POST --header 'Content-Type: application/x-www-form-urlencoded' -d 'url=http://www.csdn.net/' 'http://phantomjs.pandaxueche.com'
```

Result:

![image](http://img.blog.csdn.net/20160913174127025)
