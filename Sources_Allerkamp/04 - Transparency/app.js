var vertexShaderText = 
[
'precision mediump float;',
'',
'attribute vec3 vertPosition;',
'attribute vec4 vertColor;',
'attribute vec3 vertNormal;',
'varying vec4 fragColor;',
'varying vec3 fragNormal;',
'uniform mat4 mWorld;',
'uniform mat4 mView;',
'uniform mat4 mProj;',
'uniform mat3 normMat;',
'',
'void main()',
'{',
'  fragColor = vertColor;',
'  //fragNormal = (mWorld * vec4(vertNormal, 0.0)).xyz;',
'  fragNormal = normMat * verNormal;',
'  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
'}'
].join('\n');

var fragmentShaderText =
[
'precision mediump float;',
'',
'struct DirectionalLight',
'{',
'	vec3 direction;',
'	vec3 color;',
'};',
'',
'varying vec4 fragColor;',
'varying vec3 fragNormal;',
'',
'uniform vec3 ambientLightIntensity;',
'uniform  DirectionalLight sun;',
'',
'void main()',
'{',
'	vec3 surfaceNormal = normalize(fragNormal);',
'	vec3 normSunDir = normalize(sun.direction);',
'',
'	vec3 lightIntensity = ambientLightIntensity + sun.color * max(dot(surfaceNormal, normSunDir), 0.0);',
'',
'	gl_FragColor = vec4(fragColor.rgb * lightIntensity, fragColor.a);',
'}'
].join('\n');

// This is just a simple demonstration. Wavefront OBJ is not fully supported!
// See https://en.wikipedia.org/wiki/Wavefront_.obj_file for more information.
async function fetchModel(location) {
	
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
				vbo.push(1.0);
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

function createBox(gl) {
	var box = {};

	var vertices =
	[ // X, Y, Z           R, G, B, A
		// Top
		-1.0, 1.0, -1.0,   0.5, 0.5, 0.5, 1.0,
		-1.0, 1.0, 1.0,    0.5, 0.5, 0.5, 1.0,
		1.0, 1.0, 1.0,     0.5, 0.5, 0.5, 1.0,
		1.0, 1.0, -1.0,    0.5, 0.5, 0.5, 1.0,

		// Left
		-1.0, 1.0, 1.0,    0.75, 0.25, 0.5, 1.0,
		-1.0, -1.0, 1.0,   0.75, 0.25, 0.5, 1.0,
		-1.0, -1.0, -1.0,  0.75, 0.25, 0.5, 1.0,
		-1.0, 1.0, -1.0,   0.75, 0.25, 0.5, 1.0,

		// Right
		1.0, 1.0, 1.0,    0.25, 0.25, 0.75, 1.0,
		1.0, -1.0, 1.0,   0.25, 0.25, 0.75, 1.0,
		1.0, -1.0, -1.0,  0.25, 0.25, 0.75, 1.0,
		1.0, 1.0, -1.0,   0.25, 0.25, 0.75, 1.0,

		// Front
		1.0, 1.0, 1.0,    1.0, 0.0, 0.15, 1.0,
		1.0, -1.0, 1.0,    1.0, 0.0, 0.15, 1.0,
		-1.0, -1.0, 1.0,    1.0, 0.0, 0.15, 1.0,
		-1.0, 1.0, 1.0,    1.0, 0.0, 0.15, 1.0,

		// Back
		1.0, 1.0, -1.0,    0.0, 1.0, 0.15, 1.0,
		1.0, -1.0, -1.0,    0.0, 1.0, 0.15, 1.0,
		-1.0, -1.0, -1.0,    0.0, 1.0, 0.15, 1.0,
		-1.0, 1.0, -1.0,    0.0, 1.0, 0.15, 1.0,

		// Bottom
		-1.0, -1.0, -1.0,   0.5, 0.5, 1.0, 1.0,
		-1.0, -1.0, 1.0,    0.5, 0.5, 1.0, 1.0,
		1.0, -1.0, 1.0,     0.5, 0.5, 1.0, 1.0,
		1.0, -1.0, -1.0,    0.5, 0.5, 1.0, 1.0,
	];

	var indices =
	[
		// Front
		13, 12, 14,
		15, 14, 12,

		// Top
		0, 1, 2,
		0, 2, 3,

		// Left
		5, 4, 6,
		6, 4, 7,

		// Right
		8, 9, 10,
		8, 10, 11,

		// Back
		16, 17, 18,
		16, 18, 19,

		// Bottom
		21, 20, 22,
		22, 20, 23
	];

	box.vertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, box.vertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	box.indexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, box.indexBufferObject);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	box.draw = function(positionAttribLocation, colorAttribLocation) {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBufferObject);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBufferObject);
		gl.vertexAttribPointer(
			positionAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			7 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			0 // Offset from the beginning of a single vertex to this attribute
		);
		gl.vertexAttribPointer(
			colorAttribLocation, // Attribute location
			4, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			7 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
		);
		gl.enableVertexAttribArray(positionAttribLocation);
		gl.enableVertexAttribArray(colorAttribLocation);
		gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
		gl.disableVertexAttribArray(positionAttribLocation);
		gl.disableVertexAttribArray(colorAttribLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	}
	return box;
}

