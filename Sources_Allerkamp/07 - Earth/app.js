"use strict";

// This is just a simple demonstration. Wavefront OBJ is not fully supported!
// See https://en.wikipedia.org/wiki/Wavefront_.obj_file for more information.
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


async function createEarth(gl) {
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
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("earth_albedo"));
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);

	earth.texture1 = gl.createTexture();
	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, earth.texture1);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("earth_night_lights"));
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);

	earth.texture2 = gl.createTexture();
	gl.activeTexture(gl.TEXTURE2);
	gl.bindTexture(gl.TEXTURE_2D, earth.texture2);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("earth_ocean_mask"));
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);

	earth.texture3 = gl.createTexture();
	gl.activeTexture(gl.TEXTURE3);
	gl.bindTexture(gl.TEXTURE_2D, earth.texture3);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("earth_clouds"));
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

	// Create shaders
	console.log('Creating shaders ...');
	const program = await createShaderProgram(gl, 'earth_vert.glsl', 'earth_frag.glsl');
	if (!program) {
		console.error('Cannot run without shader program!');
		return;
	}

	// Create earth object
	console.log('Creating earth object ...');
	const earth = await createEarth(gl);

	// Configure OpenGL state machine
	gl.useProgram(program);
	const positionAttribLocation = gl.getAttribLocation(program, 'vPosition');
	const texCoordAttribLocation = gl.getAttribLocation(program, 'vTexCoord');
	const normalAttribLocation = gl.getAttribLocation(program, 'vNormal');

	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.enable(gl.DEPTH_TEST);
	// c_neu = a_obj * c_obj + (1-a_obj) * c_fb
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	gl.enable(gl.BLEND);

	const matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
	const matViewUniformLocation = gl.getUniformLocation(program, 'mView');
	const matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

	const samplerDayLocation = gl.getUniformLocation(program, "sDay");
	gl.uniform1i(samplerDayLocation, 0);
	const samplerNightLocation = gl.getUniformLocation(program, "sNight");
	gl.uniform1i(samplerNightLocation, 1);
	const samplerOceanLocation = gl.getUniformLocation(program, "sOcean");
	gl.uniform1i(samplerOceanLocation, 2);
	const samplerCloudLocation = gl.getUniformLocation(program, "sClouds");
	gl.uniform1i(samplerCloudLocation, 3);

	const shiftUniformLocation = gl.getUniformLocation(program, "shift");

	const projMatrix = new Float32Array(16);
	mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);
	gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

	// Main render loop
	let angle = 0;
	const worldMatrix = new Float32Array(16);
	const viewMatrix = new Float32Array(16);
	const loop = function () {
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

		angle = performance.now() / 3000 / 2 * 2 * Math.PI;

		gl.uniform1f(shiftUniformLocation, angle/30);

		mat4.lookAt(viewMatrix, [0, 1, 7], [0, 0, 0], [0, 1, 0]);
		mat4.rotate(viewMatrix, viewMatrix, angle/4, [0, 1, 0]);
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);

		gl.depthMask(true);

		mat4.identity(worldMatrix);
		mat4.scale(worldMatrix, worldMatrix, [2.0, 2.0, 2.0]);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		earth.draw(positionAttribLocation, texCoordAttribLocation, normalAttribLocation);

		requestAnimationFrame(loop);
	};
	console.log('Entering rendering loop ...')
	requestAnimationFrame(loop);
};

window.onload = InitDemo;
