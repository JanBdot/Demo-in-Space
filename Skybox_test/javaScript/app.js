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



	// Create additional frame buffer
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
	
	// Create earth objects
	console.log('Creating earth objects ...');
	const earth = await createEarth(gl);
	earth.program = await createShaderProgram(gl, './shaders/earth_vert.glsl', './shaders/earth_frag.glsl');
	if (!earth.program) {
		console.error('earth Cannot run without shader program!');
		return;
	}
	programList.push(earth.program);
	
	// Create spaceship object
	console.log('Creating spaceship object ...');
	const spaceship = await createSpaceship(gl);
	spaceship.program = await createShaderProgram(gl, './shaders/spaceship_vert.glsl', './shaders/spaceship_frag.glsl');
	if (!spaceship.program) {
		console.error('spaceship Cannot run without shader program!');
		return;
	}
	programList.push(spaceship.program);
	
	// Create Testbox
	console.log('Create Testbox ...');
	// const testBox = await createBox(gl);
	// testBox.program = await createShaderProgram(gl, './test/testShaders/simpleNormalVert.glsl', './test/testShaders/simpleNormalFrag.glsl');
	const testBox = await createColorBox(gl);
	testBox.program = await createShaderProgram(gl, './test/testShaders/simpleColorShader/simpleColorVert.glsl', './test/testShaders/simpleColorShader/simpleColorFrag.glsl');
	if (!testBox.program) {
		console.error('testBox Cannot run without shader program!');
		return;
	}
	programList.push(testBox.program);
	
	// Init seedList Matrix
	const seedList = [];
	asteroidObjects.forEach(obj => {
		let seedByProgramList = [];
		seedList.push(seedByProgramList);
	});

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
    
    // Setup Lighting for Fragment Shaders 
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
	
	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.enable(gl.DEPTH_TEST);

	// init Main render loop
	const worldMatrix = new Float32Array(16);
	const viewMatrix = new Float32Array(16);
	const projMatrix = new Float32Array(16);
	const normalMatrix = new Float32Array(9);
	
	// Main render loop
	const loop = function () {
		mat4.perspective(projMatrix, glMatrix.toRadian(90), width / height, 0.1, 1000.0);
		
		createCubeMapTexture();

		// Draw into onscreen framebuffer
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		gl.viewport(0, 0, canvas.width, canvas.height);
		gl.clearColor(0.3, 0.3, 0.3, 1.0);
		gl.depthMask(true);
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
		gl.enable(gl.DEPTH_TEST);

		mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);

		var cameraXrotate = (mouseXposition/2000)*Math.PI;
		var cameraPosition=[camDistance*Math.cos(mouseYposition*Math.PI/1000),-camDistance*Math.sin(mouseYposition*Math.PI/1000),0];

		mat4.identity(viewMatrix);
		mat4.lookAt(viewMatrix, cameraPosition, [0, 0, 0], [0, 1, 0]);
		mat4.rotate(viewMatrix,viewMatrix,cameraXrotate, [0,1,0]);

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
				});	
			}
		});		
		// ########################################################################
		// ########################################################################

		// // ------------------------------------------------------------------------
		// // ------------------------------------------------------------------------
		// // Draw Cockpit
		// // ------------------------------------------------------------------------
		// // ------------------------------------------------------------------------
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
		
		
		// // ########################################################################
		// // ########################################################################

		// drawTestBoxes();
	};

	const drawSpaceship = function() {

		const angle = performance.now() / 3000 / 6 * 2 * Math.PI;
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------
		// Draw Spaceship
		// ------------------------------------------------------------------------
		// ------------------------------------------------------------------------

		gl.useProgram(spaceship.program);

		
		const invViewMatrix = mat3.create();
		mat3.fromMat4(invViewMatrix, viewMatrix);
		mat3.invert(invViewMatrix, invViewMatrix); // repräsentiert die Inverse der Koordinatenachse von der ViewMatrix (Kameraorientierung)
		const eyeDir = vec3.fromValues(0.0, 0.0, 1.0);
		vec3.transformMat3(eyeDir, eyeDir, invViewMatrix);
		let eyeDirUniformLocation = gl.getUniformLocation(spaceship.program, 'eyeDir');
		gl.uniform3fv(eyeDirUniformLocation, eyeDir);
		// console.log("EyeDir: " + eyeDir);
		
		
		const matProjUniformLocation = gl.getUniformLocation(spaceship.program, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
		
		const matViewUniformLocation = gl.getUniformLocation(spaceship.program, 'mView');
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
		
		mat4.identity(worldMatrix);
		const matWorldUniformLocation = gl.getUniformLocation(spaceship.program, 'mWorld');
		mat4.rotate(worldMatrix, worldMatrix, glMatrix.toRadian(90), [0, 1.0, 0]);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

		spaceship.texture = sceneFrameBufferTexture;
		spaceship.draw();		
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

	const drawTestBoxes = function() {
		gl.useProgram(testBox.program);
		
		let matProjUniformLocation = gl.getUniformLocation(testBox.program, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
		
		let matViewUniformLocation = gl.getUniformLocation(testBox.program, 'mView');		
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);

		let colorBox = gl.getUniformLocation(testBox.program, 'fragColor');
		gl.uniform4fv(colorBox, [0.0, 1.0, 0, 1.0]);
		
		mat4.identity(worldMatrix);
		let matWorldUniformLocation = gl.getUniformLocation(testBox.program, 'mWorld');
		mat4.translate(worldMatrix, worldMatrix, [0,0,30.0]);
		mat4.scale(worldMatrix, worldMatrix, [4.0, 4.0, 4.0]);
		// mat4.rotate(worldMatrix, worldMatrix, angle, [0, 1.0, 0]);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		
		// testBox.texture = boxTexture;
		testBox.draw();

		gl.useProgram(testBox.program);
		
		matProjUniformLocation = gl.getUniformLocation(testBox.program, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
		
		matViewUniformLocation = gl.getUniformLocation(testBox.program, 'mView');		
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);

		colorBox = gl.getUniformLocation(testBox.program, 'fragColor');
		gl.uniform4fv(colorBox, [0.0, 0.0, 1.0, 1.0]);
		
		mat4.identity(worldMatrix);
		matWorldUniformLocation = gl.getUniformLocation(testBox.program, 'mWorld');
		mat4.translate(worldMatrix, worldMatrix, [0,0,-30.0]);
		mat4.scale(worldMatrix, worldMatrix, [4.0, 4.0, 4.0]);
		// mat4.rotate(worldMatrix, worldMatrix, angle, [0, 1.0, 0]);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		
		// testBox.texture = boxTexture;
		testBox.draw();
		
		gl.useProgram(testBox.program);
		
		matProjUniformLocation = gl.getUniformLocation(testBox.program, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
		
		matViewUniformLocation = gl.getUniformLocation(testBox.program, 'mView');		
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);

		colorBox = gl.getUniformLocation(testBox.program, 'fragColor');
		gl.uniform4fv(colorBox, [1.0, 0.0, 1.0, 1.0]);
		
		mat4.identity(worldMatrix);
		matWorldUniformLocation = gl.getUniformLocation(testBox.program, 'mWorld');
		mat4.translate(worldMatrix, worldMatrix, [30.0,0,0.0]);
		mat4.scale(worldMatrix, worldMatrix, [4.0, 4.0, 4.0]);
		// mat4.rotate(worldMatrix, worldMatrix, angle, [0, 1.0, 0]);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		
		// testBox.texture = boxTexture;
		testBox.draw();
		
		// testBox.texture = boxTexture;
		testBox.draw();

		gl.useProgram(testBox.program);
		
		matProjUniformLocation = gl.getUniformLocation(testBox.program, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
		
		matViewUniformLocation = gl.getUniformLocation(testBox.program, 'mView');		
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);

		colorBox = gl.getUniformLocation(testBox.program, 'fragColor');
		gl.uniform4fv(colorBox, [1.0, 0.0, 0.0, 1.0]);
		
		mat4.identity(worldMatrix);
		matWorldUniformLocation = gl.getUniformLocation(testBox.program, 'mWorld');
		mat4.translate(worldMatrix, worldMatrix, [-30.0,0,0.0]);
		mat4.scale(worldMatrix, worldMatrix, [4.0, 4.0, 4.0]);
		// mat4.rotate(worldMatrix, worldMatrix, angle, [0, 1.0, 0]);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		
		// testBox.texture = boxTexture;
		testBox.draw();


		gl.useProgram(testBox.program);
		
		matProjUniformLocation = gl.getUniformLocation(testBox.program, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
		
		matViewUniformLocation = gl.getUniformLocation(testBox.program, 'mView');		
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);

		colorBox = gl.getUniformLocation(testBox.program, 'fragColor');
		gl.uniform4fv(colorBox, [1.0, 1.0, 0.0, 1.0]);
		
		mat4.identity(worldMatrix);
		matWorldUniformLocation = gl.getUniformLocation(testBox.program, 'mWorld');
		mat4.translate(worldMatrix, worldMatrix, [0.0,30.0,0.0]);
		mat4.scale(worldMatrix, worldMatrix, [4.0, 4.0, 4.0]);
		// mat4.rotate(worldMatrix, worldMatrix, angle, [0, 1.0, 0]);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		
		// testBox.texture = boxTexture;
		testBox.draw();


		gl.useProgram(testBox.program);
		
		matProjUniformLocation = gl.getUniformLocation(testBox.program, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
		
		matViewUniformLocation = gl.getUniformLocation(testBox.program, 'mView');		
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);

		colorBox = gl.getUniformLocation(testBox.program, 'fragColor');
		gl.uniform4fv(colorBox, [0.0, 1.0, 1.0, 1.0]);
		
		mat4.identity(worldMatrix);
		matWorldUniformLocation = gl.getUniformLocation(testBox.program, 'mWorld');
		mat4.translate(worldMatrix, worldMatrix, [0.0,-30.0,0.0]);
		mat4.scale(worldMatrix, worldMatrix, [4.0, 4.0, 4.0]);
		// mat4.rotate(worldMatrix, worldMatrix, angle, [0, 1.0, 0]);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		
		// testBox.texture = boxTexture;
		testBox.draw();

	}

}
