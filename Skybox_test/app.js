"use strict";

async function fetchModel(location) {
	
	// fetch is explained at https://www.youtube.com/watch?v=tc8DU14qX6I.
	const response = await fetch(location);
	const txt = await response.text();
	const lines = txt.split(/\r*\n/);

	let v = [];
	let vt = [];
	let vn = [];
	let vbo = [];

	for (let line of lines) {
		const data = line.trim().split(/\s+/);
		const type = data.shift();
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
			for (let fp of data) {
				const idx = fp.split('/').map(x=>{return parseInt(x)});
				v[idx[0]-1].forEach(x=>{vbo.push(x)});
				vt[idx[1]-1].forEach(x=>{vbo.push(x)});
				vn[idx[2]-1].forEach(x=>{vbo.push(x)});
			}
		}
	}
	return vbo;
};


async function createShaderProgram(gl, vertexShaderLocation, fragmentShaderLocation) {
	const vertexShaderResponse = await fetch(vertexShaderLocation);
	const vertexShaderText = await vertexShaderResponse.text();
	const vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, vertexShaderText);
	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}

	const fragmentShaderResponse = await fetch(fragmentShaderLocation);
	const fragmentShaderText = await fragmentShaderResponse.text();
	const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, fragmentShaderText);
	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}	

	const program = gl.createProgram();
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

async function createSkyBoxTexture(gl) {
	const texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
	gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X,
		0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		document.getElementById('sb-right'));
	gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
		0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		document.getElementById('sb-left'));
	gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
		0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		document.getElementById('sb-top'));
	gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
		0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		document.getElementById('sb-bottom'));
	gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
		0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		document.getElementById('sb-front'));
	gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
		0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		document.getElementById('sb-back'));



	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	// gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE); 
}

async function createSkyBox(gl) {
	const box = {};

	var vertices =
	[ // X, Y, Z
		// Top
		-1.0, 1.0, -1.0,
		-1.0, 1.0, 1.0, 
		1.0, 1.0, 1.0,  
		1.0, 1.0, -1.0, 

		// Left
		-1.0, 1.0, 1.0,   
		-1.0, -1.0, 1.0,  
		-1.0, -1.0, -1.0, 
		-1.0, 1.0, -1.0,  

		// Right
		1.0, 1.0, 1.0,    
		1.0, -1.0, 1.0,   
		1.0, -1.0, -1.0,  
		1.0, 1.0, -1.0,   

		// Front
		1.0, 1.0, 1.0,  
		1.0, -1.0, 1.0,  
		-1.0, -1.0, 1.0,  
		-1.0, 1.0, 1.0,  

		// Back
		1.0, 1.0, -1.0,  
		1.0, -1.0, -1.0,  
		-1.0, -1.0, -1.0,  
		-1.0, 1.0, -1.0,  

		// Bottom
		-1.0, -1.0, -1.0,
		-1.0, -1.0, 1.0, 
		1.0, -1.0, 1.0,  
		1.0, -1.0, -1.0 
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

	box.draw = function(positionAttribLocation) {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBufferObject);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBufferObject);
		gl.vertexAttribPointer(
			positionAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			0 // Offset from the beginning of a single vertex to this attribute
		);
		gl.enableVertexAttribArray(positionAttribLocation);
		gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
		gl.disableVertexAttribArray(positionAttribLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	}
	return box;
}

