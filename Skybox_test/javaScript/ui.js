function showNormalMappingFunc(gl, program, showNormalMapping){
    let normalMappingUniformLocation = gl.getUniformLocation(program, 'showNormalMapping');
    const button = document.getElementById('showNormalMappingButton');
    
    gl.useProgram(program);
    
    if (showNormalMapping) {
        gl.uniform1i(normalMappingUniformLocation, 1);
        button.innerHTML = "hide NormalMapping";
    } else {
        gl.uniform1i(normalMappingUniformLocation, 0);
        button.innerHTML = "show NormalMapping";
    }
}

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
        // console.log(mouseXposition+" "+mouseYposition);
    }
    if((spaceBar)){
        mouseLightControlX+= mouseXStart - mouseXBuffer;
        mouseLightControlY+= mouseYStart - mouseYBuffer;
        
        spotLightDir = [
            Math.cos(mouseLightControlY*Math.PI/5000),
            Math.sin(mouseLightControlY*Math.PI/5000),
            0]; 
        

    }
  });



window.addEventListener('wheel',function(e) {
	
	if ((camDistance + e.deltaY/20 >10)&&(camDistance + e.deltaY/20<830)) {
        //console.log(camDistance);
		camDistance+= e.deltaY/20;		
	}	
});

document.addEventListener("keydown", 
    function(event) {
        if(event.keyCode===32){
            spaceBar=true;
            console.log("SPACE ON")  ;
        }
    });

document.addEventListener('keyup', 
    function (evt) {
        if (evt.keyCode === 32) {
            spaceBar=false;
            console.log("SPACE OFF") 
        }
});