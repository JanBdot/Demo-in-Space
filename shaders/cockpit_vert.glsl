precision mediump float;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;
uniform vec3 eyeDir;

attribute vec3 vPosition;
attribute vec3 vNormal;
attribute vec4 vColor;

varying vec3 fNormal;
varying vec3 fLightDir;
varying mat4 mViewFrag;
varying vec4 fColor;
varying vec3 fEyeDir;

void main()
{ 
  fEyeDir = eyeDir;
  fColor=vColor;
  fNormal = (mView * mWorld * vec4(vNormal, 0.0)).xyz;
  mViewFrag = mView;
  gl_Position = mProj * mView * mWorld * vec4(vPosition, 1.0);
}