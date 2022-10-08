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
    ]
    return format.join('');
}

export { getXDate };