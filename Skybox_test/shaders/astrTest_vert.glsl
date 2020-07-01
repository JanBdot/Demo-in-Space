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

    viewPosition = cPos;
    
    fragPos = vec3(mWorld * vec4(vPosition, 1.0));


    fTexCoord = vTexCoord * vec2(1.0, -1.0) + vec2(0.0, 1.0);
    
    fragNormal= (mWorld* vec4(vNormal, 0.0)).xyz	;
    gl_Position = mProj * mView * mWorld * vec4(vPosition, 1.0);



}
