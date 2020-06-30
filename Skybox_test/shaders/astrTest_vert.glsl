precision mediump float;

uniform mat4 mView;
uniform mat4 mProj;
uniform mat4 mWorld;
uniform mat3 mNormal;

attribute vec3 vPosition;
attribute vec3 vNormal;
attribute vec2 vTexCoord;
uniform vec3 cPos;

varying vec2 fTexCoord;
varying vec3 fragNormal;
varying vec3 fragPos;
varying vec3 fLightDir;
//varying vec4 vColor;

// TEST
varying vec3 viewPosition;
varying mat4 mViewFrag;
//vertexAttribPointer
varying vec3 fPosition;

void main()
{   //  view->World
    mViewFrag = mWorld;
    fPosition=vPosition;
/*     viewPosition.x = mView[3].x;
    viewPosition.y = mView[3].y;
    viewPosition.z = mView[3].z; */
/*     viewPosition.x = mWorld[3].x;
    viewPosition.y = mWorld[3].y;
    viewPosition.z = mWorld[3].z; */
    viewPosition = cPos;
    // fLightDir = (mView * vec4(lightDir, 0.0)).xyz;
    fragPos = vec3(mWorld * vec4(vPosition, 1.0));
    // fLightDir = (mView * vec4(lightDir, 0.0)).xyz;
    // fTexCoord = vTexCoord;
    fTexCoord = vTexCoord * vec2(1.0, -1.0) + vec2(0.0, 1.0);
    //fragNormal = mNormal * vNormal;
    fragNormal= (mWorld* vec4(vNormal, 0.0)).xyz	;
    gl_Position = mProj * mView * mWorld * vec4(vPosition, 1.0);



}
