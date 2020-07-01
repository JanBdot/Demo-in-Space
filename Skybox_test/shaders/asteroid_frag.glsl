precision mediump float;

struct LightAttr
{
	vec3 position;
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
	vec3 spLD;
};
uniform LightAttr light;

uniform sampler2D diffuseMap;
uniform sampler2D normalMap;

uniform vec3 viewPos;

uniform bool showNormalMapping;

varying vec2 fTexCoord;
varying vec3 fNormal;
varying vec3 fragPos;
varying vec3 fLightDir;
varying mat4 mViewFrag;
varying vec3 fEyeDir;
varying vec3 spotLightNormal;


void main()
{
	vec3 objectColor = texture2D(diffuseMap, fTexCoord).rgb;

	float ambientStrength = 0.05;
	vec3 ambient = ambientStrength * light.ambient;

	vec3 lightDir = normalize((mViewFrag * vec4(light.position, 0.0)).xyz);
	vec3 normal = normalize(fNormal);
	vec3 eyeDir = normalize(fEyeDir);

	// // if (showNormalMapping){
	// // if (false){
	// 	normal = texture2D(normalMap, fTexCoord).rgb;
	// 	normal = normalize(normal * 2.0 - 1.0);
	// }

	// diffFactor is 1 if normal and lightDir is direct opposite, angle > +-90 --> diffFactor < 0
	float diffFactor = max(dot(normal, lightDir), 0.0);
	vec3 diffuse = diffFactor * light.diffuse;

	vec3 viewDir = normalize(eyeDir - fragPos);
	float specFactor = 0.0;
	vec3 halfDir = normalize(lightDir + viewDir);
	specFactor = pow(max(dot(halfDir, normal), 0.0), 32.0);
	vec3 specular = specFactor * light.specular;
	//spotlight
  	////////////////////////////
	vec3 locallightDirL =	vec3(0.0-fragPos[0],
								5.0-fragPos[1],
								0.0-fragPos[2]);
	vec3 localLightDir = normalize (
							vec3(0.0-fragPos[0],
								5.0-fragPos[1],
								0.0-fragPos[2]));
	float dirLength = length(locallightDirL);								
	vec3 lTest = light.spLD;
	float light=0.0;
	vec3 leftDot=localLightDir;
	if( 
		dot(localLightDir,lTest)> 0.96
		){
		 light = max(dot(
                normalize(spotLightNormal),
                localLightDir), 
                                0.0);
			if(light>0.0){
			light*=5000.0/pow(dirLength,2.0);
		 }					

		}

	vec3 result = (ambient + diffuse + specular ) * objectColor;
	result +=light* objectColor;

	gl_FragColor =  vec4(result, 1.0);
}