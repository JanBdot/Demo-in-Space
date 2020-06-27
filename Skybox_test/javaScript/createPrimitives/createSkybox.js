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

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);

		gl.enableVertexAttribArray(positionAttribLocation);
		gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
		gl.disableVertexAttribArray(positionAttribLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	}


	return box;
}

function createSkyBoxTexture(gl) {
	const texture0 = gl.createTexture();
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture0);
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

	return texture0;
}

function createSkyBoxNoPointStarsTexture(gl) {
	const texture1 = gl.createTexture();
	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture1);
	gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X,
		0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		document.getElementById('sbNoPointStars-right'));
	gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
		0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		document.getElementById('sbNoPointStars-left'));
	gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
		0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		document.getElementById('sbNoPointStars-top'));
	gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
		0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		document.getElementById('sbNoPointStars-bottom'));
	gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
		0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		document.getElementById('sbNoPointStars-front'));
	gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
		0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		document.getElementById('sbNoPointStars-back'));



	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	// gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE); 

	gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

	return texture1;
}