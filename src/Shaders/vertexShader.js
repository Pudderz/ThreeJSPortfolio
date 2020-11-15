export const vertexShader = `
    uniform float uTime;
    uniform float uAspectRatio;
    uniform float uFrameRotation;
    uniform float uFrameScale;
    uniform float uBend;
    uniform float uFloating;
    varying vec2 vUv;
    const float PI = 3.141592653589793;
    mat2 scale(vec2 value) {
        return mat2(value.x, 0.0, 0.0, value.y);
    }
    vec2 scaleUv(vec2 uv, float scaleFactor) {
        float parsedScaleFactor = 1.0 - (scaleFactor - 1.0);
        return uv * scale(vec2(parsedScaleFactor)) + vec2((1.0 - parsedScaleFactor) * 0.5);
    }
    mat2 rotate(float angle) {
        return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    }
    vec2 rotateUv(vec2 uv, float angle) {
        uv -= 0.5;
        uv.y *= uAspectRatio;
        uv *= rotate(angle);
        uv.y /= uAspectRatio;
        uv += 0.5;
        return uv;
    }
    void main() {
        vec3 pos = position;
        vUv = uv;
  
        pos.y -= uBend * (1.0 - sin(uv.x * PI));
        pos.x += uBend * (uv.y * 2.0 - 1.0) * (uv.x * 2.0 - 1.0) * 0.5;

        vUv = scaleUv(vUv, 1.0 + (1.0 - uFrameScale));

        vUv = rotateUv(vUv, uFrameRotation);
 
        float reducedTime = uTime * 0.35;
        float floatingWave = sin(reducedTime * PI) * uFloating;
        float yShift = 0.028;
        float xShift = -0.007;
        pos.y += floatingWave * yShift;
        pos.x += floatingWave * xShift;
        vUv.y += floatingWave * yShift;
        vUv.x += floatingWave * xShift;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
    }
  `;
