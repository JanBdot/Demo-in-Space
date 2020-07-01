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
uniform float shift;
varying vec2 fTexCoord;
varying vec3 fNormal;
varying mat4 mViewFrag;
varying mat4 fWorld;
varying vec3 fragPos;
varying vec3 spotLightNormal;

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
  float cloud = texture2D(sClouds, fTexCoord - vec2(shift, 0.0)).r;

  
  float ambient = kAmbient / 10.0;
  float diffuse = kDiffuse * max(dot(normalDir, lightDir), 0.0);
  float specular = kSpecular * pow(max(dot(reflect(-lightDir, normalDir), eyeDir), 0.0), s);


	vec3 moonColor = (ambient + diffuse) * base;
  vec3 cloudColor = vec3(1.0, 0.5, 0.2) * (ambient + diffuse);

  vec3 result = mix(moonColor, cloudColor, cloud);

  gl_FragColor = vec4(result, 1.0);

  vec3 newLight = normalize(light.position);
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
			light*=1600.0/pow(dirLength,2.0);
		 }
		}
gl_FragColor += vec4(result *light,1.0); 
}
