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

uniform samplerCube skybox;
varying vec3 fEyeDir;
varying vec3 fNormal;
varying mat4 mViewFrag;

void main()
{
  vec3 lightDir = normalize((mViewFrag * vec4(light.position, 0.0)).xyz);
  vec3 eyeDir = normalize(fEyeDir);
  vec3 normalDir = normalize(fNormal);

  float kAmbient = light.ambient.x;
  float kDiffuse = light.diffuse.x;
  float kSpecular = light.specular.x;
  float s = 10070.0;

  vec3 reflection = textureCube(skybox, reflect(-eyeDir, normalDir)).rgb;

  float ambient = kAmbient / 2.0;
  float diffuse = kDiffuse * 5.0 * max(dot(normalDir, lightDir), 0.0);
  float specular = kSpecular * pow(max(dot(reflect(-lightDir, normalDir), eyeDir), 0.0), s);

  vec3 mixColor = reflection * (ambient + diffuse +specular);


  gl_FragColor =  vec4(mixColor, 1.0);
}