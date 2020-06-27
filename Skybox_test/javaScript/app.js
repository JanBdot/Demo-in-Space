"use strict";

window.onload = InitDemo;

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
	const textureSkybox = createSkyBoxTexture(gl);
	const textureSkyboxNoPointStars = createSkyBoxNoPointStarsTexture(gl);
	// const asteroidTexture = createAsteroidTexture(gl);

	// Create skybox
	console.log('Creating skybox ...');
	const skybox = createSkyBox(gl);
	skybox.texture = textureSkybox;
	skybox.program = await createShaderProgram(gl, './shaders/skybox_vert.glsl', './shaders/skybox_frag.glsl');
	if (!skybox.program) {
		console.error('Cannot run without shader program!');
		return;
	}

	// Create teapot object
	console.log('Creating teapot object ...');
	const teapot = await createTeapot(gl);
	teapot.texture = textureSkybox;
	teapot.program = await createShaderProgram(gl, './shaders/teapot_vert.glsl', './shaders/teapot_frag.glsl');
	if (!teapot.program) {
		console.error('Cannot run without shader program!');
		return;
	}

	// Create spaceship object
	console.log('Creating spaceship object ...');
	const spaceship = await createSpaceship(gl);
	spaceship.texture = textureSkyboxNoPointStars;
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
	
	let normalMapping = true;
	const showNormalMappingButton = document.getElementById('showNormalMappingButton');
	showNormalMappingButton.addEventListener("click", function() {
		if (normalMapping){
			showNormalMappingFunc(gl, asteroid.program, false);
			normalMapping = false;
		} else{
			showNormalMappingFunc(gl, asteroid.program, true);
			normalMapping = true;
		}
	});
	gl.useProgram(asteroid.program);
	showNormalMappingFunc(gl, asteroid.program, true);

	
	document.getElementById('createAsteroidButton1').addEventListener("click", function() {
		addAsteroidsToSeedList(seedList, 1);
	});
	document.getElementById('createAsteroidButton10').addEventListener("click", function() {
		addAsteroidsToSeedList(seedList, 10);
	});
	document.getElementById('createAsteroidButton100').addEventListener("click", function() {
		addAsteroidsToSeedList(seedList, 100);
	});
	document.getElementById('createAsteroidButton1000').addEventListener("click", function() {
		addAsteroidsToSeedList(seedList, 1000);
	});
	document.getElementById('createAsteroidButton10000').addEventListener("click", function() {
		addAsteroidsToSeedList(seedList, 10000);
	});
	document.getElementById('clearAsteroids').addEventListener("click", function() {
		seedList.length = 0;
		
	});

	// Create earth objects
	console.log('Creating earth objects ...');
	const earth = await createEarth(gl);
	// earth.texture = texture;
	earth.program = await createShaderProgram(gl, './shaders/earth_vert.glsl', './shaders/earth_frag.glsl');
	if (!asteroid.program) {
		console.error('earth Cannot run without shader program!');
		return;
	}

	// Configure OpenGL state machine
	gl.clearColor(0.0, 0.0, 0.0, 0.0);
	// gl.enable(gl.DEPTH_TEST);
	// gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	// gl.enable(gl.BLEND);
	
	// init Main render loop
	const worldMatrix = new Float32Array(16);
	const viewMatrix = new Float32Array(16);
	const projMatrix = new Float32Array(16);
	const normalMatrix = new Float32Array(9);
	mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);

	
	const seedList = [];

	
	// Main render loop
	const loop = function () {
		// Viewmatrix
		const angle = performance.now() / 3000 / 6 * 2 * Math.PI;
		
		var camPoAbsVal= Math.sqrt((mouseXposition*mouseXposition)+(mouseYposition*mouseYposition)+15*15);
		var cameraPosition = [camDistance*mouseXposition/camPoAbsVal, camDistance*mouseYposition/camPoAbsVal, camDistance*15/camPoAbsVal];
		
		
		mat4.lookAt(viewMatrix, cameraPosition, [0, 0, 0], [0, 1, 0]);
		mat4.rotate(worldMatrix, worldMatrix, angle/4, [0, 1, 0]);
		// mat4.lookAt(viewMatrix, [0, 3, 100], [0, 10, 0], [0, 1, 0]);
		// mat4.rotate(viewMatrix, viewMatrix, angle/50, [0, 1, 0]);
		// mat4.rotate(viewMatrix, viewMatrix, angle/3, [0, 0, 1]);
		
		// clear framebuffer
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
		
		// draw skybox
		// gl.depthMask(false);
		gl.disable(gl.DEPTH_TEST);


		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		// Draw Skybox
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		gl.useProgram(skybox.program);
		
		let matProjUniformLocation = gl.getUniformLocation(skybox.program, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
		
		let matViewUniformLocation = gl.getUniformLocation(skybox.program, 'mView');
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
		
		mat4.identity(worldMatrix);
		let matWorldUniformLocation = gl.getUniformLocation(skybox.program, 'mWorld');
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		
		skybox.draw(textureSkybox);
		// ########################################################################
		// ########################################################################
		
		
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		// Draw Spaceship
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
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
		// ########################################################################
		// ########################################################################
		
		
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		// Draw Earth
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		gl.useProgram(earth.program);
		
		const samplerDayLocation = gl.getUniformLocation(earth.program, "sDay");
		gl.uniform1i(samplerDayLocation, 0);
		const samplerNightLocation = gl.getUniformLocation(earth.program, "sNight");
		gl.uniform1i(samplerNightLocation, 1);
		const samplerOceanLocation = gl.getUniformLocation(earth.program, "sOcean");
		gl.uniform1i(samplerOceanLocation, 2);
		const samplerCloudLocation = gl.getUniformLocation(earth.program, "sClouds");
		gl.uniform1i(samplerCloudLocation, 3);
		
		const shiftUniformLocation = gl.getUniformLocation(earth.program, 'shift');
		gl.uniform1f(shiftUniformLocation, angle/90);
		
		matProjUniformLocation = gl.getUniformLocation(earth.program, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
		
		matViewUniformLocation = gl.getUniformLocation(earth.program, 'mView');
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
		
		matWorldUniformLocation = gl.getUniformLocation(earth.program, 'mWorld');
		
		mat4.identity(worldMatrix);
		mat4.translate(worldMatrix, worldMatrix, [0.0, 0.0, -200.0]);
		mat4.scale(worldMatrix, worldMatrix, [100.0, 100.0, 100.0]);
		mat4.rotate(worldMatrix, worldMatrix, angle/8, [0, -1, 0]);
		
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		earth.draw();
		// ########################################################################
		// ########################################################################
		
		
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		// Draw Asteroid
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		gl.useProgram(asteroid.program);
		
		matProjUniformLocation = gl.getUniformLocation(asteroid.program, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
		
		matViewUniformLocation = gl.getUniformLocation(asteroid.program, 'mView');
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
		
		matWorldUniformLocation = gl.getUniformLocation(asteroid.program, 'mWorld');
		
		const matNormalUniformLocation = gl.getUniformLocation(asteroid.program, 'mNormal');

		const lightAmbientLoc = gl.getUniformLocation(asteroid.program, "light.ambient");
		const lightDiffuseLoc = gl.getUniformLocation(asteroid.program, "light.diffuse");
		const lightSpecularLoc = gl.getUniformLocation(asteroid.program, "light.specular");
		const lightPosLoc = gl.getUniformLocation(asteroid.program, "light.position");
		gl.uniform3f(lightAmbientLoc, 2.0, 2.0, 2.0);
		gl.uniform3f(lightDiffuseLoc, 0.5, 0.5, 0.5);
		gl.uniform3f(lightSpecularLoc, 0.4, 0.4, 0.4);
		let lampPos = [1.0, 0.0, 0.2];
		gl.uniform3f(lightPosLoc, lampPos.x, lampPos.y, lampPos.z);
		
		seedList.forEach(asteroidSeed => {			
			mat4.identity(worldMatrix);		
			mat4.multiply(worldMatrix, worldMatrix, createRandomPositionAstroid(-200.0, angle, asteroidSeed));
			gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
			
			// const matNormalUniformLocation = gl.getUniformLocation(asteroid.program, 'mNormal');
			mat4.invert(worldMatrix, worldMatrix);
			mat4.transpose(worldMatrix, worldMatrix);
			mat3.fromMat4(normalMatrix, worldMatrix);
			gl.uniformMatrix3fv(matNormalUniformLocation, gl.FALSE, normalMatrix);
			
			asteroid.draw();			
		});
		// ########################################################################
		// ########################################################################
		
		requestAnimationFrame(loop);
	};

	console.log('Entering rendering loop ...')
	requestAnimationFrame(loop);
}