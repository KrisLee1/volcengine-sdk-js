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

export default Credentials;