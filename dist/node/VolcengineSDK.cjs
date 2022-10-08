// Volcengine-sdk v0.0.1 Copyright (c) 2022 KrisLee
'use strict';

const CryptoJS = require('crypto-js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

const CryptoJS__default = /*#__PURE__*/_interopDefaultLegacy(CryptoJS);

/*
 * @Author: KrisLee 2030000020@qq.com
 * @Date: 2022-10-07 01:07:16
 * @LastEditors: KrisLee 2030000020@qq.com
 * @LastEditTime: 2022-10-08 19:58:32
 * @FilePath: /volc-sdk-js/volcengine/ApiInfo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function ApiInfo(method, path, query, body, header) {
    this.method = method;
    this.path = path;
    this.query = query;
    this.body = body;
    this.header = header;
}

ApiInfo.prototype.toString = function() {
    return 'method: ' + this.method + ', path: ' + this.path;
};

/*
 * @Author: KrisLee 2030000020@qq.com
 * @Date: 2022-10-07 01:03:54
 * @LastEditors: KrisLee 2030000020@qq.com
 * @LastEditTime: 2022-10-08 19:58:56
 * @FilePath: /volc-sdk-js/volcengine/ServiceInfo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function ServiceInfo(host, header, credentials, connection_timeout, socket_timeout, scheme = 'http') {
    this.host = host;
    this.header = header;
    this.credentials = credentials;
    this.connection_timeout = connection_timeout;
    this.socket_timeout = socket_timeout;
    this.scheme = scheme;
}

/*
 * @Author: KrisLee 2030000020@qq.com
 * @Date: 2022-10-07 00:57:29
 * @LastEditors: KrisLee 2030000020@qq.com
 * @LastEditTime: 2022-10-08 19:58:44
 * @FilePath: /volc-sdk-js/volcengine/Credentials.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function Credentials(ak, sk, service, region) {
    this.ak = ak;
    this.sk = sk;
    this.service = service;
    this.region = region;
}

/*
 * @Author: KrisLee 2030000020@qq.com
 * @Date: 2022-10-07 17:24:48
 * @LastEditors: KrisLee 2030000020@qq.com
 * @LastEditTime: 2022-10-08 19:53:09
 * @FilePath: /volc-sdk-js/volcengine/auth/MetaData.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function MetaData(algorithm, service, region, date) {
    this.algorithm = algorithm;
    this.service = service;
    this.region = region;
    this.date = date;
}

MetaData.prototype.getCredentialScope = function() {
    return `${this.date}/${this.region}/${this.service}/request`;
};

/*
 * @Author: KrisLee 2030000020@qq.com
 * @Date: 2022-10-07 16:37:06
 * @LastEditors: KrisLee 2030000020@qq.com
 * @LastEditTime: 2022-10-08 19:53:49
 * @FilePath: /volc-sdk-js/volcengine/utils/util.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function getXDate(){
    function leftPad(n){
        return n < 10 ? '0' + n : n;
    }
    const now = new Date();
    const format = [
        now.getUTCFullYear(),
        leftPad(now.getUTCMonth()+1),
        leftPad(now.getUTCDate()),
        'T',
        leftPad(now.getUTCHours()),
        leftPad(now.getUTCMinutes()),
        leftPad(now.getUTCSeconds()),
        'Z'
    ];
    return format.join('');
}

/*
 * @Author: KrisLee 2030000020@qq.com
 * @Date: 2022-10-07 17:24:09
 * @LastEditors: KrisLee 2030000020@qq.com
 * @LastEditTime: 2022-10-08 19:54:50
 * @FilePath: /volc-sdk-js/volcengine/auth/SignerV4.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

function SignerV4() {}

SignerV4.sign = function(serviceInfo, apiInfo) {
    const { header, credentials } = serviceInfo;
    const currTime = getXDate();
    const metaData = new MetaData(
        'HMAC-SHA256',
        credentials.service,
        credentials.region,
        currTime
    );

    const XContentSha256 = CryptoJS__default["default"].SHA256(apiInfo.body.toString()).toString(CryptoJS__default["default"].enc.Hex);
    header.set('X-Date', currTime);
    header.set('X-Content-Sha256', XContentSha256);
    
    const signingStr = this.getSigningStr(apiInfo, header, metaData);
    const signingKey = this.getSigningKey(credentials.sk, metaData);
    const sign = CryptoJS__default["default"].HmacSHA256(signingStr, signingKey).toString(CryptoJS__default["default"].enc.Hex);

    const authorization = [
        `${metaData.algorithm} Credential=${credentials.ak}/${metaData.getCredentialScope()}`,
        'SignedHeaders=' + header.getSignedHeaders(),
        `Signature=${sign}`
    ].join(', ');

    header.set('Authorization', authorization);
    return header;
};

SignerV4.getSigningStr = function(apiInfo, header, metaData) {
    const canonicalRequest = [
        apiInfo.method, 
        apiInfo.path, 
        apiInfo.query.toString(), 
        header.toString(), 
        header.getSignedHeaders(), 
        header['X-Content-Sha256']
    ].join('\n');
    const hashCanonicalRequest = CryptoJS__default["default"].SHA256(canonicalRequest).toString(CryptoJS__default["default"].enc.Hex);
    const signingStr = [
        metaData.algorithm, 
        metaData.date, 
        metaData.getCredentialScope(), 
        hashCanonicalRequest
    ].join('\n');
    return signingStr;
};

SignerV4.getSigningKey = function(sk, metaData) {
    const kDate = CryptoJS__default["default"].HmacSHA256(metaData.date, sk);
    const kRegion = CryptoJS__default["default"].HmacSHA256(metaData.region, kDate);
    const kService = CryptoJS__default["default"].HmacSHA256(metaData.service, kRegion);
    return CryptoJS__default["default"].HmacSHA256('request', kService);
};

/*
 * @Author: KrisLee 2030000020@qq.com
 * @Date: 2022-10-07 01:17:59
 * @LastEditors: KrisLee 2030000020@qq.com
 * @LastEditTime: 2022-10-08 19:55:48
 * @FilePath: /volc-sdk-js/volcengine/base/Service.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

function API(serviceInfo, apiInfo) {
    function getUrl() {
        let url = serviceInfo.scheme + '://' + serviceInfo.host 
                + apiInfo.path + '?' + apiInfo.query; 
        return url;
    }
    
    function getConfig() {
        const config = {headers: SignerV4.sign(serviceInfo, apiInfo)};
        return JSON.parse(JSON.stringify(config));
    }
    
    function getParams() {
        return JSON.parse(apiInfo.body.toString());
    }

    return {url: getUrl(), params: getParams(), config: getConfig()};
}

/*
 * @Author: KrisLee 2030000020@qq.com
 * @Date: 2022-10-07 01:22:11
 * @LastEditors: KrisLee 2030000020@qq.com
 * @LastEditTime: 2022-10-08 19:56:16
 * @FilePath: /volc-sdk-js/volcengine/base/Request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function DataMap(data = {}) {
    // data = JSON.parse(JSON.stringify(data));
    const keys = Object.keys(data);
    keys.forEach(key => {
        this[key] = data[key];
    });
}

DataMap.prototype.set = function(key, value) {
    this[key] = value;
};

DataMap.prototype.get = function(key) {
    return this?.[key];
};

DataMap.prototype.delete = function(key) {
    return delete this[key];
};


function Query(data = {}) {
    DataMap.call(this, data);
}

Query.prototype = Object.create(DataMap.prototype);
Query.prototype.constructor = Query;

Query.prototype.toString = function() {
    const queryList = [];
    const keys = Object.keys(this).sort();
    keys.forEach(key => {
        queryList.push(`${key}=${this[key]}`);
    });
    return queryList.join('&');
};


function Body(data = {}) {
    DataMap.call(this, data);
}

Body.prototype = Object.create(DataMap.prototype);
Body.prototype.constructor = Body;

Body.prototype.toString = function() {
    return JSON.stringify(this);
};


function Header(data = {}) {
    DataMap.call(this, data);
}

Header.prototype = Object.create(DataMap.prototype);
Header.prototype.constructor = Header;

Header.prototype.toString = function() {
    let str = '';
    const keys = Object.keys(this).sort();
    keys.forEach(key => {
        str += `${key.toLocaleLowerCase()}:${this[key]}\n`;
    });
    return str;
};

Header.prototype.getSignedHeaders = function() {
    const keys = Object.keys(this).sort();
    const headerList = keys.map(v => v.toLocaleLowerCase());
    return headerList.join(';');
};

const Request = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Query: Query,
    Body: Body,
    Header: Header
});

/*
 * @Author: KrisLee 2030000020@qq.com
 * @Date: 2022-10-07 23:51:48
 * @LastEditors: KrisLee 2030000020@qq.com
 * @LastEditTime: 2022-10-08 21:04:49
 * @FilePath: /volc-sdk-js/volcengine/VolcEngineAPI.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const VolcEngineSDK = { ApiInfo, ServiceInfo, Credentials, API, Request };

module.exports = VolcEngineSDK;
//# sourceMappingURL=VolcengineSDK.cjs.map
