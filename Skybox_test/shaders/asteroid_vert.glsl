precision mediump float;

uniform mat4 mView;
uniform mat4 mProj;
uniform mat4 mWorld;
uniform mat3 mNormal;

attribute vec3 vPosition;
attribute vec3 vNormal;
attribute vec2 vTexCoord;

varying vec2 fTexCoord;
varying vec3 fragNormal;
varying vec3 fragPos;
varying vec3 fLightDir;

void main()
{
    vec3 lightDir = vec3(0.0, 0.0, 1.0);
    // fragPos = vec3(mWorld * vec4(vPosition, 1.0));
    fLightDir = (mView * vec4(lightDir, 0.0)).xyz;
    // fTexCoord = vTexCoord;
    fTexCoord = vTexCoord * vec2(1.0, -1.0) + vec2(0.0, 1.0);
    fragNormal = mNormal * vNormal;
    gl_Position = mProj * mView * mWorld * vec4(vPosition, 1.0);
}
