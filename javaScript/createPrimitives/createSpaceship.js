async function createSpaceship(gl) {
	let spaceship = {};

	// const vertices = await fetchModel('./objects/box.obj')
	const vertices = await fetchModel('./objects/spaceship-body.obj')

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

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);

		gl.drawArrays(gl.TRIANGLES, 0, vertices.length/8);

		gl.disableVertexAttribArray(positionAttribLocation);
		gl.disableVertexAttribArray(normalAttribLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}

	return spaceship;
}

function createSceneTexture(gl, framebuffer0, framebuffer1, framebuffer2, framebuffer3, framebuffer4, framebuffer5) {
	const texture = gl.createTexture();
	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

	gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer0);
	gl.copyTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, 0, 0, 1024, 1024, 0);
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	
	gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer1);
	gl.copyTexImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, 0, 0, 1024, 1024, 0);
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	
	gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer2);
	gl.copyTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, 0, 0, 1024, 1024, 0);
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	
	gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer3);
	gl.copyTexImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, 0, 0, 1024, 1024, 0);
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	
	gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer4);
	gl.copyTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, 0, 0, 1024, 1024, 0);
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	
	gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer5);
	gl.copyTexImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, 0, 0, 1024, 1024, 0);
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);


	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

	return texture;
}