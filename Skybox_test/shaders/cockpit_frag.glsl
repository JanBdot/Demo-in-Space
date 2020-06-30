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


//uniform vec3 cAmbient;
//uniform vec3 cDiffuse;
//uniform vec3 cSpecular;
//uniform float alpha;
//varying vec2 fTexCoord;
varying vec3 fNormal;
varying vec3 fLightDir;
varying mat4 mViewFrag;
varying vec4 fColor;
void main()
{
  vec3 lightDir = normalize((mViewFrag * vec4(light.position, 0.0)).xyz);
  vec3 normalDir = normalize(fNormal);
  vec3 eyeDir = vec3(0.0, 0.0, 1.0);
  
  float kAmbient = light.ambient.x;
  float kDiffuse = light.diffuse.x;
  float kSpecular = light.specular.x;
  float s = 70.0;
  
  float ambient = kAmbient / 10.0;
  float diffuse = kDiffuse * max(dot(normalDir, lightDir), 0.0);
  float specular = kSpecular * pow(max(dot(reflect(-lightDir, normalDir), eyeDir), 0.0), s);

  vec4 colorNight = vec4(0.0,0.0,0.0,1.0);

  vec3 nColor = mix(colorNight, fColor, ambient + diffuse + specular).rgb;
  //light += cDiffuse * max(dot(normalDir, lightDir), 0.0);
  //light += cSpecular * pow(max(dot(reflect(-lightDir, normalDir), eyeDir), 0.0), alpha);
  gl_FragColor = vec4(nColor, 0.3);
 //gl_FragColor = fColor;
}