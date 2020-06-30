function init(){
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

}