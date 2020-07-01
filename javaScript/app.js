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

	// Create additional frame buffer to hold CubeMap Texture for Spaceship
	console.log('Creating additional frame buffer ...');
	const height = 512;
	const width = 512;
	const sceneFrameBufferTexture = gl.createTexture();
	gl.activeTexture(gl.TEXTURE10);
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, sceneFrameBufferTexture);
	for (let i = 0; i < 6; i++) {
		gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X+i, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	}
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	const frameBuffer = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);

	const renderBuffer = gl.createRenderbuffer();
	gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
	gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBuffer);

	gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
	gl.bindRenderbuffer(gl.RENDERBUFFER, null);
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	
	// List with all programs (everytime a program is created, push to list)
	const programList = [];

	// Create textures
	const textureSkybox = createSkyBoxTexture(gl);

	// Create skybox
	console.log('Creating skybox ...');
	const skybox = createSkyBox(gl);
	skybox.program = await createShaderProgram(gl, './shaders/skybox_vert.glsl', './shaders/skybox_frag.glsl');
	if (!skybox.program) {
		console.error('Cannot run without shader program!');
		return;
	}
	programList.push(skybox.program);
	
	// Create Cockpit object
	console.log('Creating Cockpit object ...');
	const cockpit = await createCockpit(gl);
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

