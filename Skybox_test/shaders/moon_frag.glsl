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

uniform sampler2D sBase;
uniform sampler2D sClouds;
uniform sampler2D sCar;
uniform float shift;

uniform vec3 moonColor;

varying vec2 fTexCoord;
varying vec3 fNormal;
varying mat4 mViewFrag;

varying vec3 fEyeDir;

void main()
{
  vec3 lightDir = normalize((mViewFrag * vec4(light.position, 0.0)).xyz);
  vec3 normalDir = normalize(fNormal);
  vec3 eyeDir = normalize(fEyeDir);
   
  float kAmbient = light.ambient.x;
  float kDiffuse = light.diffuse.x;
  float kSpecular = light.specular.x;
  float s = 10.0;

  vec3 base = texture2D(sBase, fTexCoord).rgb;
  vec3 car = texture2D(sCar, fTexCoord - vec2(shift, 0.0)).rgb;
  float cloud = texture2D(sClouds, fTexCoord - vec2(shift, 0.0)).r;

  
  float ambient = kAmbient / 10.0;
  float diffuse = kDiffuse * max(dot(normalDir, lightDir), 0.0);
  float specular = kSpecular * pow(max(dot(reflect(-lightDir, normalDir), eyeDir), 0.0), s);


	vec3 moonColor = (ambient + diffuse) * base * car;
  vec3 cloudColor = vec3(1.0, 0.5, 0.2) * (ambient + diffuse);

  vec3 result = mix(moonColor, cloudColor, cloud);

  gl_FragColor = vec4(result, 1.0);
}
