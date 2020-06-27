function showNormalMappingFunc(gl, program, showNormalMapping){
    let normalMappingUniformLocation = gl.getUniformLocation(program, 'showNormalMapping');
    const button = document.getElementById('showNormalMappingButton');
    if (showNormalMapping) {
        gl.uniform1i(normalMappingUniformLocation, 1);
        button.innerHTML = "hide NormalMapping";
    } else {
        gl.uniform1i(normalMappingUniformLocation, 0);
        button.innerHTML = "show NormalMapping";
    }
}

var mouseXposition=0;
var mouseYposition=0;
var camDistance =15;
let mousedown = false;

window.addEventListener('mousedown', function(){
    mousedown = true;
});

window.addEventListener('mouseup', function(){
    mousedown = false;
});

window.addEventListener('mousemove',function(e){
    if (mousedown){
        mouseXposition = -(e.clientX - this.screen.width/2)/10;
        mouseYposition = (e.clientY - this.screen.height/2)/10;
    }
  });


window.addEventListener('wheel',function(e) {
	
	if (camDistance + e.deltaY/20 >10) {
		camDistance+= e.deltaY/20;		
	}	
});