/* 	// Create StrTEst object
	console.log('Creating StrTest object ...');
	const strTest = await createStrTest(gl,0,0);
	strTest.program = await createShaderProgram(gl, './shaders/astrTest_vert.glsl', './shaders/astrTest_frag.glsl');
	if (!strTest.program) {
		console.error('StrTest Cannot run without shader program!');
		return;
	}
	programList.push(strTest.program); */
	

	// Create asteroid
	console.log('Creating asteroid object ... ');
	const asteroidObjects = [];
	for (let j = 0; j < numberOfAsteroidModels; j++) {
		
		for (let i = 0; i < numberOfAsteroidTextures; i++) {
			const asteroid = await createAsteroid(gl, i, j);
			// asteroid.program = await createShaderProgram(gl, './shaders/astrTest_vert.glsl', './shaders/astrTest_frag.glsl');
			asteroid.program = await createShaderProgram(gl, './shaders/earth_vert.glsl', './shaders/astrTest_frag.glsl');
			if (!asteroid.program) {
				console.error('asteroid Cannot run without shader program!');
				return;
			}
			asteroidObjects.push(asteroid);
			programList.push(asteroid.program);			
		}
	}	
	
	// Create earth objects
	console.log('Creating earth objects ...');
	const earth = await createEarth(gl);
	earth.program = await createShaderProgram(gl, './shaders/earth_vert.glsl', './shaders/earth_frag.glsl');
	if (!earth.program) {
		console.error('earth Cannot run without shader program!');
		return;
	}
	programList.push(earth.program);

	// Create moon objects
	console.log('Creating moon objects ...');
	const moon = await createMoon(gl);
	moon.program = await createShaderProgram(gl, './shaders/earth_vert.glsl', './shaders/moon_frag.glsl');
	if (!moon.program) {
		console.error('moon Cannot run without shader program!');
		return;
	}
	programList.push(moon.program);
	
	// Create spaceship object
	console.log('Creating spaceship object ...');
	const spaceship = await createSpaceship(gl);
	spaceship.program = await createShaderProgram(gl, './shaders/spaceship_vert.glsl', './shaders/spaceship_frag.glsl');
	if (!spaceship.program) {
		console.error('spaceship Cannot run without shader program!');
		return;
	}
	programList.push(spaceship.program);
	
	// Init seedList Matrix
	const seedList = [];
	asteroidObjects.forEach(obj => {
		let seedByProgramList = [];
		seedList.push(seedByProgramList);
	});

	// Register Button Event Listeners
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
	document.getElementById('coordButton').addEventListener('click', function() {
		let xyz = [];
		xyz.push(document.getElementById('xValue').value*10);
		xyz.push(document.getElementById('yValue').value*10);
		xyz.push(document.getElementById('zValue').value*10);
		changeLightPosition(xyz);
		callForEachProgram(setUpLighting, programList, gl);
	})
    
    // Setup Lighting for Fragment Shaders from UI
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
	
	// init Main render loop
	const worldMatrix = new Float32Array(16);
	const viewMatrix = new Float32Array(16);
	const projMatrix = new Float32Array(16);
	const normalMatrix = new Float32Array(9);
	const invViewMatrix = mat3.create();

	let shiftDirectionPositive = true
	let shiftX = 0;
	let cameraPosition;
	let cameraXrotate;
	
	// Main render loop
	const loop = function () {
		callForEachProgram(setUpLighting, programList, gl);

		mat4.perspective(projMatrix, glMatrix.toRadian(90), width / height, 0.1, 1000.0);
		
		// Draw into offscreen Framebuffer
		createCubeMapTexture();

		// Draw into onscreen framebuffer
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		gl.viewport(0, 0, canvas.width, canvas.height);
		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.depthMask(true);
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
		gl.enable(gl.DEPTH_TEST);
		gl.disable(gl.CULL_FACE);

		mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);

		drawScene();
		drawSpaceship();
		
		requestAnimationFrame(loop);
	};

	console.log('Entering rendering loop ...')
	requestAnimationFrame(loop);

	const drawScene = function(){
		const angle = performance.now() / 3000 / 6 * 2 * Math.PI;
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

		gl.disable(gl.DEPTH_TEST);
		skybox.texture = textureSkybox;
		skybox.draw(textureSkybox);
		// ########################################################################
		// ########################################################################
		
		
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		// Draw Earth
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		gl.enable(gl.DEPTH_TEST);
		gl.useProgram(earth.program);

		
		const samplerDayLocation = gl.getUniformLocation(earth.program, "sDay");
		gl.uniform1i(samplerDayLocation, 0);
		const samplerNightLocation = gl.getUniformLocation(earth.program, "sNight");
		gl.uniform1i(samplerNightLocation, 1);
		const samplerOceanLocation = gl.getUniformLocation(earth.program, "sOcean");
		gl.uniform1i(samplerOceanLocation, 2);
		const samplerCloudLocation = gl.getUniformLocation(earth.program, "sClouds");
		gl.uniform1i(samplerCloudLocation, 3);
		
		let shiftUniformLocation = gl.getUniformLocation(earth.program, 'shift');
		gl.uniform1f(shiftUniformLocation, angle/110);

		mat3.identity(invViewMatrix);
		mat3.fromMat4(invViewMatrix, viewMatrix);
		mat3.invert(invViewMatrix, invViewMatrix);
		let eyeDir = vec3.fromValues(0.0, 0.0, 1.0);
		vec3.transformMat3(eyeDir, eyeDir, invViewMatrix);
		let eyeDirUniformLocation = gl.getUniformLocation(earth.program, 'eyeDir');
		gl.uniform3fv(eyeDirUniformLocation, eyeDir);
		
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
		// Draw Moon
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		gl.enable(gl.DEPTH_TEST);
		gl.useProgram(moon.program);

		
		const moonDiffuseLocation = gl.getUniformLocation(moon.program, "sDiffuse");
		gl.uniform1i(moonDiffuseLocation, 0);
		const moonBumpLocation = gl.getUniformLocation(moon.program, "sClouds");
		gl.uniform1i(moonBumpLocation, 1);
		const moonPeople2Location = gl.getUniformLocation(moon.program, "sPeople2");
		gl.uniform1i(moonPeople2Location, 2);
		const moonBaseLocation = gl.getUniformLocation(moon.program, "sBase");
		gl.uniform1i(moonBaseLocation, 3);
		const moonPeopleLocation = gl.getUniformLocation(moon.program, "sPeople");
		gl.uniform1i(moonPeopleLocation, 4);
		
		shiftUniformLocation = gl.getUniformLocation(moon.program, 'shift');
		gl.uniform1f(shiftUniformLocation, angle/10);
		
		const shiftXUniformLocation = gl.getUniformLocation(moon.program, 'shiftX');
		gl.uniform1f(shiftXUniformLocation, shiftX/40000);

		if (shiftDirectionPositive){
			shiftX = shiftX + 1; 
		} else {
			shiftX = shiftX - 1;
		}		
		if (shiftX === 150 && shiftDirectionPositive) {
			shiftDirectionPositive = false;
		}
		if (shiftX === -150 && !shiftDirectionPositive) {
			shiftDirectionPositive = true;
		}

		mat3.identity(invViewMatrix);
		mat3.fromMat4(invViewMatrix, viewMatrix);
		mat3.invert(invViewMatrix, invViewMatrix);
		eyeDir = vec3.fromValues(0.0, 0.0, 1.0);
		vec3.transformMat3(eyeDir, eyeDir, invViewMatrix);
		eyeDirUniformLocation = gl.getUniformLocation(moon.program, 'eyeDir');
		gl.uniform3fv(eyeDirUniformLocation, eyeDir);
		
		matProjUniformLocation = gl.getUniformLocation(moon.program, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
		
		matViewUniformLocation = gl.getUniformLocation(moon.program, 'mView');
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
		
		matWorldUniformLocation = gl.getUniformLocation(moon.program, 'mWorld');
		
		mat4.identity(worldMatrix);
		mat4.translate(worldMatrix, worldMatrix, [0.0, 0.0, -200.0]);
    	mat4.rotate(worldMatrix, worldMatrix, glMatrix.toRadian(20), [0.0, 0.0, 1.0]);
		mat4.rotate(worldMatrix, worldMatrix, angle/(3.0), [0, -1.0, 0.0]);

		mat4.translate(worldMatrix, worldMatrix, [0.0, 0.0, 300.0]);
		mat4.scale(worldMatrix, worldMatrix, [30.0, 30.0, 30.0]);
		// mat4.rotate(worldMatrix, worldMatrix, angle/8, [0, -1, 0]);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		
		moon.draw();
		// ########################################################################
		// ########################################################################
		
		
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		// Draw Asteroids
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		gl.enable(gl.DEPTH_TEST);
		gl.disable(gl.CULL_FACE);

		// Double for-loop just for performance reasons		
		seedList.forEach(seedByProgramList => {
			if (seedByProgramList.length > 0) {
				let program = seedByProgramList[0].asteroidObj.program;			
				gl.useProgram(program);

				mat3.identity(invViewMatrix);		
				mat3.fromMat4(invViewMatrix, viewMatrix);
				mat3.invert(invViewMatrix, invViewMatrix);
				const eyeDir = vec3.fromValues(0.0, 0.0, 1.0);
				vec3.transformMat3(eyeDir, eyeDir, invViewMatrix);
				let eyeDirUniformLocation = gl.getUniformLocation(program, 'eyeDir');
				gl.uniform3fv(eyeDirUniformLocation, eyeDir);
				
				matProjUniformLocation = gl.getUniformLocation(program, 'mProj');
				gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
				
				matViewUniformLocation = gl.getUniformLocation(program, 'mView');
				gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
				
				matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
				
				const matNormalUniformLocation = gl.getUniformLocation(program, 'mWorldInverseTranspose');				
				
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
				});	
			}
		});		
		// ########################################################################
		// ########################################################################


		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		// Draw StrTest
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
/* 		gl.enable(gl.DEPTH_TEST);
		gl.useProgram(strTest.program); */

		cameraXrotate = (mouseXposition/2000)*Math.PI;
		cameraPosition=[
			camDistance*Math.cos(mouseYposition*Math.PI/1000),
			-camDistance*Math.sin(mouseYposition*Math.PI/1000),0];

		mat4.identity(viewMatrix);
		mat4.lookAt(viewMatrix, cameraPosition, [0, 0, 0], [0, 1, 0]);
		mat4.rotate(viewMatrix,viewMatrix,cameraXrotate, [0,1,0]);

		//gl.useProgram(strTest.program); 

		var camDir =[
			cameraPosition[0]*Math.cos(cameraXrotate),
			cameraPosition[1],
			cameraPosition[0]*Math.sin(cameraXrotate)]
		
		//var camPosLocation = gl.getUniformLocation(strTest.program, 'cPos');
