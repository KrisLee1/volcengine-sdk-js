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
}

DataMap.prototype.get = function(key) {
    return this?.[key];
}

DataMap.prototype.delete = function(key) {
    return delete this[key];
}


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
}


function Body(data = {}) {
    DataMap.call(this, data);
}

Body.prototype = Object.create(DataMap.prototype);
Body.prototype.constructor = Body;

Body.prototype.toString = function() {
    return JSON.stringify(this);
}


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
}

Header.prototype.getSignedHeaders = function() {
    const keys = Object.keys(this).sort();
    const headerList = keys.map(v => v.toLocaleLowerCase());
    return headerList.join(';');
}


export { Query, Body, Header };