/*
Fragen:
Wann müssen die Funktionen async sein?
- Wenn ich auf etwas in einer anderen Funktion angwiesen bin (z.B. Texture), darf die Funktion in der die Textur erstellt wird nicht async sein?
*/

"use strict";

window.onload = InitDemo;

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

function createSkyBoxTexture(gl) {
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

	gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

	return texture;
}

function createSkyBox(gl) {
	const box = {};

	var vertices =
	[ // X, Y, Z
		-1.0,  1.0, -1.0,  // 0
		-1.0,  1.0,  1.0,  // 1
		 1.0,  1.0,  1.0,  // 2
		 1.0,  1.0, -1.0,  // 3
		-1.0, -1.0, -1.0,  // 4
		-1.0, -1.0,  1.0,  // 5
		 1.0, -1.0,  1.0,  // 6
		 1.0, -1.0, -1.0,  // 7
	];

	var indices =
	[
		6, 2, 5,   1, 5, 2,   // front
		0, 1, 2,   0, 2, 3,   // top
		5, 1, 4,   4, 1, 0,   // left
		2, 6, 7,   2, 7, 3,   // right
		3, 7, 4,   3, 4, 0,   // back
		5, 4, 6,   6, 4, 7    // bottom
	];

	box.vertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, box.vertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	box.indexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, box.indexBufferObject);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	box.draw = function() {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBufferObject);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBufferObject);
		const positionAttribLocation = gl.getAttribLocation(this.program, 'vPosition');
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

// async function createEarth(gl){
// 	const earth = {};

// 	const vertices = await fetchModel('earth.obj');

// 	earth.vertexBufferObject = gl.createBuffer();
// 	gl.bindBuffer(gl.ARRAY_BUFFER, earth.vertexBufferObject);
// 	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
// 	gl.bindBuffer(gl.ARRAY_BUFFER, null);

// 	earth.texture0 = gl.createTexture();
// 	gl.activeTexture(gl.TEXTURE0);
// 	gl.bindTexture(gl.TEXTURE_2D, earth.texture0);
// 	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
// 	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
// 	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("earth-albedo"));
// 	gl.generateMipmap(gl.TEXTURE_2D);
// 	gl.bindTexture(gl.TEXTURE_2D, null);

// 	earth.texture1 = gl.createTexture();
// 	gl.activeTexture(gl.TEXTURE1);
// 	gl.bindTexture(gl.TEXTURE_2D, earth.texture1);
// 	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
// 	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
// 	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("earth-clouds"));
// 	gl.generateMipmap(gl.TEXTURE_2D);
// 	gl.bindTexture(gl.TEXTURE_2D, null);

// 	earth.texture2 = gl.createTexture();
// 	gl.activeTexture(gl.TEXTURE2);
// 	gl.bindTexture(gl.TEXTURE_2D, earth.texture2);
// 	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
// 	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
// 	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("earth-night-lights"));
// 	gl.generateMipmap(gl.TEXTURE_2D);
// 	gl.bindTexture(gl.TEXTURE_2D, null);

// 	earth.texture3 = gl.createTexture();
// 	gl.activeTexture(gl.TEXTURE3);
// 	gl.bindTexture(gl.TEXTURE_2D, earth.texture3);
// 	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
// 	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
// 	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("earth-ocean-mask"));
// 	gl.generateMipmap(gl.TEXTURE_2D);
// 	gl.bindTexture(gl.TEXTURE_2D, null);

// 	earth.draw = function(positionAttribLocation, texCoordAttribLocation, normalAttribLocation) {
// 		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBufferObject);
// 		gl.vertexAttribPointer(
// 			positionAttribLocation, // Attribute location
// 			3, // Number of elements per attribute
// 			gl.FLOAT, // Type of elements
// 			gl.FALSE,
// 			8 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
// 			0 // Offset from the beginning of a single vertex to this attribute
// 		);
// 		gl.vertexAttribPointer(
// 			texCoordAttribLocation, // Attribute location
// 			2, // Number of elements per attribute
// 			gl.FLOAT, // Type of elements
// 			gl.FALSE,
// 			8 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
// 			3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
// 		);
// 		gl.vertexAttribPointer(
// 			normalAttribLocation, // Attribute location
// 			3, // Number of elements per attribute
// 			gl.FLOAT, // Type of elements
// 			gl.FALSE,
// 			8 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
// 			5 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
// 		);

