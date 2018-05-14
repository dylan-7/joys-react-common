"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
/**
 * 获得从m中取n的所有组合
 */
function makeCombination(m, n) {
    var arr = new Array(n).fill(0);
    var s1 = arr.map(function (v, i) { return m - i; }).reduce(function (s, i) { return s * i; }, 1);
    var s2 = arr.map(function (v, i) { return n - i; }).reduce(function (s, i) { return s * i; }, 1);
    var s3 = s1 / s2;
    return s3;
}
exports.makeCombination = makeCombination;
/**
 * 获取 [[1,2,3],[1,2,3],[1,2,3]] 不重复的组合(每行取1个的情况）
 * @param _array
 */
function makeUniq(_array, log) {
    if (log === void 0) { log = false; }
    var arr = _array.reduce(function (arr, a, i, array) {
        var b = array[i - 1];
        var ok = [];
        if (b && b.length > 0) {
            // ok = arr.reduce((n,v1,j)=>n.concat(a.filter(v2=>!(String(v1).includes(v2))).map(v2=>v1+''+v2)), []);
            ok = arr.reduce(function (n, v1) { return n.concat(a.filter(function (v2) { return !(String(v1).split(' ').includes(String(v2))); }).map(function (v2) { return v1 + ' ' + v2; })); }, []);
        }
        else {
            ok = a;
        }
        return ok;
    }, []);
    if (log)
        console.log(arr);
    return arr.length;
}
exports.makeUniq = makeUniq;
function countSum(type, n) {
    var val = 1;
    if (type === '直选' || type === '三星') {
        val = countSum3(n);
    }
    else if (type === '二星') {
        val = countSum2(n);
    }
    else if (type === '组三') {
        val = countSumZu3(n);
    }
    else if (type === '组六') {
        val = countSumZu6(n);
    }
    return val;
}
exports.countSum = countSum;
/**
 * 时时彩 和值 与 福体彩 直选
 * 三星
 */
function countSum3(n) {
    var sumMap = new Array(28).fill(0);
    new Array(1000).fill(0).forEach(function (v, i) {
        var a = lodash_1.padStart(String(i), 3, '0');
        var sum = a.split('').reduce(function (s, v) { return s += Number(v); }, 0);
        sumMap[sum] += 1;
    });
    return sumMap[Number(n)];
}
exports.countSum3 = countSum3;
/**
 * 时时彩 和值
 * 二星(后两位）
 */
function countSum2(n) {
    var sumMap = new Array(19).fill(0);
    new Array(100).fill(0).forEach(function (v, i) {
        var a = lodash_1.padStart(String(i), 2, '0');
        var sum = a.split('').reduce(function (s, v) { return s += Number(v); }, 0);
        sumMap[sum] += 1;
    });
    return sumMap[Number(n)];
}
exports.countSum2 = countSum2;
/**
 * 福体彩 组三（两同）
 */
function countSumZu3(n) {
    var sumMap = new Array(28).fill(0);
    var aset = new Set();
    new Array(1000).fill(0).forEach(function (v, i) {
        var a = lodash_1.padStart(String(i), 3, '0');
        // 要求无序
        a = a.split('').sort().join('');
        aset.add(a);
    });
    Array.from(aset).forEach(function (a) {
        var _a = a.split('').map(function (v) { return Number(v); }), a1 = _a[0], a2 = _a[1], a3 = _a[2];
        var sum = a.split('').reduce(function (s, v) { return s += Number(v); }, 0);
        if ((a1 == a2 && a2 != a3)
            || (a2 == a3 && a1 != a3)) {
            sumMap[sum] += 1;
        }
        // console.log('\u2714 combination countSumZu3 90', sumMap);
    });
    return sumMap[Number(n)];
}
exports.countSumZu3 = countSumZu3;
/**
 * 福体彩 组六(三不同）
 */
function countSumZu6(n) {
    var sumMap = new Array(28).fill(0);
    var aset = new Set();
    new Array(1000).fill(0).forEach(function (v, i) {
        var a = lodash_1.padStart(String(i), 3, '0');
        // 要求无序
        a = a.split('').sort().join('');
        aset.add(a);
    });
    Array.from(aset).forEach(function (a) {
        var _a = a.split('').map(function (v) { return Number(v); }), a1 = _a[0], a2 = _a[1], a3 = _a[2];
        var sum = a.split('').reduce(function (s, v) { return s += Number(v); }, 0);
        if (a1 != a2 && a2 != a3 && a1 != a3) {
            sumMap[sum] += 1;
        }
    });
    return sumMap[Number(n)];
}
exports.countSumZu6 = countSumZu6;
