/*
 * @Author: KrisLee 2030000020@qq.com
 * @Date: 2022-10-07 01:17:59
 * @LastEditors: KrisLee 2030000020@qq.com
 * @LastEditTime: 2022-10-08 19:55:48
 * @FilePath: /volc-sdk-js/volcengine/base/Service.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import SignerV4 from "../auth/SignerV4.js";

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


export default API;