async function createEarth(gl){
	const earth = {};

	const vertices = await fetchModel('earth.obj');

	earth.vertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, earth.vertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	earth.texture0 = gl.createTexture();
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, earth.texture0);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("earth-albedo"));
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);

	earth.texture1 = gl.createTexture();
	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, earth.texture1);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("earth-clouds"));
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);

	earth.texture2 = gl.createTexture();
	gl.activeTexture(gl.TEXTURE2);
	gl.bindTexture(gl.TEXTURE_2D, earth.texture2);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("earth-night-lights"));
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);

	earth.texture3 = gl.createTexture();
	gl.activeTexture(gl.TEXTURE3);
	gl.bindTexture(gl.TEXTURE_2D, earth.texture3);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("earth-ocean-mask"));
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);

	earth.draw = function(positionAttribLocation, texCoordAttribLocation, normalAttribLocation) {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBufferObject);
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
		gl.bindTexture(gl.TEXTURE_2D, earth.texture0);
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, earth.texture1);
		gl.activeTexture(gl.TEXTURE2);
		gl.bindTexture(gl.TEXTURE_2D, earth.texture2);
		gl.activeTexture(gl.TEXTURE3);
		gl.bindTexture(gl.TEXTURE_2D, earth.texture3);

		gl.enableVertexAttribArray(positionAttribLocation);
		gl.enableVertexAttribArray(texCoordAttribLocation);
		gl.enableVertexAttribArray(normalAttribLocation);

		gl.drawArrays(gl.TRIANGLES, 0, vertices.length/8);
		
		gl.disableVertexAttribArray(positionAttribLocation);
		gl.disableVertexAttribArray(texCoordAttribLocation);
		gl.disableVertexAttribArray(normalAttribLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}
	return earth;
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
	const canvas = document.getElementById('cg1-canvas');
	const gl = canvas.getContext('webgl');
	if (!gl) {
		console.log('WebGL not supported, falling back on experimental-webgl');
		gl = canvas.getContext('experimental-webgl');
	}
	if (!gl) {
		console.error('Your browser does not support WebGL');
		return;
	}

	// Create Skybox texture
	const texture = createSkyBoxTexture(gl);

	// Create skybox
	console.log('Creating skybox... ');
	const skybox = await createSkyBox(gl);
	skybox.texture = texture;
	skybox.program = await createShaderProgram(gl, 'skybox_vert.glsl', 'skybox_frag.glsl');
	if (!skybox.program) {
		console.error('Skybox cannot run without shader');
		return;
	}
	
	// // Create teapot
	// console.log('Creating teapot... ');
	// const teapot = await createTeapot(gl);
	// teapot.texture = texture;
	// teapot.program = await createShaderProgram(gl, 'teapot_vert.glsl', 'teapot_frag.glsl');
	// if (!skybox.program) {
	// 	console.error('teapot cannot run without shader');
	// 	return;
	// }


	// // Create earth objects
	// console.log('Creating earth objects ...');
	// const earth = await createEarth(gl);
	// earth.texture = texture;
	// earth.program = await createShaderProgram

	// // Create shaders
	// console.log('Creating shaders ...');
	// const program = await createShaderProgram(gl, 'teapot_vert.glsl', 'teapot_frag.glsl');
	// if (!program) {
	// 	console.error('Cannot run without shader program!');
	// 	return;
	// }

	// Configure OpenGL state machine
	gl.useProgram(skybox.program);
	const positionAttribLocation = gl.getAttribLocation(skybox.program, 'vPosition');
	const texCoordAttribLocation = gl.getAttribLocation(skybox.program, 'vTexCoord');
	const normalAttribLocation = gl.getAttribLocation(skybox.program, 'vNormal');

	gl.clearColor(0.0, 0.0, 0.0, 0.0);
	// gl.enable(gl.DEPTH_TEST);
	// gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	// gl.enable(gl.BLEND);

	var projMatrix = new Float32Array(16);
	mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);
	
	const matWorldUniformLocation = gl.getUniformLocation(skybox.program, 'mWorld');
	const matViewUniformLocation = gl.getUniformLocation(skybox.program, 'mView');
	const matProjUniformLocation = gl.getUniformLocation(skybox.program, 'mProj');
	
	// const samplerDayLocation = gl.getUniformLocation(program, "sDay");
	// gl.uniform1i(samplerDayLocation, 0);
	// const samplerCloudLocation = gl.getUniformLocation(program, "sClouds");
	// gl.uniform1i(samplerCloudLocation, 1);
	// const samplerNightLocation = gl.getUniformLocation(program, "sNight");
	// gl.uniform1i(samplerNightLocation, 2);
	// const samplerOceanLocation = gl.getUniformLocation(program, "sOcean");
	// gl.uniform1i(samplerOceanLocation, 3);
	
	// const shiftUniformLocation = gl.getUniformLocation(program, "shift");
	
	let angle = 0;
	const worldMatrix = new Float32Array(16);
	const viewMatrix = new Float32Array(16);
	gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
	
	// Main render loop
	const loop = function () {
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

		angle = performance.now() / 1000 / 6 * 2 * Math.PI;

		mat4.lookAt(viewMatrix, [0, 3, 100], [0, 10, 0], [0, 1, 0]);
		mat4.rotate(viewMatrix, viewMatrix, angle/4, [0, 1, 0]);
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);

		gl.depthMask(false);

		mat4.identity(worldMatrix);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		skybox.draw(worldMatrix);

		gl.depthMask(true);
		
		mat4.identity(worldMatrix);
		mat4.scale(worldMatrix, worldMatrix, [2.0, 2.0, 2.0]);
		// gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		// earth.draw(positionAttribLocation, texCoordAttribLocation, normalAttribLocation);

		requestAnimationFrame(loop);
	};

	console.log('Entering rendering loop ...')
	requestAnimationFrame(loop);
};

window.onload = InitDemo;
