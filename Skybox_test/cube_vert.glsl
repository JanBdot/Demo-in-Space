precision mediump float;

attribute vec3 vertPosition;
attribute vec4 vertColor;
attribute vec3 vertNormal;
varying vec4 fragColor;
varying vec3 fragNormal;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;
uniform mat3 normMat;

void main()
{
  fragColor = vertColor;
  //fragNormal = (mWorld * vec4(vertNormal, 0.0)).xyz;
  fragNormal = normMat * vertNormal;
  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
}