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

	// // if (showNormalMapping){
	// // if (false){
	// 	normal = texture2D(normalMap, fTexCoord).rgb;
	// 	normal = normalize(normal * 2.0 - 1.0);
	// }

	// diffFactor is 1 if normal and lightDir is direct opposite, angle > +-90 --> diffFactor < 0
	float diffFactor = max(dot(normal, lightDir), 0.0);
	vec3 diffuse = diffFactor * light.diffuse;

	vec3 viewDir = normalize(viewPos - fragPos);
	float specFactor = 0.0;
	vec3 halfDir = normalize(lightDir + viewDir);
	specFactor = pow(max(dot(halfDir, normal), 0.0), 32.0);
	vec3 specular = specFactor * light.specular;

	vec3 result = (ambient + diffuse + specular ) * objectColor;

	gl_FragColor =  vec4(result, 1.0);
}