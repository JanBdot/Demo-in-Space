async function createTextureBox(gl, texture2, texture3) {
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

	box.texture2 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, box.texture2);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture2);
    gl.generateMipmap(gl.TEXTURE_2D);	
    gl.bindTexture(gl.TEXTURE_2D, null);
    
	box.texture3 = gl.createTexture();
	gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, box.texture3);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture3);
    gl.generateMipmap(gl.TEXTURE_2D);	
	gl.bindTexture(gl.TEXTURE_2D, null);

	box.draw = function() {
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
			5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			0 // Offset from the beginning of a single vertex to this attribute
		);
		gl.enableVertexAttribArray(positionAttribLocation);

		gl.vertexAttribPointer(
			texCoordAttribLocation, // Attribute location
			2, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
		);
		gl.enableVertexAttribArray(texCoordAttribLocation);

		const diffuseUniformLocation = gl.getUniformLocation(this.program, 'diffuseMap');
		const normalMapUniformLocation = gl.getUniformLocation(this.program, 'normalMap');

		gl.activeTexture(gl.TEXTURE2);
		gl.bindTexture(gl.TEXTURE_2D, box.texture2);
        
		gl.activeTexture(gl.TEXTURE3);
        gl.bindTexture(gl.TEXTURE_2D, box.texture3);
        
        gl.uniform1i(diffuseUniformLocation, 2);
		gl.uniform1i(normalMapUniformLocation, 3);

		gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
		
		gl.disableVertexAttribArray(positionAttribLocation);
		gl.disableVertexAttribArray(texCoordAttribLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
	return box;
}