// 		gl.activeTexture(gl.TEXTURE0);
// 		gl.bindTexture(gl.TEXTURE_2D, earth.texture0);
// 		gl.activeTexture(gl.TEXTURE1);
// 		gl.bindTexture(gl.TEXTURE_2D, earth.texture1);
// 		gl.activeTexture(gl.TEXTURE2);
// 		gl.bindTexture(gl.TEXTURE_2D, earth.texture2);
// 		gl.activeTexture(gl.TEXTURE3);
// 		gl.bindTexture(gl.TEXTURE_2D, earth.texture3);

// 		gl.enableVertexAttribArray(positionAttribLocation);
// 		gl.enableVertexAttribArray(texCoordAttribLocation);
// 		gl.enableVertexAttribArray(normalAttribLocation);

// 		gl.drawArrays(gl.TRIANGLES, 0, vertices.length/8);
		
// 		gl.disableVertexAttribArray(positionAttribLocation);
// 		gl.disableVertexAttribArray(texCoordAttribLocation);
// 		gl.disableVertexAttribArray(normalAttribLocation);
// 		gl.bindBuffer(gl.ARRAY_BUFFER, null);
// 	}
// 	return earth;
// }

async function createSpaceship(gl) {
	let spaceship = {};

	const vertices = await fetchModel('./objects/cosmos-spaceship.obj')

	spaceship.vertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, spaceship.vertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	spaceship.draw = function() {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBufferObject);

		const positionAttribLocation = gl.getAttribLocation(this.program, 'vPosition');
		gl.vertexAttribPointer(
			positionAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			8 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			0 // Offset from the beginning of a single vertex to this attribute
		);
		gl.enableVertexAttribArray(positionAttribLocation);

		const normalAttribLocation = gl.getAttribLocation(this.program, 'vNormal');
		gl.vertexAttribPointer(
			normalAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			8 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			5 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
		);
		gl.enableVertexAttribArray(normalAttribLocation);

		gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);

		gl.drawArrays(gl.TRIANGLES, 0, vertices.length/8);

		gl.disableVertexAttribArray(positionAttribLocation);
		gl.disableVertexAttribArray(normalAttribLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}

	return spaceship;
}

