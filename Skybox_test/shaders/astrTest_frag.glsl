precision mediump float;

struct LightAttr
{
	vec3 position;
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
};
uniform LightAttr light;

uniform sampler2D diffuseMap;
uniform sampler2D normalMap;

uniform vec3 viewPos;

uniform bool showNormalMapping;

varying vec2 fTexCoord;
varying vec3 fragNormal;
varying vec3 fragPos;
varying vec3 fLightDir;
varying vec3 viewPosition;
varying mat4 mViewFrag;


void main()
{
	vec3 objectColor = texture2D(diffuseMap, fTexCoord).rgb;

	float ambientStrength = 0.1;
	vec3 ambient = ambientStrength * light.ambient;

	vec3 lightDir = normalize((mViewFrag * vec4(light.position, 0.0)).xyz);
	vec3 normal = normalize(fragNormal);
	vec3 viewPos = normalize(viewPosition);

	// if (showNormalMapping){
	if (false){
		normal = texture2D(normalMap, fTexCoord).rgb;
		normal = normalize(normal * 2.0 - 1.0);
	}
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

	gl_FragColor =  vec4(result, 1.0);

	
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

	//gl_FragColor = vec4(texel.rgb *lightIntensity, texel.a)	;  


	
}