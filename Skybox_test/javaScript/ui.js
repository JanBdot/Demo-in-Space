function showNormalMappingFunc(gl, program, showNormalMapping){
    let normalMappingUniformLocation = gl.getUniformLocation(program, 'showNormalMapping');
    const button = document.getElementById('showNormalMappingButton');

    console.log(createRandomAsteroidSeed());
    
    
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
var camDistance =15;
let mousedown = false;

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
        console.log(mouseXposition+" "+mouseYposition);
    }
  });


window.addEventListener('wheel',function(e) {
	
	if (camDistance + e.deltaY/20 >10) {
		camDistance+= e.deltaY/20;		
	}	
});