var Tween = {
    Linear: function (t, b, c, d) {
        return c * t / d + b;
    },
    QuadIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    QuadOut: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    QuadInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    CubicIn: function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    }
}
// animate(oBox, { width: 500 }, 2000, 1);// linear
// animate(oBox, { width: 500 }, 2000, 2);// QuadIn
// animate(oBox, { width: 500 }, 2000, 'QuadOut');// QuadOut

function animate(ele, target, duration = 1000, effect, fn) {
    if (ele.timer) {
        return;
    }
    var t = 0;
    var timeStep = 10;
    var begin = {};
    var change = {};
    var curPos = {};
    // 运动形式默认值
    var tempEffect = Tween['Linear'];
    if (typeof effect === 'number') {
        switch (effect) {
            case 1:
                tempEffect = Tween['Linear']
                break;
            case 2:
                tempEffect = Tween['QuadIn']
                break;
            case 3:
                tempEffect = Tween['QuadOut']
                break;
            case 4:
                tempEffect = Tween['QuadInOut']
                break;
            case 5:
                tempEffect = Tween['CubicIn']
                break;
        }
    } else if (typeof effect === 'string') {
        tempEffect = Tween[effect];
    }

    for (var attr in target) {
        begin[attr] = utils.css(ele, attr);
        change[attr] = target[attr] - begin[attr];
    }

    ele.timer = setInterval(() => {
        // 1. 累加时间
        t += timeStep;
        // 2. 判断停止条件
        if (t >= duration) {
            clearInterval(ele.timer);
            // 设置目标位置
            utils.css(ele, target);
            ele.timer = null;
            fn && fn.apply(this, arguments);
            return;
        }
        // 3. 计算 t 时间 当前变化到的位置
        for (var attr in target) {
            curPos[attr] = tempEffect(t, begin[attr], change[attr], duration);
        }
        utils.css(ele, curPos);
    }, timeStep);
    
}