/* 		console.log(
			Math.floor(camDir[0]),	
			Math.floor(camDir[1]),
			Math.floor(camDir[2]),
		) */
		//gl.uniform3f(camPosLocation,camDir[0],camDir[1],camDir[2]);
		//gl.uniform3f(camPosLocation,angle/2,angle/3,angle/6);

	//	var colorAttribLocation = gl.getAttribLocation(this.program, 'vColor');
//		gl.vertexAttrib4f(colorAttribLocation, 0.0, 0.0, 1.0, 1.0);
		

/* 		matProjUniformLocation = gl.getUniformLocation(strTest.program, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
		
		matViewUniformLocation = gl.getUniformLocation(strTest.program, 'mView');
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
		
		mat4.identity(worldMatrix);
		mat4.translate(worldMatrix, worldMatrix, [-100, 0.0, 0.0]);
		mat4.scale(worldMatrix, worldMatrix, [20.0, 20.0, 20.0]); */
		
		//var lightXrotate = (mouseLightControlY/2000)*Math.PI;
		//mat4.rotate(worldMatrix,worldMatrix,lightXrotate,[0,1,0] );



/* 			var lpPosition=[
			camDistance*Math.cos(mouseLightControlY*Math.PI/1000),
			-camDistance*Math.sin(mouseLightControlY*Math.PI/1000),0]; */

