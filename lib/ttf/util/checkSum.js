/**
 * @file checkSum.js
 * @author mengke01
 * @date 
 * @description
 * table校验函数
 */


function checkSumArrayBuffer(buffer, offset, length) {
    var offset = offset || 0;
    var length = length || buffer.byteLength;

    if (offset + length > buffer.byteLength) {
        throw 'check sum out of bound';
    }

    var nLongs = Math.floor(length/ 4);
    var view = new DataView(buffer, offset, length);
    var sum = 0, i = 0;

    while (i < nLongs) {
        sum += view.getUint32(4 * i++, false);
    }

    var leftBytes = length - nLongs * 4;
    if (leftBytes) {
        var offset = nLongs * 4;
        while(leftBytes > 0) {
            sum += view.getUint8(offset, false) << (leftBytes * 8);
            offset++;
            leftBytes--;
        }
    }
    return sum % 0x100000000;
}

function checkSumArray(buffer, offset, length) {
    var offset = offset || 0;
    var length = length || buffer.length;

    if (offset + length > buffer.length) {
        throw 'check sum out of bound';
    }

    var nLongs = Math.floor(length/ 4);
    var sum = 0, i = 0;

    while (i < nLongs) {
        sum += (buffer[i++] << 24) + (buffer[i++] << 16) + (buffer[i++] << 8) + buffer[i++];
    }

    var leftBytes = length - nLongs * 4;
    if (leftBytes) {
        var offset = nLongs * 4;
        while(leftBytes > 0) {
            sum += buffer[offset] << (leftBytes * 8);
            offset++;
            leftBytes--;
        }
    }
    return sum % 0x100000000;
}


/**
 * table校验
 * 
 * @param {ArrayBuffer|Array} buffer 表数据
 * @return {number} 校验和
 */
function checkSum(buffer, offset, length) {
    if (buffer instanceof ArrayBuffer) {
        return checkSumArrayBuffer(buffer, offset, length);
    }
    else if (buffer instanceof Array) {
        return checkSumArray(buffer, offset, length);
    }
    else {
        throw 'not support checksum buffer type';
    }
}

module.exports = checkSum;