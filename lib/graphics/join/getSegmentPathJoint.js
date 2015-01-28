/**
 * @file getSegmentPathJoint.js
 * @author mengke01
 * @date
 * @description
 * 获取线段和路径的交点
 */




        var getJoint = require('./getJoint');

        /**
         * 求路径和曲线段的交点集合
         * @param {Array} path 路径
         * @param {Object} p0 p0
         * @param {Object} p1 p`
         * @param {Object} i 线段的索引
         *
         * @return {Array} 交点数组
         */
        module.exports =  function (path, p0, p1, i) {
            return getJoint(path, 'L', p0, p1, 0, i || 0);
        };