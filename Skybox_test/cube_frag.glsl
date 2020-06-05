precision mediump float;

struct DirectionalLight
{
	vec3 direction;
	vec3 color;
};

varying vec4 fragColor;
varying vec3 fragNormal;

uniform vec3 ambientLightIntensity;
uniform  DirectionalLight sun;

void main()
{
	vec3 surfaceNormal = normalize(fragNormal);
	vec3 normSunDir = normalize(sun.direction);

	vec3 lightIntensity = ambientLightIntensity + sun.color * max(dot(surfaceNormal, normSunDir), 0.0);

	gl_FragColor = vec4(fragColor.rgb * lightIntensity, fragColor.a);
}