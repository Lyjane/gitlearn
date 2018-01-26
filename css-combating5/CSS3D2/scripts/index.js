var container = document.getElementById('container');
var box = document.getElementById('box');
var arr = box.getElementsByTagName('div');
var radius = calculateRadius(129, 20);
var audio = document.getElementById('audio');

for (var i = 0; i < arr.length; i++) {
	arr[i].style.background = 'url("./img/p' + (i + 1) + '.png") no-repeat';
	arr[i].style.WebkitTransform = "rotateY(" + 360 / arr.length * i +  'deg) translatez(' + radius + 'px)';
}

function calculateRadius(length, totalNum) {
    return Math.round(length / (2 * Math.tan(Math.PI / totalNum)))-3;
}

$('#laba').on('tap', function(e) {
    if (audio.paused) {
        audio.play();
        $('#laba').text('🎺');
    } else {
        audio.pause();
        $('#laba').text('⏸');
    }
})
var startX = 0,
    x = 0,
    endX = 0;
   $('#box').on('touchstart', function(event) {
    event.preventDefault();
   console.log(event)
    var touch = event.targetTouches[0];
    //startX = touch.pageX - x;
}) 