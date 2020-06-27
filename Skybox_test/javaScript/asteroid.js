function createRandomPositionAstroid(distanceToPlanet, angle, asteroidSeed) {
    const worldMatrix = new Float32Array(16);    
    
    mat4.identity(worldMatrix);
    
    // Puts it to the center of the planet (only z-Axis)
    mat4.translate(worldMatrix, worldMatrix, [0.0, 0.0, distanceToPlanet]);    
    
    // Random radian rotation
    mat4.rotate(worldMatrix, worldMatrix, asteroidSeed.radianAngleZ, [0.0, 0.0, 1.0]);
    mat4.rotate(worldMatrix, worldMatrix, asteroidSeed.radianAngleY, [0.0, 1.0, 0.0]);
    
    // Must be called from loop (angle updates every frame)
    mat4.rotate(worldMatrix, worldMatrix, angle, [0, -1.0, 0.0]);

    mat4.translate(worldMatrix, worldMatrix, [0.0, 0.0, asteroidSeed.distanceFromPlanet]);
    
    // random scale between [5, 15]
    mat4.scale(worldMatrix, worldMatrix, [asteroidSeed.scale, asteroidSeed.scale, asteroidSeed.scale]);
    
    // Random rotation speed and axis
    mat4.rotate(worldMatrix, worldMatrix, angle/asteroidSeed.rotationSpeed, [0, 1, 0]);
    
    return worldMatrix;
    
}

function createRandomAsteroidSeed() {
    let asteroidSeed = {
        distanceFromPlanet: 0.0,
        scale: 0.0,
        rotationSpeed: 0.0,
        radianAngleY: 0.0,
        radianAngleZ: 0.0
    }

    let dist = 0
    while(!((dist >= 160 && dist <= 180) || (dist >= 220 && dist <= 235))) {
        dist = Math.random()*75+160
    }
    asteroidSeed.distanceFromPlanet = dist;

    asteroidSeed.scale = Math.random() * 10 + 5;

    asteroidSeed.rotationSpeed = Math.random() + 0.7;

    asteroidSeed.radianAngleY = Math.random()*Math.PI*2;

    asteroidSeed.radianAngleZ = Math.random() / 5 - 0.1;

    return asteroidSeed;
}