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

uniform sampler2D sDay;
uniform sampler2D sNight;
uniform sampler2D sOcean;
uniform sampler2D sClouds;
uniform float shift;
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
  float s = 70.0;

  vec4 colorDay = texture2D(sDay, fTexCoord);
  vec4 colorNight = texture2D(sNight, fTexCoord);
  float spec = texture2D(sOcean, fTexCoord).r;
  float cloud = texture2D(sClouds, fTexCoord - vec2(shift, 0.0)).r;

  float ambient = kAmbient / 10.0;
  float diffuse = kDiffuse * max(dot(normalDir, lightDir), 0.0);
  float specular = spec * kSpecular * pow(max(dot(reflect(-lightDir, normalDir), eyeDir), 0.0), s);

  vec3 earthColor = mix(colorNight, colorDay, ambient + diffuse + specular).rgb;
  vec3 cloudColor = vec3(1.0, 1.0, 1.0) * (ambient + diffuse);

  vec3 mixColor = mix(earthColor, cloudColor, cloud);
  gl_FragColor = vec4(mixColor, 1.0);
}
