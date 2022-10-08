/*
 * @Author: KrisLee 2030000020@qq.com
 * @Date: 2022-10-07 17:24:09
 * @LastEditors: KrisLee 2030000020@qq.com
 * @LastEditTime: 2022-10-08 19:54:50
 * @FilePath: /volc-sdk-js/volcengine/auth/SignerV4.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import MetaData from "./MetaData.js";
import { getXDate } from "../utils/util.js";
import CryptoJS from "crypto-js";

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

    const XContentSha256 = CryptoJS.SHA256(apiInfo.body.toString()).toString(CryptoJS.enc.Hex);
    header.set('X-Date', currTime);
    header.set('X-Content-Sha256', XContentSha256);
    
    const signingStr = this.getSigningStr(apiInfo, header, metaData);
    const signingKey = this.getSigningKey(credentials.sk, metaData);
    const sign = CryptoJS.HmacSHA256(signingStr, signingKey).toString(CryptoJS.enc.Hex);

    const authorization = [
        `${metaData.algorithm} Credential=${credentials.ak}/${metaData.getCredentialScope()}`,
        'SignedHeaders=' + header.getSignedHeaders(),
        `Signature=${sign}`
    ].join(', ');

    header.set('Authorization', authorization);
    return header;
}

SignerV4.getSigningStr = function(apiInfo, header, metaData) {
    const canonicalRequest = [
        apiInfo.method, 
        apiInfo.path, 
        apiInfo.query.toString(), 
        header.toString(), 
        header.getSignedHeaders(), 
        header['X-Content-Sha256']
    ].join('\n');
    const hashCanonicalRequest = CryptoJS.SHA256(canonicalRequest).toString(CryptoJS.enc.Hex);
    const signingStr = [
        metaData.algorithm, 
        metaData.date, 
        metaData.getCredentialScope(), 
        hashCanonicalRequest
    ].join('\n');
    return signingStr;
}

SignerV4.getSigningKey = function(sk, metaData) {
    const kDate = CryptoJS.HmacSHA256(metaData.date, sk);
    const kRegion = CryptoJS.HmacSHA256(metaData.region, kDate);
    const kService = CryptoJS.HmacSHA256(metaData.service, kRegion);
    return CryptoJS.HmacSHA256('request', kService);
}

export default SignerV4;