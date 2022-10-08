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
}

export default ApiInfo;