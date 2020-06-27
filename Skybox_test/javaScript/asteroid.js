function createRandomPositionAstroid(distanceToPlanet, angle, asteroidSeed) {
    const worldMatrix = new Float32Array(16);    
    
    mat4.identity(worldMatrix);
    
    // Puts it to the center of the planet (only z-Axis)
    mat4.translate(worldMatrix, worldMatrix, [0.0, 0.0, distanceToPlanet]);    
    
    // Random radian rotation
    mat4.rotate(worldMatrix, worldMatrix, asteroidSeed.radianAngleY, [0.0, 1.0, 0.0]);
    // mat4.rotate(worldMatrix, worldMatrix, asteroidSeed.radianAngleZ, [0.0, 0.0, asteroidSeed.radianAxisY]);
    
    mat4.translate(worldMatrix, worldMatrix, [0.0, asteroidSeed.translateY, 0.0]);
    
    // Must be called from loop (angle updates every frame)
    mat4.rotate(worldMatrix, worldMatrix, angle/(asteroidSeed.rotationSpeed*3), [0, -1.0, 0.0]);

    mat4.translate(worldMatrix, worldMatrix, [0.0, 0.0, asteroidSeed.distanceFromPlanet]);
    
    // random scale between [5, 15]
    mat4.scale(worldMatrix, worldMatrix, [asteroidSeed.scale, asteroidSeed.scale, asteroidSeed.scale]);
    
    // Random rotation speed and axis
    mat4.rotate(worldMatrix, worldMatrix, (angle/asteroidSeed.rotationSpeed)*2, asteroidSeed.rotationAxis);
    
    return worldMatrix;
    
}

function createRandomAsteroidSeed() {
    let asteroidSeed = {
        distanceFromPlanet: 0.0,
        scale: 0.0,
        rotationSpeed: 0.0,
        radianAngleY: 0.0,
        radianAxisY: 1.0,
        radianAngleZ: 0.0,
        translateY: 0.0,
        rotationAxis: []
    }

    let dist = 0
    // while(!((dist >= 160 && dist <= 180) || (dist >= 220 && dist <= 235))) {
    while(!((dist >= 160 && dist <= 197) || (dist >= 203 && dist <= 260))) {
        dist = Math.random()*100+160
    }
    asteroidSeed.distanceFromPlanet = dist;

    asteroidSeed.scale = Math.random() * 2 + 1;

    asteroidSeed.rotationSpeed = Math.random() + 0.7;

    asteroidSeed.radianAngleY = Math.random()*Math.PI*2;

    asteroidSeed.radianAngleZ = Math.random() / 4 - 0.125;

    asteroidSeed.translateY = Math.random() * 20 - 10;

    const random = Math.random();
    asteroidSeed.radianAxisY = random;
    // if (random <= 0.5) {
    //     asteroidSeed.radianAxisY = 1.0;
    // } else {
    //     asteroidSeed.radianAxisY = -1.0;        
    // }

    asteroidSeed.rotationAxis = randomAxis3f();

    return asteroidSeed;
}

function addAsteroidsToSeedList(seedList, number){
    for (let i = 0; i < number; i++) {			
        seedList.push(createRandomAsteroidSeed());		
    }
}

function randomAxis3f() {
    let vec = [];
    let random = Math.floor(Math.random() * 7);
    if (random === 0) {
        vec = [1, 0, 0];
    }
    if (random === 1) {
        vec = [1, 1, 0];
    }
    if (random === 2) {
        vec = [1, 1, 1];
    }
    if (random === 3) {
        vec = [0, 1, 0];
    }
    if (random === 4) {
        vec = [0, 1, 1];
    }
    if (random === 5) {
        vec = [0, 0, 1];
    }
    if (random === 6) {
        vec = [1, 0, 1];
    }

    return vec;
}