//首先通过getElementById拿到所有需要操作的div，最大的container，然后是box，div
var container = document.getElementById('container');
var box = document.getElementById('box');
//这里getElementsByTagName，即box下面所有的div，这里形成一个数组
//既然要对每一个div的style进行编写，那这里要用到for循环
var arr = box.getElementsByTagName('div');

var radius = calculateRadius(129, 20);
//首先拿到这个element
var audio = document.getElementById('audio');

for (var i = 0; i < arr.length; i++) {
    //首先设置每个div的background，且background不要重复
    arr[i].style.background = 'url("./img/p' + (i + 1) + '.png") no-repeat';
    //然后是最重要的，先形传然后向外阔的过程：
    //首先是进行旋转的操作，即rotateY；旋转的度数是360/20份*我们每一个div的标签，从零开始。
    //最后是旋转的度数单位deg：'deg)'，那么像钢管舞旋转完度数以后呢，就应该向外扩
    //扩的半径，还没有进行相关的计算。所以在做style之前要去计算我们整个要扩的度数。

    arr[i].style.WebkitTransform = "rotateY(" + 360 / arr.length * i + 'deg) translatez(' + radius + 'px)';
}
//在ppt里已经写好了方法，我把代码给copy过来，且给他一个函数，传入2个参数length和totalNum。
//在前面定义我们要扩的半径，传入的length是129, totalNum是20，

//这样计算好了后，继续写Transform的style

//这样就完成了css的书写，虽然牵扯到一部分的js，但是js也是帮助css进行一个书写。
//然后我要把写好的css和js文件放到index.html中，
function calculateRadius(length, totalNum) {
    return Math.round(length / (2 * Math.tan(Math.PI / totalNum)))-3;
}
//首先给喇叭一个监听事件判断喇叭有没被我们监听到，用on，事件是tap，给他一个function。
//判断audio是不是暂停了，是的话就让他播放，且把喇叭换成小喇叭图片，表示正在播放
$('#laba').on('tap', function(e) {
    if (audio.paused) {
        audio.play();
        $('#laba').text('🎺');
    } else {
        audio.pause();
        $('#laba').text('⏸');
    }
})

//首先定义几个变量，因为是滑动，所以重要的是判断x的值
//首先给box的touch事件来监听，紧接着做的是preventDefault，
//接下来是把startX=点的这个点减去x的值，在这之前要拿到touch事件的Touches里面的第一个
//然后打印Touches里面的event，看下它里面是个什么东西，来帮助我们思考及代码编写
//浏览器中打开，event就是touchevent事件，点开找targetTouches，需要拿到的是pagex减去x
//因为x相当于我们接下来要转动的角度，回到代码写
var startX = 0,
    x = 0,
    endX = 0;

//2首先定义一个flag。这个flag是帮助我们判断是否触发手指拖动事件的标记
var flag = true;
$('#box').on('touchstart', function(event) {
    event.preventDefault();
    //console.log(event)
    var touch = event.targetTouches[0];
    startX = touch.pageX - x;
})
//接下来是touchmove，就是最主要的用手指进行拖动的过程，
//首先是监听事件，step1依然是preventDefaul；然后依然是获取第0个的touch事件
//接下来重要的来了，首先定义下从开始到结束的这个结束的位置，然后做的旋转，x=endX - startX
//然后进行box的旋转，这个时候旋转的x就是这个图旋转的角度。
//回到浏览器里进行刷新，大家可以看到，我拖动的时候这个图整个的动起来了
$('#box').on('touchmove', function(event) {
    /*event.preventDefault();
    var touch = event.targetTouches[0];
    endX = touch.pageX;
    x = endX - startX;
    box.style.transform = 'rotateY(' + x + 'deg)';*/

    //2最主要的就是move事件了，这里判断flag是否为true，是则触发手指拖动事件
    if (flag) {
        event.preventDefault();
        var touch = event.targetTouches[0];
        endX = touch.pageX;
        x = endX - startX;
        box.style.transform = 'rotateY(' + x + 'deg)';
    } else {
        return false;
    }
    //2接着我们去哪里控制flag呢，当然是手机摆动的deviceorientation的事件了
})
//最后监听end事件，即拖动结束的事件，只需打印over就可以了
$('#box').on('touchend', function(event) {
    console.log("over");
});

//重头戏：通过手机的摆动，让手机端可以监听到旋转的角度，图片以相同的角度进行旋转。
//这里用到deviceorientation的监听事件，监听window，
//deviceorientation设备的方向，只要设备动，就能灵敏的监听到动的角度
//我这里要获取左右摆动的gamma的值，因为左右摆动就是顺着y轴进行旋转
//且做一个box的旋转，box.style.transform = 'rotateY(' + gamma * 3 + 'deg)';
//因为gamma非常灵敏，所以我放大了3倍，进行度数的旋转
//接下来就插上手机，进行相关的检验。因为在浏览器里不能进行很好的检验，
//那么我就把整个的demo放到服务器上，让手机进行相关的测试
window.addEventListener('deviceorientation', function(event) {
    var gamma = event.gamma;
    /*
    box.style.transform = 'rotateY(' + gamma  + 'deg)';
    box.style.transform = 'rotateY(' + gamma * 3 + 'deg)';*/
    
    //2这里怎么判断把flag置为true或false呢，
    //是判断gamma，gamma超过一定的度数就deviceorientation的操作，若没有就执行手指拖动的操作
    //即gamma>1就执行deviceorientation，但是gamma是正负90°，所以这里需要绝对值Math.abs
    if (Math.abs(gamma) > 1) {
        flag = false;
        box.style.transform = 'rotateY(' + gamma * 3 + 'deg)';
    } else {
        flag = true;
    }

})