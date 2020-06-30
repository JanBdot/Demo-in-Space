async function createStrTest(gl, textureID, modelID) {
	var asteroid = {};

	const textureIDtext = getTextureIDtext(textureID);
	const vertices = await fetchModel('./objects/asteroid' + modelID + '.obj');

	asteroid.vertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, asteroid.vertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	asteroid.texture0 = gl.createTexture();
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, asteroid.texture0);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById(textureIDtext.diffuse));
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);

	asteroid.texture1 = gl.createTexture();
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, asteroid.texture1);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById(textureIDtext.normal));
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);

	asteroid.draw = function() {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBufferObject);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBufferObject);

		//var colorAttribLocation = gl.getAttribLocation(this.program, 'vColor');
		//gl.vertexAttrib4f(colorAttribLocation, 1.0, 1.0, 1.0, 1.0);

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
		
		const samplerBaseLocation = gl.getUniformLocation(this.program, 'sBase');
		gl.uniform1i(samplerBaseLocation, 0);
		const samplerNormalLocation = gl.getUniformLocation(this.program, 'sNormal');
		gl.uniform1i(samplerNormalLocation, 1);
		
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
