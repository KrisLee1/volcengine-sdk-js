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

export default ServiceInfo;