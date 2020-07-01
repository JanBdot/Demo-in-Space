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
varying vec3 spotLightNormal;

uniform bool showNormalMapping;

varying vec3 fPosition;
varying vec2 fTexCoord;

varying vec3 fNormal;
varying vec3 fragPos;
varying vec3 fLightDir;

varying mat4 mViewFrag;
varying vec3 fEyeDir;


void main()
{

	vec3 objectColor = texture2D(diffuseMap, fTexCoord).rgb;

	float ambientStrength = 0.1;
	

	vec3 lightDir = normalize((mViewFrag * vec4(light.position, 0.0)).xyz);

	vec3 normalDir = normalize(fNormal);
  	vec3 eyeDir = normalize(fEyeDir);

	float kAmbient = light.ambient.x;
	float kDiffuse = light.diffuse.x;
	float kSpecular = light.specular.x;
	float s = 10.0;

	float ambient = kAmbient / 10.0;
	float diffuse = kDiffuse * max(dot(normalDir, lightDir), 0.0);
	float specular = kSpecular * pow(max(dot(reflect(-lightDir, normalDir), eyeDir), 0.0), s);

	vec3 result = (ambient + diffuse + specular ) * objectColor;

	gl_FragColor =  vec4(result, 1.0);

	vec3 newLight = normalize(light.position);

	//spotlight
	///////////////////////////				
	vec3 locallightDirL =vec3(	0.0-fragPos[0],
								5.0-fragPos[1],
								0.0-fragPos[2]);
	vec3 localLightDir = normalize (vec3(	0.0-fragPos[0],
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
			light*=800.0/pow(dirLength,2.0);
		 }
		}	
		gl_FragColor += vec4(objectColor*light,1.0);
}