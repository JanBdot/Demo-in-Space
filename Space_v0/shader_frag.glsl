precision mediump float;

uniform sampler2D sDay;
uniform sampler2D sNight;
uniform sampler2D sOcean;
uniform sampler2D sClouds;
uniform float shift;
varying vec2 fTexCoord;
varying vec3 fNormal;
varying vec3 fLightDir;
void main()
{
  vec3 lightDir = normalize(fLightDir);
  vec3 normalDir = normalize(fNormal);
  vec3 eyeDir = vec3(0.0, 0.0, 1.0);
   
  float kAmbient = 0.3;
  float kDiffuse = 0.7;
  float kSpecular = 1.0;
  float s = 70.0;

  vec4 colorDay = texture2D(sDay, fTexCoord);
  vec4 colorNight = texture2D(sNight, fTexCoord);
  float spec = texture2D(sOcean, fTexCoord).r;
  float cloud = texture2D(sClouds, fTexCoord - vec2(shift, 0.0)).r;

  float ambient = kAmbient;
  float diffuse = kDiffuse * max(dot(normalDir, lightDir), 0.0);
  float specular = spec * kSpecular * pow(max(dot(reflect(-lightDir, normalDir), eyeDir), 0.0), s);

  vec3 earthColor = mix(colorNight, colorDay, ambient + diffuse + specular).rgb;
  vec3 cloudColor = vec3(1.0, 1.0, 1.0) * (ambient + diffuse);

  vec3 mixColor = mix(earthColor, cloudColor, cloud);
  gl_FragColor = vec4(mixColor, 1.0);

}