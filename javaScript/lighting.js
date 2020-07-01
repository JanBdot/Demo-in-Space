const ambient = [1.0, 1.0, 1.0];
const diffuse = [0.5, 0.5, 0.5];
const specular = [0.4, 0.4, 0.4];
let lampPos = [-1.0, 0.5, 1.0];
//spotlight

var  spotLightDir = [
    1,
    1,
    0];

function setUpLighting(gl, program){
    gl.useProgram(program);
    
    
    const lightAmbientUniform = gl.getUniformLocation(program, "light.ambient");
    const lightDiffuseUniform = gl.getUniformLocation(program, "light.diffuse");
    const lightSpecularUniform = gl.getUniformLocation(program, "light.specular");
    const lightPosUniform = gl.getUniformLocation(program, "light.position");
   //spotlight
    const spotLightDirUniform = gl.getUniformLocation(program, "light.spLD");


    gl.uniform3f(lightAmbientUniform, ambient[0], ambient[1], ambient[2]);
    gl.uniform3f(lightDiffuseUniform, diffuse[0], diffuse[1], diffuse[2]);
    gl.uniform3f(lightSpecularUniform, specular[0], specular[1], specular[2]);
    gl.uniform3f(lightPosUniform, lampPos[0], lampPos[1], lampPos[2]);
    //spotlight
    gl.uniform3f(spotLightDirUniform, spotLightDir[0], spotLightDir[1], spotLightDir[2]);
}

function callForEachProgram(func, programs, gl) {
    programs.forEach(program => {
        func(gl, program);
    });
}

function changeAmbient(ambientStrength) {
    ambient.length = 0;
    for (let i = 0; i < 3; i++) {
        ambient.push(ambientStrength);
    }
}

function changeDiffuse(diffuseStrength) {
    diffuse.length = 0;
    for (let i = 0; i < 3; i++) {
        diffuse.push(diffuseStrength);
    }
}

function changeSpecular(specularStrength) {
    specular.length = 0;
    for (let i = 0; i < 3; i++) {
        specular.push(specularStrength);
    }
}

function changeLightPosition(pos){
    if (pos != null){
        lampPos = pos;        
    }
}