function createPlane(gl) {
	var plane = {};

	var vertices =
	[  //  X,    Y,   Z
		 1.0, -1.0, 0.0,
		 1.0,  1.0, 0.0,
		-1.0, -1.0, 0.0,
		-1.0,  1.0, 0.0,
		-1.0, -1.0, 0.0,
		1.0,  1.0, 0.0,
	];

	plane.vertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, plane.vertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	plane.draw = function(positionAttribLocation, colorAttribLocation, color) {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBufferObject);
		gl.vertexAttribPointer(
			positionAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			0 // Offset from the beginning of a single vertex to this attribute
		);
		gl.enableVertexAttribArray(positionAttribLocation);
		gl.disableVertexAttribArray(colorAttribLocation);
		gl.vertexAttrib4fv(colorAttribLocation, color);
		gl.drawArrays(gl.TRIANGLES, 0, vertices.length/3);
		gl.disableVertexAttribArray(positionAttribLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}
	return plane;
}

async function createTeapot(gl) {
	var teapot = {};

	var vertices = await fetchModel('teapot.obj');

	teapot.vertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, teapot.vertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	teapot.draw = function(positionAttribLocation, normalAttribLocation, colorAttribLocation, color) {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBufferObject);
		gl.vertexAttribPointer(
			positionAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			9 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			0 // Offset from the beginning of a single vertex to this attribute
		);
		gl.vertexAttribPointer(
			normalAttribLocation, // Attribute location
			4, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.TRUE,
			9 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			5 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
		);
		gl.enableVertexAttribArray(positionAttribLocation);
		gl.enableVertexAttribArray(normalAttribLocation);
		gl.disableVertexAttribArray(colorAttribLocation);
		gl.vertexAttrib4fv(colorAttribLocation, color);
		gl.drawArrays(gl.TRIANGLES, 0, vertices.length/9);
		gl.disableVertexAttribArray(positionAttribLocation);
		gl.disableVertexAttribArray(normalAttribLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}
	return teapot;
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

	// Create box object
	console.log('Creating box object ...');
	var box = createBox(gl);

	// Create plane object
	console.log('Creating plane object ...');
	var plane = createPlane(gl);

	// Create teapot object
	console.log('Creating teapot object ...');
	var teapot = await createTeapot(gl);

	// Configure OpenGL state machine
	gl.useProgram(program);
	var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
	var normalAttribLocation = gl.getAttribLocation(program, 'vertNormal');
	
	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.enable(gl.DEPTH_TEST);
	// c_neu = a_obj * c_obj + (1-a_obj) * c_fb
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	gl.enable(gl.BLEND);
	
	var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
	var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
	var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');
	var matNormUniformLocation = gl.getUniformLocation(program, 'normMat');

	// Normalen Matrix
	var normMatrix = new Float32Array(9);
	normaMatrix = mat3.normalFromMat4(normMatrix, viewMatrix*worldMatrix);

	var projMatrix = new Float32Array(16);
	mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);
	gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

	//
	// Lighting information
	//
	gl.useProgram(program);

	var ambientUniformLocation = gl.getUniformLocation(program, 'ambientLightIntensity');
	var sunlightDirUniformLocation = gl.getUniformLocation(program, 'sun.direction');
	var sunlightIntUniformLocation = gl.getUniformLocation(program, 'sun.color');

	gl.uniform3f(ambientUniformLocation, 0.2, 0.2, 0.2);
	gl.uniform3f(sunlightDirUniformLocation, 1.0, 4.0, 10.0);
	gl.uniform3f(sunlightIntUniformLocation, 0.9, 0.7, 0.8);

	
	//
	// Main render loop
	var angle = 0;
	var worldMatrix = new Float32Array(16);
	var viewMatrix = new Float32Array(16);
	var loop = function () {
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

		angle = performance.now() / 1000 / 6 * 2 * Math.PI;

		mat4.lookAt(viewMatrix, [0, 0, 16], [0, 0, 0], [0, 1, 0]);
		mat4.rotate(viewMatrix, viewMatrix, angle/4, [0, 1, 0]);
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);

		gl.depthMask(true);

		mat4.identity(worldMatrix);
		mat4.translate(worldMatrix, worldMatrix, [2.0, 0.0, 0.0]);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		// teapot.draw(positionAttribLocation, normalAttribLocation, colorAttribLocation, [0.0, 1.0, 0.0, 1.0]);

		mat4.identity(worldMatrix);
		mat4.translate(worldMatrix, worldMatrix, [-2.0, 0.0, 0.0]);
		mat4.scale(worldMatrix, worldMatrix, [0.8, 0.8, 0.8]);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		box.draw(positionAttribLocation, colorAttribLocation);

		gl.depthMask(false);

		var planeColors =
		[
			// R,   G,   B,   A
			[0.0, 0.0, 0.0, 0.8],
			[0.0, 0.0, 1.0, 0.2],
			[0.0, 1.0, 0.0, 0.2],
			[0.0, 1.0, 1.0, 0.2],
			[1.0, 0.0, 0.0, 0.2],
			[1.0, 0.0, 1.0, 0.2],
			[1.0, 1.0, 0.0, 0.2],
			[1.0, 1.0, 1.0, 0.1],
		];
		// for (var i = 0; i < planeColors.length; i++) {
		// 	mat4.identity(worldMatrix);
		// 	mat4.rotate(worldMatrix, worldMatrix, i * 2.0 * Math.PI / 8.0, [0, 1, 0]);
		// 	mat4.translate(worldMatrix, worldMatrix, [0.0, 0.0, 8.0]);
		// 	gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		// 	plane.draw(positionAttribLocation, colorAttribLocation, planeColors[i]);
		// }

		requestAnimationFrame(loop);
	};
	console.log('Entering rendering loop ...')
	requestAnimationFrame(loop);
};

window.onload = InitDemo;
