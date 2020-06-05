precision mediump float;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;
attribute vec3 vPosition;
attribute vec2 vTexCoord;
attribute vec3 vNormal;
varying vec2 fTexCoord;
varying vec3 fNormal;
varying vec3 fLightDir;

void main()
{
  vec3 lightDir = vec3(1.0, 0.0, 0.0);
  fNormal = (mView * mWorld * vec4(vNormal, 0.0)).xyz;
  fLightDir = (mView * vec4(lightDir, 0.0)).xyz;
  fTexCoord = vTexCoord * vec2(1.0, -1.0) + vec2(0.0, 1.0);
  gl_Position = mProj * mView * mWorld * vec4(vPosition, 1.0);
}