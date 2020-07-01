async function createSpotlight(gl) {
	let spotlight = {};

	const vertices = await fetchModel('./objects/spotlight.obj')

	spotlight.vertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, spotlight.vertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	spotlight.draw = function() {
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

		//gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
		var colorAttribLocation = gl.getAttribLocation(this.program, 'vColor');
		gl.vertexAttrib4f(colorAttribLocation, 1.0, 1.0, 1.0, 1.0);

		/* var cAmbientUniformLocation = gl.getUniformLocation(this.program, 'cAmbient');
		gl.uniform3f(cAmbientUniformLocation, 0.23, 0.09, 0.03);

		var cDiffuseUniformLocation = gl.getUniformLocation(this.program, 'cDiffuse');
		gl.uniform3f(cDiffuseUniformLocation, 0.55, 0.21, 0.07);

		var cSpecularUniformLocation = gl.getUniformLocation(this.program, 'cSpecular');
		gl.uniform3f(cSpecularUniformLocation, 0.58, 0.22, 0.07);

		var alphaUniformLocation = gl.getUniformLocation(this.program, 'alpha');
		gl.uniform1f(alphaUniformLocation, 51.2); */
		
		gl.drawArrays(gl.TRIANGLES, 0, vertices.length/8);

		gl.disableVertexAttribArray(positionAttribLocation);
		gl.disableVertexAttribArray(normalAttribLocation);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		gl.enable(gl.BLEND);
		//gl.disable(gl.DEPTH_TEST);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}

	return spotlight;
}