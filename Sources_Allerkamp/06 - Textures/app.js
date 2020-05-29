var vertexShaderText =
`
precision mediump float;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;
attribute vec3 vPosition;
attribute vec2 vTexCoord;
varying vec2 fTexCoord;

void main()
{
  fTexCoord = vTexCoord;
  gl_Position = mProj * mView * mWorld * vec4(vPosition, 1.0);
}
`;

var fragmentShaderText =
`
precision mediump float;

uniform sampler2D sampler;
varying vec2 fTexCoord;
void main()
{
  gl_FragColor =  texture2D(sampler, fTexCoord);
}
`;


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


function createBox(gl, animated) {
	var box = {};

	var vertices =
	[ // X,    Y,   Z,     S,   T
		// Top
		-1.0,  1.0, -1.0,  0.0, 0.0,
		-1.0,  1.0,  1.0,  0.0, 1.0,
		 1.0,  1.0,  1.0,  1.0, 1.0,
		 1.0,  1.0, -1.0,  1.0, 0.0,

		// Left
		-1.0,  1.0,  1.0,  1.0, 1.0,
		-1.0, -1.0,  1.0,  0.0, 1.0,
		-1.0, -1.0, -1.0,  0.0, 0.0,
		-1.0,  1.0, -1.0,  1.0, 0.0,

		// Right
		 1.0,  1.0,  1.0,  1.0, 1.0,
		 1.0, -1.0,  1.0,  0.0, 1.0,
		 1.0, -1.0, -1.0,  0.0, 0.0,
		 1.0,  1.0, -1.0,  1.0, 0.0,

		// Front
		 1.0,  1.0,  1.0,  1.0, 1.0,
		 1.0, -1.0,  1.0,  1.0, 0.0,
		-1.0, -1.0,  1.0,  0.0, 0.0,
		-1.0,  1.0,  1.0,  0.0, 1.0,

		// Back
		 1.0,  1.0, -1.0,  1.0, 1.0,
		 1.0, -1.0, -1.0,  1.0, 0.0,
		-1.0, -1.0, -1.0,  0.0, 0.0,
		-1.0,  1.0, -1.0,  0.0, 1.0,

		// Bottom
		-1.0, -1.0, -1.0,  0.0, 0.0,
		-1.0, -1.0,  1.0,  0.0, 1.0,
		 1.0, -1.0,  1.0,  1.0, 1.0,
		 1.0, -1.0, -1.0,  1.0, 0.0,
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

	box.texture = gl.createTexture();
	gl.activeTexture(gl.TEXTURE13);
	gl.bindTexture(gl.TEXTURE_2D, box.texture);
	if (animated) {
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		// use this texture until video available
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("box-texture"));
	}
	else {
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("box-texture"));
		gl.generateMipmap(gl.TEXTURE_2D);
	}
	gl.bindTexture(gl.TEXTURE_2D, null);

	box.draw = function(program) {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBufferObject);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBufferObject);

		var positionAttribLocation = gl.getAttribLocation(program, 'vPosition');
		gl.vertexAttribPointer(
			positionAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			0 // Offset from the beginning of a single vertex to this attribute
		);
		gl.enableVertexAttribArray(positionAttribLocation);

		var texCoordAttribLocation = gl.getAttribLocation(program, 'vTexCoord');
		gl.vertexAttribPointer(
			texCoordAttribLocation, // Attribute location
			2, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
		);
		gl.enableVertexAttribArray(texCoordAttribLocation);

		gl.activeTexture(gl.TEXTURE11);
		gl.bindTexture(gl.TEXTURE_2D, box.texture);
		if (animated) {
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("video-texture"));
		}

		var samplerUniformLocation = gl.getUniformLocation(program, 'sampler');
		gl.uniform1i(samplerUniformLocation, 11);

		gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
		
		gl.disableVertexAttribArray(positionAttribLocation);
		gl.disableVertexAttribArray(texCoordAttribLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
	return box;
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

	// Create box objects
	console.log('Creating box objects ...');
	var box1 = createBox(gl, false);
	var box2 = createBox(gl, true);

	// Configure OpenGL state machine
	gl.useProgram(program);

	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.enable(gl.DEPTH_TEST);

	var projMatrix = new Float32Array(16);
	mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);
	var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');
	gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

	// Main render loop
	var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
	var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
	var angle = 0;
	var worldMatrix = new Float32Array(16);
	var viewMatrix = new Float32Array(16);
	var loop = function () {
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

		angle = performance.now() / 1000 / 6 * 2 * Math.PI;

		mat4.lookAt(viewMatrix, [0, 3, 7], [0, 0, 0], [0, 1, 0]);
		mat4.rotate(viewMatrix, viewMatrix, angle/4, [0, 1, 0]);
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);

		gl.depthMask(true);

		mat4.identity(worldMatrix);
		mat4.translate(worldMatrix, worldMatrix, [2.0, 0.0, 0.0]);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		box1.draw(program);

		mat4.identity(worldMatrix);
		mat4.translate(worldMatrix, worldMatrix, [-2.0, 0.0, 0.0]);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		box2.draw(program);

		requestAnimationFrame(loop);
	};

	console.log('Entering rendering loop ...')
	requestAnimationFrame(loop);
};

window.onload = InitDemo;