/* 			mat4.lookAt(viewMatrix, cameraPosition, [0, 0, 0], [0, 1, 0]);
			mat4.rotate(viewMatrix,viewMatrix,cameraXrotate, [0,1,0]); */	
		
	//	matWorldUniformLocation = gl.getUniformLocation(strTest.program, 'mWorld');
	//	gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		
		// strTest.draw();

/* 		mat4.identity(worldMatrix);
		mat4.translate(worldMatrix, worldMatrix, [0.0, 0.0, 10.0]);
		mat4.scale(worldMatrix, worldMatrix, [1.0, 1.0, 1.0]);
		mat4.rotate(worldMatrix, worldMatrix, angle, [0, 1.0, 0]);

		matWorldUniformLocation = gl.getUniformLocation(strTest.program, 'mWorld');
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

		strTest.draw();

		mat4.identity(worldMatrix);
		mat4.translate(worldMatrix, worldMatrix, [15.0, 0.0, -5.0]);
		mat4.scale(worldMatrix, worldMatrix, [1.0, 1.0, 1.0]);
		mat4.rotate(worldMatrix, worldMatrix, angle/3, [0, 1.0, 0]);

		matWorldUniformLocation = gl.getUniformLocation(strTest.program, 'mWorld');
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

		strTest.draw(); */

		// ########################################################################
		// ########################################################################
	};

	const drawSpaceship = function() {

		const angle = performance.now() / 3000 / 6 * 2 * Math.PI;
		
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		// Draw Spaceship
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		gl.enable(gl.DEPTH_TEST);
		gl.disable(gl.CULL_FACE);

		gl.useProgram(spaceship.program);

		mat3.identity(invViewMatrix);		
		mat3.fromMat4(invViewMatrix, viewMatrix);
		mat3.invert(invViewMatrix, invViewMatrix);
		let eyeDir = vec3.fromValues(0.0, 0.0, 1.0);
		vec3.transformMat3(eyeDir, eyeDir, invViewMatrix);
		let eyeDirUniformLocation = gl.getUniformLocation(spaceship.program, 'eyeDir');
		gl.uniform3fv(eyeDirUniformLocation, eyeDir);		
		
		let matProjUniformLocation = gl.getUniformLocation(spaceship.program, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
		
		let matViewUniformLocation = gl.getUniformLocation(spaceship.program, 'mView');
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
		
		mat4.identity(worldMatrix);
		let matWorldUniformLocation = gl.getUniformLocation(spaceship.program, 'mWorld');
		//mat4.rotate(worldMatrix, worldMatrix, glMatrix.toRadian(45), [0, 1.0, 0]);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

		spaceship.texture = sceneFrameBufferTexture;
		spaceship.draw();		

		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		// Draw Cockpit
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);
		gl.useProgram(cockpit.program);

		eyeDir = vec3.fromValues(0.0, 0.0, 1.0);
		vec3.transformMat3(eyeDir, eyeDir, invViewMatrix);
		eyeDirUniformLocation = gl.getUniformLocation(cockpit.program, 'eyeDir');
		gl.uniform3fv(eyeDirUniformLocation, eyeDir);
		
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
		gl.disable(gl.CULL_FACE);
		gl.useProgram(spotlight.program);
		
		matProjUniformLocation = gl.getUniformLocation(spotlight.program, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
		
		matViewUniformLocation = gl.getUniformLocation(spotlight.program, 'mView');
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
		
		mat4.identity(worldMatrix);
		matWorldUniformLocation = gl.getUniformLocation(spotlight.program, 'mWorld');
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		
		spotlight.draw();
		// ########################################################################
		// ########################################################################
	}

	const createCubeMapTexture = function() {
		gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
		
		// Positive X BLue
		gl.viewport(0, 0, width, height);
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.depthMask(true);
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
		
		mat4.identity(viewMatrix);
		mat4.lookAt(viewMatrix, [0, 0, 0], [0, 0, 0], [0, 1.0, 0]);
		mat4.rotate(viewMatrix, viewMatrix, glMatrix.toRadian(180), [0, 0.0, 1.0]);	
		drawScene();
		
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_POSITIVE_X, sceneFrameBufferTexture, 0);
		
		// Negative X PURPLE
		gl.clearColor(1.0, 0.0, 0.0, 1.0);
		gl.depthMask(true);
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
		
		mat4.identity(viewMatrix);
		mat4.lookAt(viewMatrix, [0, 0, 0], [0.0, 0.0, 0.0], [0, 1, 0]);
		mat4.rotate(viewMatrix, viewMatrix, glMatrix.toRadian(90), [0, 1.0, 0]);	
		mat4.rotate(viewMatrix, viewMatrix, glMatrix.toRadian(180), [1.0, 0.0, 0.0]);
		drawScene();
		
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_NEGATIVE_X, sceneFrameBufferTexture, 0);
		
		// Positive Y RED
		gl.clearColor(1.0, 0.0, 0.0, 1.0);
		gl.depthMask(true);
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
		
		mat4.identity(viewMatrix);
		mat4.lookAt(viewMatrix, [0, 0, 0], [0, 0, 0], [0, 1, 0]);
		mat4.rotate(viewMatrix, viewMatrix, glMatrix.toRadian(-90), [0, 1.0, 0]);
		mat4.rotate(viewMatrix, viewMatrix, glMatrix.toRadian(180), [1.0, 0.0, 0.0]);
		drawScene();
		
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_POSITIVE_Y, sceneFrameBufferTexture, 0);
		
		// Negative Y YELLOW
		gl.clearColor(1.0, 0.0, 0.0, 1.0);
		gl.depthMask(true);
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
		
		mat4.identity(viewMatrix);
		mat4.lookAt(viewMatrix, [0, 0, 0], [0, 0, 0], [0, 1, 0]);
		mat4.rotate(viewMatrix, viewMatrix, glMatrix.toRadian(-90), [1.0, 0, 0]);
		drawScene();
		
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, sceneFrameBufferTexture, 0);
		
		// Positive Z TEAL
		gl.clearColor(1.0, 0.0, 0.0, 1.0);
		gl.depthMask(true);
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
		
		mat4.identity(viewMatrix);
		mat4.lookAt(viewMatrix, [0, 0, 0], [0, 0, 0], [0, 1, 0]);
		mat4.rotate(viewMatrix, viewMatrix, glMatrix.toRadian(90), [1.0, 0, 0]);
		drawScene();
		
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_POSITIVE_Z, sceneFrameBufferTexture, 0);
		
		// Negative Z Green
		gl.clearColor(1.0, 0.0, 0.0, 1.0);
		gl.depthMask(true);
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
		
		mat4.identity(viewMatrix);
		mat4.lookAt(viewMatrix, [0, 0, 0], [0, 0, 1.0], [0, 1.0, 0]);
		mat4.rotate(viewMatrix, viewMatrix, glMatrix.toRadian(180), [0.0, 0.0, 1.0]);
		drawScene();
		
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, sceneFrameBufferTexture, 0);

		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	}
}
