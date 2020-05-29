var vertexShaderText =
`
precision mediump float;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;
uniform mat3 mNormal;
uniform vec3 lightDir;
attribute vec3 vPosition;
attribute vec3 vNormal;
attribute vec2 vTexCoord;
varying vec3 fNormal;
varying vec3 fLightDir;
varying vec2 fTexCoord;

void main()
{
  fNormal = mNormal * vNormal;
  fLightDir = (mView * vec4(lightDir, 0.0)).xyz;
  fTexCoord = vTexCoord;
  gl_Position = mProj * mView * mWorld * vec4(vPosition, 1.0);
}
`;

var fragmentShaderText =
`
precision mediump float;

uniform vec3 cAmbient;
uniform vec3 cDiffuse;
uniform vec3 cSpecular;
uniform float alpha;
uniform sampler2D sampler;
varying vec3 fNormal;
varying vec3 fLightDir;
varying vec2 fTexCoord;
void main()
{
  vec3 lightDir = normalize(fLightDir);
  vec3 normalDir = normalize(fNormal);
  vec3 eyeDir = vec3(0.0, 0.0, 1.0);
  vec3 light = cAmbient;
  light += cDiffuse * max(dot(normalDir, lightDir), 0.0);
  light += cSpecular * pow(max(dot(reflect(-lightDir, normalDir), eyeDir), 0.0), alpha);
  gl_FragColor =  texture2D(sampler, fTexCoord);
}
`;

// This is just a simple demonstration. Wavefront OBJ is not fully supported!
// See https://en.wikipedia.org/wiki/Wavefront_.obj_file for more information.
async function fetchModel(location) {
	
	// fetch is explained at https://www.youtube.com/watch?v=tc8DU14qX6I.
	var response = await fetch(location);
	var txt = await response.text();
	var lines = txt.split(/\r*\n/);

	var v = [];
	var vt = [];
	var vn = [];
	var vbo = [];

	for (line of lines) {
		var data = line.trim().split(/\s+/);
		var type = data.shift();
		if (type == 'v') {
			v.push(data.map(x=>{return parseFloat(x)}));
		}
		else if (type == 'vt') {
			vt.push(data.map(x=>{return parseFloat(x)}));
		}
		else if (type == 'vn') {
			vn.push(data.map(x=>{return parseFloat(x)}));
		}
		else if (type == 'f') {
			for (fp of data) {
				var idx = fp.split('/').map(x=>{return parseInt(x)});
				v[idx[0]-1].forEach(x=>{vbo.push(x)});
				vt[idx[1]-1].forEach(x=>{vbo.push(x)});
				vn[idx[2]-1].forEach(x=>{vbo.push(x)});
			}
		}
	}
	return vbo;
};

function createShaderProgram(gl, vertexShaderText, fragmentShaderText) {
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);

	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}

	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}

	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
		return;
	}
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program!', gl.getProgramInfoLog(program));
		return;
	}
	return program;
}

async function createplanetExpress(gl) {
	var planetExpress = {};

	var vertices = await fetchModel('PlanetExpress_v0.obj');

	planetExpress.vertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, planetExpress.vertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	planetExpress.texture0 = gl.createTexture();
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, planetExpress.texture0);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("spaceShipTexture"));
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);

	planetExpress.draw = function(program) {
		var cAmbientUniformLocation = gl.getUniformLocation(program, 'cAmbient');
		gl.uniform3f(cAmbientUniformLocation, 0.23, 0.09, 0.03);

		var cDiffuseUniformLocation = gl.getUniformLocation(program, 'cDiffuse');
		gl.uniform3f(cDiffuseUniformLocation, 0.55, 0.21, 0.07);

		var cSpecularUniformLocation = gl.getUniformLocation(program, 'cSpecular');
		gl.uniform3f(cSpecularUniformLocation, 0.58, 0.22, 0.07);

		var alphaUniformLocation = gl.getUniformLocation(program, 'alpha');
		gl.uniform1f(alphaUniformLocation, 51.2);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBufferObject);

		var positionAttribLocation = gl.getAttribLocation(program, 'vPosition');
		var texCoordAttribLocation = gl.getAttribLocation(program, 'vTexCoord');
		var normalAttribLocation = gl.getAttribLocation(program, 'vNormal');
		gl.vertexAttribPointer(
			positionAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			8 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			0 // Offset from the beginning of a single vertex to this attribute
		);
		gl.vertexAttribPointer(
			texCoordAttribLocation, // Attribute location
			2, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			8 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
		);		
		gl.vertexAttribPointer(
			normalAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			8 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			5 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
		);
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, planetExpress.texture0);

		gl.enableVertexAttribArray(positionAttribLocation);
		gl.enableVertexAttribArray(texCoordAttribLocation);
		gl.enableVertexAttribArray(normalAttribLocation);

		//var colorAttribLocation = gl.getAttribLocation(program, 'vColor');
		//gl.vertexAttrib4f(colorAttribLocation, 1.0, 1.0, 1.0, 1.0);
				
		gl.drawArrays(gl.TRIANGLES, 0, vertices.length/8);
		
		gl.disableVertexAttribArray(positionAttribLocation);
		gl.disableVertexAttribArray(texCoordAttribLocation);
		gl.disableVertexAttribArray(normalAttribLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}
	return planetExpress;
}

async function InitDemo() {

	// Get WebGL context
	console.log('Getting WebGL context ...');
	var canvas = document.getElementById('cg1-canvas');
	var gl = canvas.getContext('webgl');
	if (!gl) {
		console.log('WebGL not supported, falling back on experimental-webgl');
		gl = canvas.getContext('experimental-webgl');
	}
	if (!gl) {
		console.error('Your browser does not support WebGL');
		return;
	}

	// Create shaders
	console.log('Creating shaders ...');
	var program = createShaderProgram(gl, vertexShaderText, fragmentShaderText);
	if (!program) {
		console.error('Cannot run without shader program!');
		return;
	}

	// Create planetExpress object
	console.log('Creating planetExpress object ...');
	var planetExpress = await createplanetExpress(gl);

	// Configure OpenGL state machine
	gl.useProgram(program);

	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.enable(gl.DEPTH_TEST);

	var lightDirUniformLocation = gl.getUniformLocation(program, 'lightDir');
	gl.uniform3f(lightDirUniformLocation, 0.0, 1.0, 0.0);

	var projMatrix = new Float32Array(16);
	mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);
	var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');
	gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

	// Main render loop
	var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
	var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
	var matNormUniformLocation = gl.getUniformLocation(program, 'mNormal');

	var angle = 0;
	var worldMatrix = new Float32Array(16);
	var viewMatrix = new Float32Array(16);
	var normalMatrix = new Float32Array(9);
	var tmpMatrix = new Float32Array(16);
	var loop = function () {
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

		angle = performance.now() / 1000 / 6 * 2 * Math.PI;

		mat4.lookAt(viewMatrix, [0, 3, 7], [0, 0, 0], [0, 1, 0]);
		mat4.rotate(viewMatrix, viewMatrix, angle/4, [0, 1, 0]);
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);

		mat4.identity(worldMatrix);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

		mat4.multiply(tmpMatrix, viewMatrix, worldMatrix);
		//mat4.identity(tmpMatrix);
		mat3.normalFromMat4(normalMatrix, tmpMatrix);
		gl.uniformMatrix3fv(matNormUniformLocation, gl.FALSE, normalMatrix);

		planetExpress.draw(program);

		requestAnimationFrame(loop);
	};

	console.log('Entering rendering loop ...')
	requestAnimationFrame(loop);
};

window.onload = InitDemo;
