// async function createPlane(gl) {
// 	var plane = {};

// 	var vertices =
// 	[  //  X,    Y,   Z
// 		1.0, -1.0, 0.0,     1.0, -1.0, 0.0,
// 		1.0,  1.0, 0.0,     1.0,  1.0, 0.0,
// 		-1.0, -1.0, 0.0,    -1.0, -1.0, 0.0,
// 		-1.0,  1.0, 0.0,    -1.0,  1.0, 0.0,
// 		-1.0, -1.0, 0.0,    -1.0, -1.0, 0.0,
// 		1.0,  1.0, 0.0,     1.0,  1.0, 0.0
// 	];

// 	plane.vertexBufferObject = gl.createBuffer();
// 	gl.bindBuffer(gl.ARRAY_BUFFER, plane.vertexBufferObject);
// 	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
// 	gl.bindBuffer(gl.ARRAY_BUFFER, null);

// 	plane.draw = function() {
//         gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBufferObject);
        
// 		const positionAttribLocation = gl.getAttribLocation(this.program, 'vPosition');
// 		gl.vertexAttribPointer(
//             positionAttribLocation, // Attribute location
// 			3, // Number of elements per attribute
// 			gl.FLOAT, // Type of elements
// 			gl.FALSE,
// 			6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
// 			0 // Offset from the beginning of a single vertex to this attribute
//             );
//         const normalAttribLocation = gl.getAttribLocation(this.program, 'vNormal');
//         gl.vertexAttribPointer(
//             normalAttribLocation, // Attribute location
//             3, // Number of elements per attribute
//             gl.FLOAT, // Type of elements
//             gl.FALSE,
//             6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
//             3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
//             );

//         gl.enableVertexAttribArray(positionAttribLocation);
//         gl.enableVertexAttribArray(normalAttribLocation);

//         var colorAttribLocation = gl.getAttribLocation(this.program, 'vColor');
// 		gl.vertexAttrib4f(colorAttribLocation, 0.0, 1.0, 0.0, 1.0);
        
//         gl.drawArrays(gl.TRIANGLES, 0, vertices.length/3);
        
// 		gl.disableVertexAttribArray(positionAttribLocation);
// 		gl.disableVertexAttribArray(normalAttribLocation);
// 		gl.bindBuffer(gl.ARRAY_BUFFER, null);
// 	}
// 	return plane;
// }