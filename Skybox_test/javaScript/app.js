"use strict";

const numberOfAsteroidTextures = 3;
const numberOfAsteroidModels = 4;

window.onload = InitDemo;

async function InitDemo() {

	// Get WebGL context
	console.log('Getting WebGL context ...');
	const canvas = document.getElementById('cg1-canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
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

	// List with all programs (everytime a program is created, push to list)
	const programList = [];

	// Create skybox
	console.log('Creating skybox ...');
	const skybox = createSkyBox(gl);
	skybox.texture = textureSkybox;
	skybox.program = await createShaderProgram(gl, './shaders/skybox_vert.glsl', './shaders/skybox_frag.glsl');
	if (!skybox.program) {
		console.error('Cannot run without shader program!');
		return;
	}
	programList.push(skybox.program);

	// Create teapot object
	console.log('Creating teapot object ...');
	const teapot = await createTeapot(gl);
	teapot.texture = textureSkybox;
	teapot.program = await createShaderProgram(gl, './shaders/teapot_vert.glsl', './shaders/teapot_frag.glsl');
	if (!teapot.program) {
		console.error('Cannot run without shader program!');
		return;
	}
	programList.push(teapot.program);


	// Create spaceship object
	console.log('Creating spaceship object ...');
	const spaceship = await createSpaceship(gl);
	spaceship.texture = textureSkyboxNoPointStars;
	spaceship.program = await createShaderProgram(gl, './shaders/spaceship_vert.glsl', './shaders/spaceship_frag.glsl');
	if (!spaceship.program) {
		console.error('spaceship Cannot run without shader program!');
		return;
	}
	programList.push(spaceship.program);
	
	// Create Testbox
	console.log('Create Testbox ...');
	const testBox = await createTextureBox(gl, document.getElementById('testbox-diffuse'), document.getElementById('testbox-normal'));
	testBox.program = await createShaderProgram(gl, './test/testShaders/simpleNormalVert.glsl', './test/testShaders/simpleNormalFrag.glsl');
	if (!testBox.program) {
		console.error('testBox Cannot run without shader program!');
		return;
	}
	programList.push(testBox.program);
	


	// Create Cockpit object
	console.log('Creating Cockpit object ...');
	const cockpit = await createCockpit(gl);
	//cockpit.texture = textureSkyboxNoPointStars;
	cockpit.program = await createShaderProgram(gl, './shaders/cockpit_vert.glsl', './shaders/cockpit_frag.glsl');
	if (!cockpit.program) {
		console.error('Cockpit Cannot run without shader program!');
		return;
	}
	programList.push(cockpit.program);

	// Create Spotlight object
	console.log('Creating Spotlight object ...');
	const spotlight = await createSpotlight(gl);
	spotlight.program = await createShaderProgram(gl, './shaders/spotlight_vert.glsl', './shaders/spotlight_frag.glsl');
	if (!spotlight.program) {
		console.error('spotlight Cannot run without shader program!');
		return;
	}
	//programList.push(cockpit.program);

	// Create StrTEst object
	console.log('Creating StrTest object ...');
	const strTest = await createStrTest(gl,0,0);
	strTest.program = await createShaderProgram(gl, './shaders/astrTest_vert.glsl', './shaders/astrTest_frag.glsl');
	if (!strTest.program) {
		console.error('StrTest Cannot run without shader program!');
		return;
	}
	programList.push(strTest.program);


	// Create asteroid
	console.log('Creating asteroid object ... ');
	const asteroidObjects = [];
	for (let j = 0; j < numberOfAsteroidModels; j++) {
		
		for (let i = 0; i < numberOfAsteroidTextures; i++) {
			const asteroid = await createAsteroid(gl, i, j);
			asteroid.program = await createShaderProgram(gl, './shaders/asteroid_vert.glsl', './shaders/asteroid_frag.glsl');
			if (!asteroid.program) {
				console.error('asteroid Cannot run without shader program!');
				return;
			}
			asteroidObjects.push(asteroid);
			programList.push(asteroid.program);			
		}
	}	
	
	// Button Event Listeners
	let normalMapping = true;
	const showNormalMappingButton = document.getElementById('showNormalMappingButton');
	showNormalMappingButton.addEventListener("click", function() {
		if (normalMapping){
			asteroidObjects.forEach(asteroid => {
				showNormalMappingFunc(gl, asteroid.program, false);						
			});	
			normalMapping = false;
		} else{
			asteroidObjects.forEach(asteroid => {
				showNormalMappingFunc(gl, asteroid.program, true);
			});	
			normalMapping = true;
		}
	});
	if (normalMapping){
		asteroidObjects.forEach(asteroid => {
			showNormalMappingFunc(gl, asteroid.program, false);						
		});	
		normalMapping = false;
	} else{
		asteroidObjects.forEach(asteroid => {
			showNormalMappingFunc(gl, asteroid.program, true);
		});	
		normalMapping = true;
	}

	document.getElementById('createAsteroidButton1').addEventListener("click", function() {
		addAsteroidsToSeedList(asteroidObjects, seedList, 1);
	});
	document.getElementById('createAsteroidButton10').addEventListener("click", function() {
		addAsteroidsToSeedList(asteroidObjects, seedList, 10);
	});
	document.getElementById('createAsteroidButton100').addEventListener("click", function() {
		addAsteroidsToSeedList(asteroidObjects, seedList, 100);
	});
	document.getElementById('createAsteroidButton1000').addEventListener("click", function() {
		addAsteroidsToSeedList(asteroidObjects, seedList, 1000);
	});
	document.getElementById('createAsteroidButton10000').addEventListener("click", function() {
		addAsteroidsToSeedList(asteroidObjects, seedList, 10000);
	});
	document.getElementById('clearAsteroids').addEventListener("click", function() {
		seedList.forEach(seedByProgramList => {
			seedByProgramList.length = 0;
		});	
	});

	// Create earth objects
	console.log('Creating earth objects ...');
	const earth = await createEarth(gl);
	// earth.texture = texture;
	earth.program = await createShaderProgram(gl, './shaders/earth_vert.glsl', './shaders/earth_frag.glsl');
	if (!earth.program) {
		console.error('earth Cannot run without shader program!');
		return;
	}
	programList.push(earth.program);


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

	// Init seedList Matrix
	const seedList = [];
	asteroidObjects.forEach(obj => {
		let seedByProgramList = [];
		seedList.push(seedByProgramList);
	});

	// Setup Lighting for Fragment Shaders 
	// TODO : auslagern
	callForEachProgram(setUpLighting, programList, gl);
	const ambientSlider = document.getElementById('ambientInput');
	const ambientLabel = document.getElementById('ambientLabel');
	const diffuseSlider = document.getElementById('diffuseInput');
	const diffuseLabel = document.getElementById('diffuseLabel');
	const specularSlider = document.getElementById('specularInput');
	const specularLabel = document.getElementById('specularLabel');

	ambientLabel.innerHTML = "Ambient: " + ambientSlider.value/10;
	diffuseLabel.innerHTML = "Diffuse: " + diffuseSlider.value/10;
	specularLabel.innerHTML = "Specular: " + specularSlider.value/10;
	
	ambientSlider.oninput = function() {
		ambientLabel.innerHTML = "Ambient: " + ambientSlider.value/10;
		changeAmbient(ambientSlider.value/10);
		callForEachProgram(setUpLighting, programList, gl);
	}
	diffuseSlider.oninput = function() {
		diffuseLabel.innerHTML = "Diffuse: " + diffuseSlider.value/10;
		changeDiffuse(diffuseSlider.value/10);
		callForEachProgram(setUpLighting, programList, gl);
	}
	specularSlider.oninput = function() {
		specularLabel.innerHTML = "Specular: " + specularSlider.value/10;
		changeSpecular(specularSlider.value/10);
		callForEachProgram(setUpLighting, programList, gl);
	}
	document.getElementById('coordButton').addEventListener('click', function() {
		let xyz = [];
		xyz.push(document.getElementById('xValue').value);
		xyz.push(document.getElementById('yValue').value);
		xyz.push(document.getElementById('zValue').value);
		changeLightPosition(xyz);
		callForEachProgram(setUpLighting, programList, gl);
	})

	var testCP =vec3.create();
	vec3.set(testCP,15,0.0,0.0);
	// console.log(testCP);
	// Main render loop
	const loop = function () {
		
		// Viewmatrix
		const angle = performance.now() / 3000 / 6 * 2 * Math.PI;
		
		var cameraXrotate = (mouseXposition/2000)*Math.PI;
		var cameraPosition=[
			camDistance*Math.cos(mouseYposition*Math.PI/1000),
			-camDistance*Math.sin(mouseYposition*Math.PI/1000),0];

		mat4.lookAt(viewMatrix, cameraPosition, [0, 0, 0], [0, 1, 0]);
		mat4.rotate(viewMatrix,viewMatrix,cameraXrotate, [0,1,0]);
		//console.log(viewMatrix[12]+" "+viewMatrix[13]+" "+viewMatrix[14]+" "+viewMatrix[15]);
		//console.log(cameraPosition);
		
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
		// Draw TestBox
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		gl.useProgram(testBox.program);

		mat3.identity(normalMatrix);

		const matNormUniformLocation = gl.getUniformLocation(testBox.program, 'mNormal');
		gl.uniformMatrix3fv(matNormUniformLocation, gl.FALSE, normalMatrix);
		
		matProjUniformLocation = gl.getUniformLocation(testBox.program, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
		
		matViewUniformLocation = gl.getUniformLocation(testBox.program, 'mView');
		
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
		
		mat4.identity(worldMatrix);
		matWorldUniformLocation = gl.getUniformLocation(testBox.program, 'mWorld');
		mat4.translate(worldMatrix, worldMatrix, [0,0,10.0]);
		mat4.scale(worldMatrix, worldMatrix, [4.0, 4.0, 4.0]);
		mat4.rotate(worldMatrix, worldMatrix, angle, [0, 1.0, 0]);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

		//testBox.draw();

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
		// Draw Asteroids
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		
		// Double for-loop just for performance reasons		
		seedList.forEach(seedByProgramList => {
			if (seedByProgramList.length > 0) {
				let program = seedByProgramList[0].asteroidObj.program;			
				gl.useProgram(program);
				
				matProjUniformLocation = gl.getUniformLocation(program, 'mProj');
				gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
				
				matViewUniformLocation = gl.getUniformLocation(program, 'mView');
				gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
				
				matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
				
				const matNormalUniformLocation = gl.getUniformLocation(program, 'mNormal');
	
				seedByProgramList.forEach(asteroidSeed => {
				
					mat4.identity(worldMatrix);		
					mat4.multiply(worldMatrix, worldMatrix, spawnAsteroid(-200.0, angle, asteroidSeed));
					gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
					
		
					mat3.identity(normalMatrix);
					mat4.invert(worldMatrix, worldMatrix);
					mat4.transpose(worldMatrix, worldMatrix);
					mat3.fromMat4(normalMatrix, worldMatrix);
					gl.uniformMatrix3fv(matNormalUniformLocation, gl.FALSE, normalMatrix);
					
					asteroidSeed.asteroidObj.draw();	
				})
				
			}
		});

		// ########################################################################
		// ########################################################################
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		// Draw StrTest
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		gl.enable(gl.DEPTH_TEST);
		gl.useProgram(strTest.program);

	//	var colorAttribLocation = gl.getAttribLocation(this.program, 'vColor');
//		gl.vertexAttrib4f(colorAttribLocation, 0.0, 0.0, 1.0, 1.0);
		
		var camDir =[
			cameraPosition[0]*Math.cos(cameraXrotate),
			cameraPosition[1],
			cameraPosition[0]*Math.sin(cameraXrotate)]
		
		var camPosLocation = gl.getUniformLocation(strTest.program, 'cPos');
		console.log(
			Math.floor(camDir[0]),	
			Math.floor(camDir[1]),
			Math.floor(camDir[2]),
		)
		gl.uniform3f(camPosLocation,camDir[0],camDir[1],camDir[2]);
		//gl.uniform3f(camPosLocation,angle/2,angle/3,angle/6);

		matProjUniformLocation = gl.getUniformLocation(strTest.program, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
		
		matViewUniformLocation = gl.getUniformLocation(strTest.program, 'mView');
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
		
		mat4.identity(worldMatrix);
		mat4.translate(worldMatrix, worldMatrix, [-10.0, 0.0, 0.0]);
		matWorldUniformLocation = gl.getUniformLocation(strTest.program, 'mWorld');
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		
		strTest.draw();

		mat4.identity(worldMatrix);
		mat4.translate(worldMatrix, worldMatrix, [-5.0, 5.0, -5.0]);
		matWorldUniformLocation = gl.getUniformLocation(strTest.program, 'mWorld');
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

		strTest.draw();


		// ########################################################################
		// ########################################################################
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		// Draw Cockpit
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		gl.enable(gl.DEPTH_TEST);
		gl.useProgram(cockpit.program);
		

		
/* 		//const invViewMatrix = mat3.create();
		mat3.fromMat4(invViewMatrix, viewMatrix);
		mat3.invert(invViewMatrix, invViewMatrix); // repräsentiert die Inverse der Koordinatenachse von der ViewMatrix (Kameraorientierung)
		//const eyeDir = vec3.fromValues(0.0, 0.0, 1.0);
		vec3.transformMat3(eyeDir, eyeDir, invViewMatrix);
		//let eyeDirUniformLocation = gl.getUniformLocation(spaceship.program, 'eyeDir');
		gl.uniform3fv(eyeDirUniformLocation, eyeDir);
		// console.log("EyeDir: " + eyeDir); */
		
		matProjUniformLocation = gl.getUniformLocation(cockpit.program, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
		
		matViewUniformLocation = gl.getUniformLocation(cockpit.program, 'mView');
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
		
		mat4.identity(worldMatrix);
		mat4.rotate(worldMatrix, worldMatrix, Math.PI/2, [0, 1.0, 0]);
		matWorldUniformLocation = gl.getUniformLocation(cockpit.program, 'mWorld');
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		
		cockpit.draw();

		mat4.rotate(worldMatrix, worldMatrix, Math.PI, [0, 1.0, 0]);
		matWorldUniformLocation = gl.getUniformLocation(cockpit.program, 'mWorld');
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

		cockpit.draw();

		// ########################################################################
		// ########################################################################
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		// Draw spotlight
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		gl.enable(gl.DEPTH_TEST);
		gl.useProgram(spotlight.program);
		

		
/* 		//const invViewMatrix = mat3.create();
		mat3.fromMat4(invViewMatrix, viewMatrix);
		mat3.invert(invViewMatrix, invViewMatrix); // repräsentiert die Inverse der Koordinatenachse von der ViewMatrix (Kameraorientierung)
		//const eyeDir = vec3.fromValues(0.0, 0.0, 1.0);
		vec3.transformMat3(eyeDir, eyeDir, invViewMatrix);
		//let eyeDirUniformLocation = gl.getUniformLocation(spaceship.program, 'eyeDir');
		gl.uniform3fv(eyeDirUniformLocation, eyeDir);
		// console.log("EyeDir: " + eyeDir); */
		
		matProjUniformLocation = gl.getUniformLocation(spotlight.program, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
		
		matViewUniformLocation = gl.getUniformLocation(spotlight.program, 'mView');
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
		
		mat4.identity(worldMatrix);
		//mat4.rotate(worldMatrix, worldMatrix, Math.PI/2, [0, 1.0, 0]);
		matWorldUniformLocation = gl.getUniformLocation(spotlight.program, 'mWorld');
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		
		spotlight.draw();
		// ########################################################################
		// ########################################################################
		
		requestAnimationFrame(loop);
	};

	console.log('Entering rendering loop ...')
	requestAnimationFrame(loop);
}