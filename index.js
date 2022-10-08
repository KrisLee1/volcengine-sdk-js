/*
 * @Author: KrisLee 2030000020@qq.com
 * @Date: 2022-10-07 23:51:48
 * @LastEditors: KrisLee 2030000020@qq.com
 * @LastEditTime: 2022-10-08 21:04:49
 * @FilePath: /volc-sdk-js/volcengine/VolcEngineAPI.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ApiInfo from "./ApiInfo.js";
import ServiceInfo from "./ServiceInfo.js";
import Credentials from "./Credentials.js";
import API from "./base/API.js";
import * as Request from "./base/Request.js"

const VolcEngineSDK = { ApiInfo, ServiceInfo, Credentials, API, Request };

export default VolcEngineSDK;