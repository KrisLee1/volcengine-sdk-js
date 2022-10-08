<!--
 * @Author: KrisLee 2030000020@qq.com
 * @Date: 2022-10-08 03:10:50
 * @LastEditors: KrisLee 2030000020@qq.com
 * @LastEditTime: 2022-10-08 23:40:54
 * @FilePath: /volc-sdk-js/README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<h1 align="center"><img src="https://iam.volccdn.com/obj/volcengine-public/pic/volcengine-icon.png"></h1>
<h1 align="center">火山引擎SDK for JS</h1> 
欢迎使用火山引擎SDK for JS，本文档为您介绍如何获取及调用SDK。

> 备注：JS SDK非火山引擎官方开发，由KrisLee开发。

## 前置准备

### 服务开通

请确保您已开通了您需要访问的服务。您可前往[火山引擎控制台](https://console.volcengine.com/)，在左侧菜单中选择或在顶部搜索栏中搜索您需要使用的服务，进入服务控制台内完成开通流程。

### 获取安全凭证

Access Key（访问密钥）是访问火山引擎服务的安全凭证，包含Access Key ID（简称为AK）和Secret Access Key（简称为SK）两部分。您可登录[火山引擎控制台](https://console.volcengine.com/)，前往“[访问控制](https://console.volcengine.com/iam)”的“[访问密钥](https://console.volcengine.com/iam/keymanage/)”中创建及管理您的Access Key。更多信息可参考[访问密钥帮助文档](https://www.volcengine.com/docs/6291/65568)。

## 获取与安装

使用 npm 安装:

```
npm i volcengine-sdk
```

使用 `<script>` 标签引入:

```html
<script type="module" src="./dist/volcengine-sdk.min.js" charset="utf-8"></script>
```

## 使用
### 示例代码

```js
// import VolcEngineSDK from "volcengine-sdk";
const VolcEngineSDK = require("volcengine-sdk");
const axios = require("axios");

const { ApiInfo, ServiceInfo, Credentials, API, Request } = VolcEngineSDK;

// 设置安全凭证 AK、SK
const AK = 'AccessKey ID';
const SK = 'AccessKey Secret';

// 翻译目标语言、翻译文本列表
const toLang = 'zh';
const textList = ['Hello world', 'こんにちは世界'];

// api凭证
const credentials = new Credentials(AK, SK, 'translate', 'cn-north-1');

// 设置请求的 header、query、body
const header = new Request.Header({
    'Content-Type': 'application/json'
});
const query = new Request.Query({
    'Action': 'TranslateText',
    'Version': '2020-06-01'
});
const body = new Request.Body({
    'TargetLanguage': toLang,
    'TextList': textList
});

// 设置 service、api信息
const serviceInfo = new ServiceInfo(
    'open.volcengineapi.com',
    header,
    credentials
);
const apiInfo = new ApiInfo('POST', '/', query, body);

// 生成 API
const api = API(serviceInfo, apiInfo);
// console.log(api.url, api.params, api.config);

// 获取 API 数据，发送请求
axios.post(api.url, api.params, api.config)
.then((res) => {
    console.log(res.data);
})
.catch((err) => {
    console.log('err', err);
});
```
### 返回数据

```json
{
  "TranslationList": [
    { "Translation": "你好，世界", "DetectedSourceLanguage": "en", "Extra": null },
    { "Translation": "你好世界", "DetectedSourceLanguage": "ja", "Extra": null }
  ],
  "ResponseMetaData": {
    "RequestId": "202210082319500102081020661C043C5F",
    "Action": "TranslateText",
    "Version": "2020-06-01",
    "Service": "translate",
    "Region": "cn-north-1"
  }
}
```