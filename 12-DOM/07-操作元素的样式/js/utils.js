// 自调用函数，形成一个封闭的作用域
!function () {
    // 检测变量类型
    function testType(value, type) {
        var result = Object.prototype.toString.call(value).slice(8, -1);
        // [object Number]  slice(8,-1) ==> Number
        // [object String]  slice(8,-1) ==> String
        // [object Object]  slice(8,-1) ==> Object
        // [object Null]    slice(8,-1) ==> Null
        return result === type;
    }
    // 获取样式属性值  dom wtihe
    function getCss(ele, attr) {
        var value;
        if (!"getComputedStyle" in window) {// 判断是不是IE678 ,如果是使用currentStyle获取
            value = ele.currentStyle[attr]
        } else {// 如果不是使用getComputedStyle获取
            
            value = getComputedStyle(ele, null)[attr]
        }
        // 判断开头是否为字母 如果是只返回数字 NAN

        //      判断是一个数字          是数字返回数字         不是返回原来的值
        return !isNaN(parseFloat(value)) ? parseFloat(value) : value;
    }
    // 设置单一样式函数
    function setCss(ele, attr, value) {
        // 以下属性是带px单位的属性
        var reg = /(width|height|left|top|right|bottom|fontSize|lineHeight)|((margin|padding)|(Top|Bottom|Left|Right))/;
        if (reg.test(attr)) {
            // 如果正则成立，说明这些属性是需要px单位的属性
            if (!isNaN(value)) {// 条件成立，说明value是一个纯数字，那么需要加上px单位
                value += 'px'
            }
        }
        ele.style[attr] = value;
    }

    // 批量设置样式  dom ob
    // // options     var target = {
    //         width:500,
    //         height:500,
    //         left:1000,
    //         Opacity:0.3
    //     }
    function setGroupCss(ele, options) {
        // 如何判断options必须是一个对象数据类型，并且还不能是null
        if (testType(options, 'Object')) {// options必然是一个对象
            for (var attr in options) {// for in 循环可以遍历到私有的属性，也可以遍历到继承来的属性，所以需要判断一下

                // 判断attr是否是私有属性
                if (options.hasOwnProperty(attr)) {
                    // 属性名 attr   属性值 options[attr]
                    setCss(ele, attr, options[attr]);
                }
            }
        }
    }

    // css函数     dom withe
    function css(ele, attr, value) {
        if (typeof attr === 'string') {
            // 1. getCss
            // 2. setCss
            if (typeof value !== 'undefined') {
                // value有值，说明应该是单独设置样式
                setCss(ele, attr, value);
                // return 退出函数，使后续代码不执行
                return;
            }
            // 如果能够执行到这里，说明是读取属性操作
            return getCss(ele, attr);
        }
        if (testType(attr, 'Object')) {// 说明 attr是对象，是批量设置样式操作
            setGroupCss(ele, attr);
        }
    }


    var utils = {
        testType: testType,
        css:css
    }

    window.utils = utils;

    // 根据id获取元素
    function $(id){
        return document.getElementById(id);
    }
    window.$=$
}()