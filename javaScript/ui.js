// Adds Eventlisteners for buttons and mouse interaction 

var mouseXStart=0;
var mouseYStart=0;
var mouseXBuffer=0;
var mouseYBuffer=0;
var mouseXposition=0;
var mouseYposition=0;
var mouseLightControlX=0;
var mouseLightControlY=0;
var camDistance =15;
let mousedown = false;
let spaceBar = false;

window.addEventListener('mousedown', function(){
    mouseXStart=mouseXBuffer;
    mouseYStart=mouseYBuffer;
    mousedown = true;
});

window.addEventListener('mouseup', function(){
    mouseXStart=0;
    mouseYStart=0;
    mousedown = false;
});

window.addEventListener('mousemove',function(e){
    mouseXBuffer = -(e.clientX - this.screen.width/2)/10;
    mouseYBuffer = (e.clientY - this.screen.height/2)/10;
    if (mousedown){
        mouseXposition += mouseXStart - mouseXBuffer;
        if((mouseYposition +mouseYStart - mouseYBuffer<500)&& (mouseYposition +mouseYStart - mouseYBuffer>-500)){
            mouseYposition +=mouseYStart - mouseYBuffer;
        }

    }
    if((spaceBar)){
        if((mouseLightControlX +mouseXStart - mouseXBuffer<400)
        && (mouseLightControlX +mouseXStart - mouseXBuffer>-400))
        {mouseLightControlX+= mouseXStart - mouseXBuffer;}
        if((mouseLightControlY -mouseYStart + mouseYBuffer<400)
        && (mouseLightControlY -mouseYStart + mouseYBuffer>-400))
        {mouseLightControlY+= -mouseYStart + mouseYBuffer;}
        
        
        spotLightDir = [
            Math.cos(mouseLightControlY*Math.PI/1000)*Math.cos(mouseLightControlX*Math.PI/1000),
            Math.sin(mouseLightControlY*Math.PI/1000),
            Math.sin(mouseLightControlX*Math.PI/1000)];
    }
  });



window.addEventListener('wheel',function(e) {
	
	if ((camDistance + e.deltaY/20 >10)&&(camDistance + e.deltaY/20<830)) {
		camDistance+= e.deltaY/20;		
	}	
});
 
document.addEventListener("keydown", 
    function(event) {
        if(event.keyCode===32){
            spaceBar=true;
            mouseXStart=mouseXBuffer;
            mouseYStart=mouseYBuffer;
            
        }
    });

document.addEventListener('keyup', 
    function (evt) {
        if (evt.keyCode === 32) {
            spaceBar=false;
            mouseXStart=0;
            mouseYStart=0;
        }
});