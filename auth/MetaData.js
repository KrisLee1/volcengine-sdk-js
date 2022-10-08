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
}

export default MetaData;