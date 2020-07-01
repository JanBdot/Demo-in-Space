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

varying vec3 fPosition;
varying vec2 fTexCoord;
varying vec3 fragNormal;
varying vec3 fragPos;
varying vec3 fLightDir;
varying vec3 viewPosition;
//  view->World
varying mat4 mViewFrag;


void main()
{

	vec3 objectColor = texture2D(diffuseMap, fTexCoord).rgb;

	float ambientStrength = 0.1;
	vec3 ambient = ambientStrength * light.ambient;

	vec3 lightDir = normalize((mViewFrag * vec4(light.position, 0.0)).xyz);
	vec3 normal = normalize(fragNormal);
	vec3 viewPos = normalize(viewPosition);


	vec4 texel = vec4(1.0, 1.0, 1.0, 1.0);
	// diffFactor is 1 if normal and lightDir is direct opposite, angle > +-90 --> diffFactor < 0
	float diffFactor = max(dot(normal, lightDir), 0.0);
	vec3 diffuse = diffFactor * light.diffuse;

	//vec3 viewDir = normalize(viewPos - fragPos);
	vec3 viewDir = viewPos;
	float specFactor = 0.0;
	vec3 halfDir = normalize(lightDir + viewDir);
	specFactor = pow(max(dot(halfDir, normal), 0.0), 32.0);
	vec3 specular = specFactor * light.specular;

	vec3 result = (ambient + diffuse + specular ) * objectColor;
	//vec3 result = (ambient + diffuse + specular ) * texel.rgb;

	//gl_FragColor =  vec4(result, 1.0);

	
	//vec3 ambientLightIntensity =  vec3	(0.1,0.1,0.1);
	vec3 ambientLightIntensity = ambient;
	//vec3 sunLightIntensity = vec3(0.5,0.5,0.5);
	vec3 sunLightIntensity = 0.2*light.specular;
	//vec3 sunLightDirection = normalize( vec3(2.0,5.0,0.0));
	//vec3 sunLightDirection = normalize(lightDir);
	vec3 sunLightDirection = normalize(viewPosition);
		vec3 lightIntensity=  ambientLightIntensity	 +
							(sunLightIntensity	* 
							max(dot(fragNormal,sunLightDirection), 0.0));

	//gl_FragColor = vec4(texel.rgb *lightIntensity, 1.0)	;  
	gl_FragColor = vec4(objectColor *lightIntensity, 1.0)	;  

	//TEST
	
	//vec3 newLight = normalize(vec3(5,5,0));
	vec3 newLight = normalize(light.position);

/* 	vec3 localLightDir = normalize( vec3(light.position[0]-fragPos[0],
										light.position[1]-fragPos[2],
										light.position[2]-fragPos[2]	) ); */
	vec3 locallightDirL =vec3(	0.0-fragPos[0],
								5.0-fragPos[1],
								0.0-fragPos[2]);
	vec3 localLightDir = normalize (vec3(	0.0-fragPos[0],
								5.0-fragPos[1],
								0.0-fragPos[2])); 
	float dirLength = length(locallightDirL);

 	//vec3 lTest = (vec4(light.spLD,0.0)*mViewFrag).xyz;
	vec3 lTest = light.spLD;
	float light=0.0;
	vec3 leftDot=localLightDir;
	//vec3 rightDot=light.spLD;
	if( 
		//dot(localLightDir,light.spLD)>0.9 
		dot(localLightDir,lTest)> 0.96
		//3>1
		){
		 light = max(dot(normal,localLightDir),0.0);
		 if(light>0.0){
			//light*=0.2 / pow(dirLength,2.0);
			light*=800.0/pow(dirLength,2.0);
		 }
		 
		//gl_FragColor = vec4(objectColor*light,1.0);
		}	
	//gl_FragColor += vec4(texel.rgb*light,1.0); 
		//vec3 lTest = normalize(light.spLD);
		//float light = max(dot(normal,lTest),0.0);
		//float light = max(dot(normal,localLightDir),0.0);
		gl_FragColor += vec4(objectColor*light,1.0);



	
}