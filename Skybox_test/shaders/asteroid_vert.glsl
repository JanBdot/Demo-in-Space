precision mediump float;

uniform mat4 mView;
uniform mat4 mProj;
uniform mat4 mWorld;
uniform mat3 mWorldInverseTranspose;

attribute vec3 vPosition;
attribute vec3 vNormal;
attribute vec2 vTexCoord;

varying vec2 fTexCoord;
varying vec3 fNormal;
varying vec3 fragPos;
varying vec3 fLightDir;

// TEST
varying vec3 viewPosition;
varying mat4 mViewFrag;

void main()
{
    mViewFrag = mView;
    viewPosition.x = mView[3].x;
    viewPosition.y = mView[3].y;
    viewPosition.z = mView[3].z;
    // fLightDir = (mView * vec4(lightDir, 0.0)).xyz;
    fragPos = vec3(mWorld * vec4(vPosition, 1.0));
    // fLightDir = (mView * vec4(lightDir, 0.0)).xyz;
    // fTexCoord = vTexCoord;
    fTexCoord = vTexCoord * vec2(1.0, -1.0) + vec2(0.0, 1.0);
    // vec3 inverseTransposedNormal = mWorldInverseTranspose * vNormal;
    // fNormal = (mView * mWorld * vec4(inverseTransposedNormal, 0.0)).xyz;
    fNormal = mWorldInverseTranspose * vNormal;
    gl_Position = mProj * mView * mWorld * vec4(vPosition, 1.0);
}