async function createTeapot(gl) {
	let teapot = {};

	const vertices = await fetchModel('./objects/teapot.obj');

	teapot.vertexBufferObject = gl.createBuffer(); // createBuffer() erstellt und initialisiert einen WebGLBuffer, der Daten wie vertices und Farbe speichert
	// vertexBufferObject ist ein OpenGL feature, das Methoden zum zur Verfügung stellt um vertex data hochzuladen (position, normal, vecotr, color, etc.)
	gl.bindBuffer(gl.ARRAY_BUFFER, teapot.vertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	teapot.draw = function() {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBufferObject);

		const positionAttribLocation = gl.getAttribLocation(this.program, 'vPosition');
		gl.vertexAttribPointer(
			positionAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			8 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			0 // Offset from the beginning of a single vertex to this attribute
		);
		gl.enableVertexAttribArray(positionAttribLocation);

		const normalAttribLocation = gl.getAttribLocation(this.program, 'vNormal');
		gl.vertexAttribPointer(
			normalAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			8 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			5 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
		);
		gl.enableVertexAttribArray(normalAttribLocation);

		gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
				
		gl.drawArrays(gl.TRIANGLES, 0, vertices.length/8);
		
		gl.disableVertexAttribArray(positionAttribLocation);
		gl.disableVertexAttribArray(normalAttribLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}
	return teapot;
}

// async function createBox(gl) {
// 	var box = {};

// 	var boxVertices = 
// 	[ // X, Y, Z           U, V
// 		// Top
// 		-1.0, 1.0, -1.0,   0, 0,
// 		-1.0, 1.0, 1.0,    0, 1,
// 		1.0, 1.0, 1.0,     1, 1,
// 		1.0, 1.0, -1.0,    1, 0,

// 		// Left
// 		-1.0, 1.0, 1.0,    0, 0,
// 		-1.0, -1.0, 1.0,   1, 0,
// 		-1.0, -1.0, -1.0,  1, 1,
// 		-1.0, 1.0, -1.0,   0, 1,

// 		// Right
// 		1.0, 1.0, 1.0,    1, 1,
// 		1.0, -1.0, 1.0,   0, 1,
// 		1.0, -1.0, -1.0,  0, 0,
// 		1.0, 1.0, -1.0,   1, 0,

// 		// Front
// 		1.0, 1.0, 1.0,    1, 1,
// 		1.0, -1.0, 1.0,    1, 0,
// 		-1.0, -1.0, 1.0,    0, 0,
// 		-1.0, 1.0, 1.0,    0, 1,

// 		// Back
// 		1.0, 1.0, -1.0,    0, 0,
// 		1.0, -1.0, -1.0,    0, 1,
// 		-1.0, -1.0, -1.0,    1, 1,
// 		-1.0, 1.0, -1.0,    1, 0,

// 		// Bottom
// 		-1.0, -1.0, -1.0,   1, 1,
// 		-1.0, -1.0, 1.0,    1, 0,
// 		1.0, -1.0, 1.0,     0, 0,
// 		1.0, -1.0, -1.0,    0, 1
// 	];

// 	var boxIndices =
// 	[
// 		// Top
// 		0, 1, 2,
// 		0, 2, 3,

// 		// Left
// 		5, 4, 6,
// 		6, 4, 7,

// 		// Right
// 		8, 9, 10,
// 		8, 10, 11,

// 		// Front
// 		13, 12, 14,
// 		15, 14, 12,

// 		// Back
// 		16, 17, 18,
// 		16, 18, 19,

// 		// Bottom
// 		21, 20, 22,
// 		22, 20, 23
// 	];

// 	box.vertexBufferObject = gl.createBuffer();
// 	gl.bindBuffer(gl.ARRAY_BUFFER, box.vertexBufferObject);
// 	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);
// 	gl.bindBuffer(gl.ARRAY_BUFFER, null);

// 	box.indexBufferObject = gl.createBuffer();
// 	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, box.indexBufferObject);
// 	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl.STATIC_DRAW);
// 	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

// 	box.texture0 = gl.createTexture();
// 	gl.activeTexture(gl.TEXTURE0);
// 	gl.bindTexture(gl.TEXTURE_2D, box.texture0);
// 	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
// 	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
// 	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("crate-image"));
// 	gl.generateMipmap(gl.TEXTURE_2D);
// 	gl.bindTexture(gl.TEXTURE_2D, null);

// 	box.draw = function() {
// 		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBufferObject);
// 		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBufferObject);

// 		const positionAttribLocation = gl.getAttribLocation(this.program, 'vPosition');
// 		gl.vertexAttribPointer(
// 			positionAttribLocation, // Attribute location
// 			3, // Number of elements per attribute
// 			gl.FLOAT, // Type of elements
// 			gl.FALSE,
// 			5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
// 			0 // Offset from the beginning of a single vertex to this attribute
// 			);
// 		gl.enableVertexAttribArray(positionAttribLocation);

// 		const texCoordAtrribLocation = gl.getAttribLocation(this.program, 'vTexCoord');
// 		gl.vertexAttribPointer(
// 			texCoordAtrribLocation, // Attribute location
// 			2, // Number of elements per attribute
// 			gl.FLOAT, // Type of elements
// 			gl.FALSE,
// 			5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
// 			3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
// 			);
// 		gl.enableVertexAttribArray(texCoordAtrribLocation);
		
// 		gl.activeTexture(gl.TEXTURE0);
// 		gl.bindTexture(gl.TEXTURE_2D, box.texture0);
		
// 		const samplerUniformLocation = gl.getUniformLocation(this.program, 'sampler');
// 		gl.uniform1i(samplerUniformLocation, 0);
		

// 		gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0);
// 		// gl.drawArrays(gl.TRIANGLES, 0, boxVertices.length/5);

// 		gl.disableVertexAttribArray(positionAttribLocation);
// 		gl.disableVertexAttribArray(texCoordAtrribLocation);
// 		gl.bindBuffer(gl.ARRAY_BUFFER, null);
// 		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
// 	}
// 	return box;
// }

async function createAsteroid(gl) {
	var asteroid = {};

	const vertices = await fetchModel('./objects/asteroid.obj')

	asteroid.vertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, asteroid.vertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	asteroid.texture0 = gl.createTexture();
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, asteroid.texture0);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("asteroid-base"));
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);

	asteroid.texture1 = gl.createTexture();
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, asteroid.texture1);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("asteroid-normal"));
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);

	asteroid.texture2 = gl.createTexture();
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, asteroid.texture2);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("asteroid-roughness"));
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);

	asteroid.texture3 = gl.createTexture();
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, asteroid.texture3);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("asteroid-ambient"));
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);

	asteroid.texture4 = gl.createTexture();
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, asteroid.texture4);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("asteroid-height"));
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);

	asteroid.draw = function() {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBufferObject);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBufferObject);

		const positionAttribLocation = gl.getAttribLocation(this.program, 'vPosition');
		const texCoordAttribLocation = gl.getAttribLocation(this.program, 'vTexCoord');
		const normalAttribLocation = gl.getAttribLocation(this.program, 'vNormal');
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
			
		gl.enableVertexAttribArray(positionAttribLocation);
		gl.enableVertexAttribArray(texCoordAttribLocation);
		gl.enableVertexAttribArray(normalAttribLocation);

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, asteroid.texture0);
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, asteroid.texture1);
		gl.activeTexture(gl.TEXTURE2);
		gl.bindTexture(gl.TEXTURE_2D, asteroid.texture2);
		gl.activeTexture(gl.TEXTURE3);
		gl.bindTexture(gl.TEXTURE_2D, asteroid.texture3);
		gl.activeTexture(gl.TEXTURE4);
		gl.bindTexture(gl.TEXTURE_2D, asteroid.texture4);
		
		const samplerBaseLocation = gl.getUniformLocation(this.program, 'sBase');
		gl.uniform1i(samplerBaseLocation, 0);
		const samplerNormalLocation = gl.getUniformLocation(this.program, 'sNormal');
		gl.uniform1i(samplerNormalLocation, 1);
		const samplerRoughnessLocation = gl.getUniformLocation(this.program, 'sRoughness');
		gl.uniform1i(samplerRoughnessLocation, 2);
		const samplerAmbientLocation = gl.getUniformLocation(this.program, 'sAmbient');
		gl.uniform1i(samplerAmbientLocation, 3);
		const samplerHeightLocation = gl.getUniformLocation(this.program, 'sHeight');
		gl.uniform1i(samplerHeightLocation, 4);
		
		gl.drawArrays(gl.TRIANGLES, 0, vertices.length/5);

		gl.disableVertexAttribArray(positionAttribLocation);
		gl.disableVertexAttribArray(texCoordAttribLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	}
	return asteroid;
}

