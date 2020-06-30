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

uniform sampler2D textureMap;
uniform sampler2D normalMap;

varying vec3 fPosition;
varying vec2 fTexCoord;

vec3 expand(vec3 v) = { return (v - 0.5) * 2.0; }

void main() {
    vec3 eyeDir = vec3(0.0, 0.0, 1.0);

    float kAmbient = 0.3;
    float kDiffuse = 0.7;
    float kSpecular = 1.0;
    float s = 70.0;

    vec4 normTex = texture2D(normalMap, fTexCoord);
    normTex = normalize()
}