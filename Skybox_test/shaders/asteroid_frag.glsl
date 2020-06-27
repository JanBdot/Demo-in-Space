precision mediump float;

struct LightAttr
{
	vec3 position;
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
};

uniform sampler2D diffuseMap;
uniform sampler2D normalMap;

uniform LightAttr light;
uniform vec3 viewPos;

uniform bool showNormalMapping;

varying vec2 fTexCoord;
varying vec3 fragNormal;
varying vec3 fragPos;
varying vec3 fLightDir;


void main()
{
	vec3 objectColor = texture2D(diffuseMap, fTexCoord).rgb;

	float ambientStrength = 0.15;
	vec3 ambient = ambientStrength * light.ambient;

	vec3 lightDir = normalize(fLightDir);
	vec3 normal = normalize(fragNormal);

	if (showNormalMapping){
		normal = texture2D(normalMap, fTexCoord).rgb;
		normal = normalize(normal * 2.0 - 1.0);
	}

	float diffFactor = max(dot(lightDir, normal), 0.0);
	vec3 diffuse = diffFactor * light.diffuse;

	vec3 viewDir = normalize(viewPos - fragPos);
	float specFactor = 0.0;
	vec3 halfDir = normalize(lightDir + viewDir);
	specFactor = pow(max(dot(halfDir, normal), 0.0), 32.0);
	vec3 specular = specFactor * light.specular;

	vec3 result = (ambient + diffuse + specular ) * objectColor;

	gl_FragColor =  vec4(result, 1.0);
}