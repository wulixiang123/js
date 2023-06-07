function linear(t,b,s,d){
    return s/d*t+b;
}

function animate(ele,attr,target,duration=2000){

    if(ele.timer){
        return
    }
var t = 0
var timeStep = 10
var begin = utils.css(ele,attr)
var s = target - begin
// var timer = null
ele.timer = setInterval(() => {
t = t+timeStep
if(t>=duration){
clearInterval(ele.timer)
utils.css(ele,attr,target)
return

}
var curPos = linear(t,begin,s,duration)
utils.css(ele,attr,curPos)
}, timeStep);
}