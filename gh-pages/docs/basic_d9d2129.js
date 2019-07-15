define('docs/basic.md', function(require, exports, module) {

  module.exports = {
    "title": "基本用法",
    "html": "<p>为了简化前端开发，amis Renderer 能够直接用配置就能将页面渲染出来。</p>\n<p>先来看个简单的例子。</p>\n<div class=\"amis-preview\" style=\"height: 500px\"><script type=\"text/schema\" height=\"500\">{\n    \"$schema\": \"https://houtai.baidu.com/v2/schemas/page.json#\",\n    \"type\": \"page\",\n    \"title\": \"这是标题部分\",\n    \"subTitle\": \"这是子标题\",\n    \"remark\": \"这是小提示信息\",\n    \"aside\": \"这是侧边栏部分\",\n    \"body\": \"这是内容区\",\n    \"toolbar\": \"这是工具栏部分\"\n}\n</script></div>\n<blockquote>\n<p>PS: 可以通过编辑器实时修改预览</p>\n</blockquote>\n<p>从上面的内容可以看出，一个简单页面框架已经基本出来了，这是 amis 渲染器配置的入口。从 <code>page</code> 渲染器开始出发，通过在容器中放置不同的渲染器来配置不同性质的页面。</p>\n<p>简单说明以上配置信息。</p>\n<ul>\n<li><code>$schema</code> 这个字段可以忽略，他是指定当前 JSON 配置是符合指定路径 <a href=\"https://houtai.baidu.com/v2/schemas/page.json\">https://houtai.baidu.com/v2/schemas/page.json</a> 的 JSON SCHEMA 文件描述的。PS: 编辑器就是靠这个描述文件提示的，可以 hover 到字段上看效果。</li>\n<li><code>type</code> 指定渲染器类型，这里指定的类型为 <code>page</code>。 更多渲染器类型可以去<a href=\"/amis/docs/renderers\">这里面查看</a>。</li>\n<li><code>title</code> 从 title 开始就是对应的渲染模型上的属性了。这里用来指定标题内容。</li>\n<li><code>subTitle</code> 副标题.</li>\n<li><code>remark</code> 标题上面的提示信息</li>\n<li><code>aside</code> 边栏区域内容</li>\n<li><code>body</code> 内容区域的内容</li>\n<li><code>toolbar</code> 工具栏部分的内容</li>\n</ul>\n<p>这里有三个配置都是容器类型的。<code>aside</code>、<code>body</code> 和 <code>toolbar</code>。什么是容器类型？容器类型表示，他能够把其他渲染类型放进来。以上的例子为了简单，直接放了个字符串。字符串类型内部是把他当成了 <a href=\"/amis/docs/renderers/Tpl\">tpl</a> 渲染器来处理，在这里也可以通过对象的形式指定，如以下的例子的 body 区域是完全等价的。</p>\n<div class=\"amis-preview\" style=\"height: 300px\"><script type=\"text/schema\" height=\"300\">{\n    \"$schema\": \"https://houtai.baidu.com/v2/schemas/page.json\",\n    \"type\": \"page\",\n    \"body\": {\n        \"type\": \"tpl\",\n        \"tpl\": \"这是内容区\"\n    }\n}\n</script></div>\n<p>容器内可以直接放一个渲染器，也可以放多个，用数组包起来即可如：</p>\n<div class=\"amis-preview\" style=\"height: 330px\"><script type=\"text/schema\" height=\"330\">{\n    \"$schema\": \"https://houtai.baidu.com/v2/schemas/page.json\",\n    \"type\": \"page\",\n    \"body\": [\n        {\n            \"type\": \"tpl\",\n            \"tpl\": \"<p>段落1</p>\"\n        },\n\n        {\n            \"type\": \"tpl\",\n            \"tpl\": \"<p>段落2</p>\"\n        },\n\n        \"<p>段落3</p>\"\n    ]\n}\n</script></div>\n<p>再来看一个表单页面的列子</p>\n<div class=\"amis-preview\" style=\"height: 640px\"><script type=\"text/schema\" height=\"640\">{\n    \"$schema\": \"https://houtai.baidu.com/v2/schemas/page.json#\",\n    \"type\": \"page\",\n    \"body\": {\n        \"api\": \"https://houtai.baidu.com/api/mock2/form/saveForm\",\n        \"type\": \"form\",\n        \"title\": \"联系我们\",\n        \"controls\": [\n            {\n                \"type\": \"text\",\n                \"label\": \"姓名\",\n                \"name\": \"name\"\n            },\n\n            {\n                \"type\": \"email\",\n                \"label\": \"邮箱\",\n                \"name\": \"email\",\n                \"required\": true\n            },\n\n            {\n                \"type\": \"textarea\",\n                \"label\": \"内容\",\n                \"name\": \"content\",\n                \"required\": true\n            }\n        ],\n        \"actions\": [\n            {\n                \"label\": \"发送\",\n                \"type\": \"submit\",\n                \"primary\": true\n            }\n        ]\n    }\n}\n</script></div>\n<p>这个例子就是在 body 容器内，放置一个 <code>form</code> 类型的渲染器，它就成了一个简单的表单提交页面了，controls 中可以决定放哪些表单项目，actions 中可以放置操作按钮。</p>\n<p>如果 body 区域放置一个 <code>crud</code> 渲染器，它就是列表页面了，再来看个栗子：</p>\n<div class=\"amis-preview\" style=\"height: 800px\"><script type=\"text/schema\" height=\"800\">{\n  \"$schema\": \"https://houtai.baidu.com/v2/schemas/page.json#\",\n  \"type\": \"page\",\n  \"title\": \"增删改查示例\",\n  \"toolbar\": [\n    {\n      \"type\": \"button\",\n      \"actionType\": \"dialog\",\n      \"label\": \"新增\",\n      \"icon\": \"fa fa-plus pull-left\",\n      \"primary\": true,\n      \"dialog\": {\n        \"title\": \"新增\",\n        \"body\": {\n          \"type\": \"form\",\n          \"name\": \"sample-edit-form\",\n          \"api\": \"\",\n          \"controls\": [\n            {\n              \"type\": \"alert\",\n              \"level\": \"info\",\n              \"body\": \"因为没有配置 api 接口，不能真正的提交哈！\"\n            },\n            {\n              \"type\": \"text\",\n              \"name\": \"text\",\n              \"label\": \"文本\",\n              \"required\": true\n            },\n            {\n              \"type\": \"divider\"\n            },\n            {\n              \"type\": \"image\",\n              \"name\": \"image\",\n              \"label\": \"图片\",\n              \"required\": true\n            },\n            {\n              \"type\": \"divider\"\n            },\n            {\n              \"type\": \"date\",\n              \"name\": \"date\",\n              \"label\": \"日期\",\n              \"required\": true\n            },\n            {\n              \"type\": \"divider\"\n            },\n            {\n              \"type\": \"select\",\n              \"name\": \"type\",\n              \"label\": \"选项\",\n              \"options\": [\n                {\n                  \"label\": \"漂亮\",\n                  \"value\": \"1\"\n                },\n                {\n                  \"label\": \"开心\",\n                  \"value\": \"2\"\n                },\n                {\n                  \"label\": \"惊吓\",\n                  \"value\": \"3\"\n                },\n                {\n                  \"label\": \"紧张\",\n                  \"value\": \"4\"\n                }\n              ]\n            }\n          ]\n        }\n      }\n    }\n  ],\n  \"body\": [\n    {\n      \"type\": \"crud\",\n      \"api\": \"https://houtai.baidu.com/api/mock2/crud/list\",\n      \"defaultParams\": {\n          \"perPage\": 5\n      },\n      \"columns\": [\n        {\n          \"name\": \"id\",\n          \"label\": \"ID\",\n          \"type\": \"text\"\n        },\n        {\n          \"name\": \"text\",\n          \"label\": \"文本\",\n          \"type\": \"text\"\n        },\n        {\n          \"type\": \"image\",\n          \"label\": \"图片\",\n          \"multiple\": false,\n          \"name\": \"image\",\n          \"popOver\": {\n            \"title\": \"查看大图\",\n            \"body\": \"<div class=\\\"w-xxl\\\"><img class=\\\"w-full\\\" src=\\\"${image}\\\"/></div>\"\n          }\n        },\n        {\n          \"name\": \"date\",\n          \"type\": \"date\",\n          \"label\": \"日期\"\n        },\n        {\n          \"name\": \"type\",\n          \"label\": \"映射\",\n          \"type\": \"mapping\",\n          \"map\": {\n            \"1\": \"<span class='label label-info'>漂亮</span>\",\n            \"2\": \"<span class='label label-success'>开心</span>\",\n            \"3\": \"<span class='label label-danger'>惊吓</span>\",\n            \"4\": \"<span class='label label-warning'>紧张</span>\",\n            \"*\": \"其他：${type}\"\n          }\n        },\n        {\n          \"type\": \"container\",\n          \"label\": \"操作\",\n          \"body\": [\n            {\n              \"type\": \"button\",\n              \"icon\": \"fa fa-eye\",\n              \"level\": \"link\",\n              \"actionType\": \"dialog\",\n              \"tooltip\": \"查看\",\n              \"dialog\": {\n                \"title\": \"查看\",\n                \"body\": {\n                  \"type\": \"form\",\n                  \"controls\": [\n                    {\n                      \"type\": \"static\",\n                      \"name\": \"id\",\n                      \"label\": \"ID\"\n                    },\n                    {\n                      \"type\": \"divider\"\n                    },\n                    {\n                      \"type\": \"static\",\n                      \"name\": \"text\",\n                      \"label\": \"文本\"\n                    },\n                    {\n                      \"type\": \"divider\"\n                    },\n                    {\n                      \"type\": \"static-image\",\n                      \"label\": \"图片\",\n                      \"name\": \"image\",\n                      \"popOver\": {\n                        \"title\": \"查看大图\",\n                        \"body\": \"<div class=\\\"w-xxl\\\"><img class=\\\"w-full\\\" src=\\\"${image}\\\"/></div>\"\n                      }\n                    },\n                    {\n                      \"type\": \"divider\"\n                    },\n                    {\n                      \"name\": \"date\",\n                      \"type\": \"static-date\",\n                      \"label\": \"日期\"\n                    },\n                    {\n                      \"type\": \"divider\"\n                    },\n                    {\n                      \"name\": \"type\",\n                      \"label\": \"映射\",\n                      \"type\": \"static-mapping\",\n                      \"map\": {\n                        \"1\": \"<span class='label label-info'>漂亮</span>\",\n                        \"2\": \"<span class='label label-success'>开心</span>\",\n                        \"3\": \"<span class='label label-danger'>惊吓</span>\",\n                        \"4\": \"<span class='label label-warning'>紧张</span>\",\n                        \"*\": \"其他：${type}\"\n                      }\n                    }\n                  ]\n                }\n              }\n            },\n            {\n              \"type\": \"button\",\n              \"icon\": \"fa fa-pencil\",\n              \"tooltip\": \"编辑\",\n              \"level\": \"link\",\n              \"actionType\": \"drawer\",\n              \"drawer\": {\n                \"position\": \"left\",\n                \"size\": \"lg\",\n                \"title\": \"编辑\",\n                \"body\": {\n                  \"type\": \"form\",\n                  \"name\": \"sample-edit-form\",\n                  \"controls\": [\n                    {\n                      \"type\": \"alert\",\n                      \"level\": \"info\",\n                      \"body\": \"因为没有配置 api 接口，不能真正的提交哈！\"\n                    },\n                    {\n                      \"type\": \"hidden\",\n                      \"name\": \"id\"\n                    },\n                    {\n                      \"type\": \"text\",\n                      \"name\": \"text\",\n                      \"label\": \"文本\",\n                      \"required\": true\n                    },\n                    {\n                      \"type\": \"divider\"\n                    },\n                    {\n                      \"type\": \"image\",\n                      \"name\": \"image\",\n                      \"multiple\": false,\n                      \"label\": \"图片\",\n                      \"required\": true\n                    },\n                    {\n                      \"type\": \"divider\"\n                    },\n                    {\n                      \"type\": \"date\",\n                      \"name\": \"date\",\n                      \"label\": \"日期\",\n                      \"required\": true\n                    },\n                    {\n                      \"type\": \"divider\"\n                    },\n                    {\n                      \"type\": \"select\",\n                      \"name\": \"type\",\n                      \"label\": \"选项\",\n                      \"options\": [\n                        {\n                          \"label\": \"漂亮\",\n                          \"value\": \"1\"\n                        },\n                        {\n                          \"label\": \"开心\",\n                          \"value\": \"2\"\n                        },\n                        {\n                          \"label\": \"惊吓\",\n                          \"value\": \"3\"\n                        },\n                        {\n                          \"label\": \"漂亮\",\n                          \"value\": \"紧张\"\n                        }\n                      ]\n                    }\n                  ]\n                }\n              }\n            },\n            {\n              \"type\": \"button\",\n              \"level\": \"link\",\n              \"icon\": \"fa fa-times text-danger\",\n              \"actionType\": \"ajax\",\n              \"tooltip\": \"删除\",\n              \"confirmText\": \"您确认要删除? 没有配置 api 确定了也没用，还是不要确定了\",\n              \"api\": \"\"\n            }\n          ]\n        }\n      ]\n    }\n  ]\n}\n</script></div>\n<p>这个栗子最主要的渲染器就是 CRUD 渲染器了，他的作用是配置了个 API，把数据拉取过来后，根据配置 columns 信息完成列表展示，列类型可以是静态文本、图片、映射或者日期等等。 <code>columns</code> 通过 <code>name</code> 与行数据关联。除了展示外还可以放置操作按钮。</p>\n<p>这里相对复杂一点配置就是按钮了，按钮主要是通过 <code>actionType</code>来决定用户点下的行为。可以配置成 弹框、发送 ajax、页面跳转、复制内容到剪切板、刷新目标组件等等。具体请参考：<a href=\"/amis/docs/renderers/Action\">Action 渲染器说明</a></p>\n<p>更多用法请参考<a href=\"/amis/docs/renderers\">渲染器手册</a>和示例。</p>\n",
    "toc": {
      "label": "目录",
      "type": "toc",
      "children": [],
      "level": 0
    }
  };

});