function createAsteroidTexture(gl) {
	const asteroidTexture = gl.createTexture();

	gl.activeTexture(TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, asteroidTexture);		
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);	
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		document.getElementById('crate-image'));
	gl.generateMipmap(gl.TEXTURE_2D);	

	gl.bindTexture(gl.TEXTURE_2D, null);

	return asteroidTexture;
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

	// Create textures
	const texture = createSkyBoxTexture(gl);
	// const asteroidTexture = createAsteroidTexture(gl);

	// Create skybox
	console.log('Creating skybox ...');
	const skybox = createSkyBox(gl);
	skybox.texture = texture;
	skybox.program = await createShaderProgram(gl, './shaders/skybox_vert.glsl', './shaders/skybox_frag.glsl');
	if (!skybox.program) {
		console.error('Cannot run without shader program!');
		return;
	}

	// Create teapot object
	console.log('Creating teapot object ...');
	const teapot = await createTeapot(gl);
	teapot.texture = texture;
	teapot.program = await createShaderProgram(gl, './shaders/teapot_vert.glsl', './shaders/teapot_frag.glsl');
	if (!teapot.program) {
		console.error('Cannot run without shader program!');
		return;
	}

	// Create spaceship object
	console.log('Creating spaceship object ...');
	const spaceship = await createSpaceship(gl);
	spaceship.texture = texture;
	spaceship.program = await createShaderProgram(gl, './shaders/spaceship_vert.glsl', './shaders/spaceship_frag.glsl');
	if (!spaceship.program) {
		console.error('spaceship Cannot run without shader program!');
		return;
	}

	// // Create box
	// console.log('Creating box object ... ');
	// const box = await createBox(gl);
	// // box.texture = asteroidTexture;
	// box.program = await createShaderProgram(gl, './shaders/asteroid_vert.glsl', './shaders/asteroid_frag.glsl');
	// if (!box.program) {
	// 	console.error('box Cannot run without shader program!');
	// 	return;
	// }

	// Create asteroid
	console.log('Creating asteroid object ... ');
	const asteroid = await createAsteroid(gl);
	// asteroid.texture = asteroidTexture;
	asteroid.program = await createShaderProgram(gl, './shaders/asteroid_vert.glsl', './shaders/asteroid_frag.glsl');
	if (!asteroid.program) {
		console.error('asteroid Cannot run without shader program!');
		return;
	}

	// // Create earth objects
	// console.log('Creating earth objects ...');
	// const earth = await createEarth(gl);
	// earth.texture = texture;
	// earth.program = await createShaderProgram

	// Configure OpenGL state machine
	gl.clearColor(0.0, 0.0, 0.0, 0.0);
	// gl.enable(gl.DEPTH_TEST);
	// gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	// gl.enable(gl.BLEND);
	
	// init Main render loop
	const worldMatrix = new Float32Array(16);
	const viewMatrix = new Float32Array(16);
	const projMatrix = new Float32Array(16);
	mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);
	
	// Main render loop
	const loop = function () {
		// Viewmatrix
		const angle = performance.now() / 1000 / 6 * 2 * Math.PI;
		mat4.lookAt(viewMatrix, [0, 3, 15], [0, 0, 0], [0, 1, 0]);
		mat4.rotate(viewMatrix, viewMatrix, angle/4, [0, 1, 0]);
		// mat4.lookAt(viewMatrix, [0, 3, 100], [0, 10, 0], [0, 1, 0]);
		// mat4.rotate(viewMatrix, viewMatrix, angle/50, [0, 1, 0]);
		// mat4.rotate(viewMatrix, viewMatrix, angle/3, [0, 0, 1]);

		// clear framebuffer
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

		// draw skybox
		// gl.depthMask(false);
		gl.disable(gl.DEPTH_TEST);
		gl.useProgram(skybox.program);

		let matProjUniformLocation = gl.getUniformLocation(skybox.program, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

		let matViewUniformLocation = gl.getUniformLocation(skybox.program, 'mView');
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
		
		mat4.identity(worldMatrix);
		let matWorldUniformLocation = gl.getUniformLocation(skybox.program, 'mWorld');
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

		skybox.draw();

		// draw spaceship
		gl.enable(gl.DEPTH_TEST);
		gl.useProgram(spaceship.program);

		const invViewMatrix = mat3.create();
		mat3.fromMat4(invViewMatrix, viewMatrix);
		mat3.invert(invViewMatrix, invViewMatrix); // repräsentiert die Inverse der Koordinatenachse von der ViewMatrix (Kameraorientierung)
		const eyeDir = vec3.fromValues(0.0, 0.0, 1.0);
		vec3.transformMat3(eyeDir, eyeDir, invViewMatrix);
		let eyeDirUniformLocation = gl.getUniformLocation(spaceship.program, 'eyeDir');
		gl.uniform3fv(eyeDirUniformLocation, eyeDir);
		// console.log("EyeDir: " + eyeDir);

		matProjUniformLocation = gl.getUniformLocation(spaceship.program, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

		matViewUniformLocation = gl.getUniformLocation(spaceship.program, 'mView');
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);

		mat4.identity(worldMatrix);
		matWorldUniformLocation = gl.getUniformLocation(spaceship.program, 'mWorld');
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

		spaceship.draw();
		
		// // Draw box
		// gl.useProgram(box.program);
		// mat4.identity(worldMatrix);
		// mat4.translate(worldMatrix, worldMatrix, [3.0, 0.0, 3.0]);

		// matProjUniformLocation = gl.getUniformLocation(box.program, 'mProj');
		// gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
		
		// matViewUniformLocation = gl.getUniformLocation(box.program, 'mView');
		// gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);

		// matWorldUniformLocation = gl.getUniformLocation(box.program, 'mWorld');
		// gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

		// box.draw();

		// Draw Asteroid
		gl.useProgram(asteroid.program);
		
		const shiftUniformLocation = gl.getUniformLocation(asteroid.program, "shift");
		gl.uniform1f(shiftUniformLocation, angle/30);

		mat4.identity(worldMatrix);
		mat4.translate(worldMatrix, worldMatrix, [3.0, 0.0, 3.0]);

		matProjUniformLocation = gl.getUniformLocation(asteroid.program, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
		
		matViewUniformLocation = gl.getUniformLocation(asteroid.program, 'mView');
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);

		matWorldUniformLocation = gl.getUniformLocation(asteroid.program, 'mWorld');
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

		asteroid.draw();

		requestAnimationFrame(loop);
	};

	console.log('Entering rendering loop ...')
	requestAnimationFrame(loop);
}