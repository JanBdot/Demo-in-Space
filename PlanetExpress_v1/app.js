var vertexShaderText = 
[
'precision mediump float;',
'',
'attribute vec3 vertPosition;',
'attribute vec3 vertColor;',
'attribute vec3 vertNormal;',
'varying vec3 fragColor;',
'varying vec3 fragNormal;',
'uniform mat4 mWorld;',
'uniform mat4 mView;',
'uniform mat4 mProj;',
'',
'void main()',
'{',
'  fragColor = vertColor;',
'  fragNormal = vertNormal;',
'  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
'}'
].join('\n');

var fragmentShaderText =
[
'precision mediump float;',
'',
'varying vec3 fragColor;',
'varying vec3 fragNormal;',
'void main()',
'{',
'  gl_FragColor = vec4(fragNormal, 1.0);',
'}'
].join('\n');

// This is just a simple demonstration. Wavefront OBJ is not fully supported!
// See https://en.wikipedia.org/wiki/Wavefront_.obj_file for more information.
var fetchModel = async function(location) {
	
	// fetch is explained at https://www.youtube.com/watch?v=tc8DU14qX6I.
	var response = await fetch(location);
	var txt = await response.text();
	var lines = txt.split(/\r*\n/);

	var oa = document.getElementById('output-area');
	oa.innerHTML = lines.join('<br>\n');
	
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
	console.log(vbo);
	
	return vbo;
};

var InitDemo = async function () {

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

	// Create buffer
	console.log('Creating buffer ...');
	var boxVertices = 
	[ // X, Y, Z           R, G, B
		// Top
		-1.0, 1.0, -1.0,   0.5, 0.5, 0.5,
		-1.0, 1.0, 1.0,    0.5, 0.5, 0.5,
		1.0, 1.0, 1.0,     0.5, 0.5, 0.5,
		1.0, 1.0, -1.0,    0.5, 0.5, 0.5,

		// Left
		-1.0, 1.0, 1.0,    0.75, 0.25, 0.5,
		-1.0, -1.0, 1.0,   0.75, 0.25, 0.5,
		-1.0, -1.0, -1.0,  0.75, 0.25, 0.5,
		-1.0, 1.0, -1.0,   0.75, 0.25, 0.5,

		// Right
		1.0, 1.0, 1.0,    0.25, 0.25, 0.75,
		1.0, -1.0, 1.0,   0.25, 0.25, 0.75,
		1.0, -1.0, -1.0,  0.25, 0.25, 0.75,
		1.0, 1.0, -1.0,   0.25, 0.25, 0.75,

		// Front
		1.0, 1.0, 1.0,    1.0, 0.0, 0.15,
		1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
		-1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
		-1.0, 1.0, 1.0,    1.0, 0.0, 0.15,

		// Back
		1.0, 1.0, -1.0,    0.0, 1.0, 0.15,
		1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
		-1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
		-1.0, 1.0, -1.0,    0.0, 1.0, 0.15,

		// Bottom
		-1.0, -1.0, -1.0,   0.5, 0.5, 1.0,
		-1.0, -1.0, 1.0,    0.5, 0.5, 1.0,
		1.0, -1.0, 1.0,     0.5, 0.5, 1.0,
		1.0, -1.0, -1.0,    0.5, 0.5, 1.0,
	];

	var boxIndices =
	[
		// Top
		0, 1, 2,
		0, 2, 3,

		// Left
		5, 4, 6,
		6, 4, 7,

		// Right
		8, 9, 10,
		8, 10, 11,

		// Front
		13, 12, 14,
		15, 14, 12,

		// Back
		16, 17, 18,
		16, 18, 19,

		// Bottom
		21, 20, 22,
		22, 20, 23
	];

	// add boxNormalBufferObject
	// var boxNormalBufferObject = gl.createBuffer();
	// gl.bindBuffer(gl.ARRAY_BUFFER, boxNormalBufferObject);

	var boxVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	var boxIndexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
	var normalAttribLocation = gl.getAttribLocation(program, 'vertNormal');
	
	var drawBox = function() {
		gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
		gl.vertexAttribPointer(
			positionAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			0 // Offset from the beginning of a single vertex to this attribute
		);
		gl.vertexAttribPointer(
			colorAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
		);
		gl.enableVertexAttribArray(positionAttribLocation);
		gl.enableVertexAttribArray(colorAttribLocation);
		gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	}
	
	var planetExpressVertices = await fetchModel('PlanetExpress_v0.obj');

	// var planetExpressNormalBufferObject = gl.createBuffer();
	// gl.bindBuffer(gl.ARRAY_BUFFER, planetExpressNormalBufferObject);
	// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(planetExpressVertices), gl.STATIC_DRAW);
	// gl.bindBuffer(gl.ARRAY_BUFFER, null);


	var planetExpressVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, planetExpressVertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(planetExpressVertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	var drawplanetExpress = function() {
		gl.bindBuffer(gl.ARRAY_BUFFER, planetExpressVertexBufferObject);
		gl.vertexAttribPointer(
			positionAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			8 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			0 // Offset from the beginning of a single vertex to this attribute
		);
		gl.vertexAttribPointer(
			colorAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			8 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			5 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
			);
		gl.vertexAttribPointer(
			normalAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			8 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			5 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute				
		);

		gl.enableVertexAttribArray(positionAttribLocation);
		gl.enableVertexAttribArray(colorAttribLocation);
		gl.drawArrays(gl.TRIANGLES, 0, planetExpressVertices.length/8);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}

	// Tell OpenGL state machine which program should be active.
	gl.useProgram(program);

	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);

	var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
	var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
	var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

	var worldMatrix = new Float32Array(16);
	var viewMatrix = new Float32Array(16);
	var projMatrix = new Float32Array(16);
	mat4.lookAt(viewMatrix, [0, 0, 8], [0, 0, 0], [0, 1, 0]);
	mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);

	gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
	gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

	// Main render loop
	var angle = 0;
	var loop = function () {
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

		angle = performance.now() / 1000 / 6 * 2 * Math.PI;

		mat4.identity(worldMatrix);
		mat4.translate(worldMatrix, worldMatrix, [0.0, 0.0, -5.0]);
		mat4.rotate(worldMatrix, worldMatrix, angle, [0, 1, 0]);
		// mat4.rotate(worldMatrix, worldMatrix, angle / 4, [1, 0, 0]);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		drawplanetExpress();

		mat4.identity(worldMatrix);
		mat4.translate(worldMatrix, worldMatrix, [2.0, 0.0, 0.0]);
		mat4.rotate(worldMatrix, worldMatrix, angle, [0, 1, 0]);
		mat4.rotate(worldMatrix, worldMatrix, angle / 4, [1, 0, 0]);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		// drawplanetExpress();

		mat4.identity(worldMatrix);
		mat4.translate(worldMatrix, worldMatrix, [-2.0, 0.0, 0.0]);
		mat4.rotate(worldMatrix, worldMatrix, angle / 4, [1, 0, 0]);
		mat4.rotate(worldMatrix, worldMatrix, angle, [0, 1, 0]);
		mat4.scale(worldMatrix, worldMatrix, [0.8, 0.8, 0.8]);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		// drawBox();

		requestAnimationFrame(loop);
	};
	console.log('Entering rendering loop ...')
	requestAnimationFrame(loop);
};

window.onload = InitDemo;
