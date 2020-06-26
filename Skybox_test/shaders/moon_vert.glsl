precision mediump float;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;
uniform mat4 mNorm;

attribute vec2 vTexCoord;
attribute vec3 vPosition;

varying vec3 fPosition;
varying vec2 fTexCoord;

void main() {
    gl_Position = mProj * mView * mWorld * vec4(vPosition, 1.0);
    vec4 pos = mWorld * mView * vec4(vPosition, 1.0);
    fPosition = pos.xyz / pos.w;
    fTexCoord = vTexCoord;
}