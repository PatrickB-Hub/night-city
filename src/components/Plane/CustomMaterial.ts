import * as THREE from "three";
import { ReactThreeFiber, extend } from "react-three-fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      customMaterial: ReactThreeFiber.Object3DNode<CustomMaterial, typeof CustomMaterial>
    }
  }
}

// Effects used:
// 1. RGB-shift
// 2. Warping effect
// 3. UV-coordinate zoom
class CustomMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader: `
      uniform float scale;
      uniform float shift;
      varying vec2 vUv;

      void main() {
        vec3 pos = position;
        pos.y = pos.y + ((sin(uv.x * 3.1415926535897932384626433832795) * shift * 5.0) * 0.125);
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
      }`,
      fragmentShader: `
      uniform sampler2D tex;
      uniform float hasTexture;
      uniform float shift;
      uniform float scale;
      uniform vec3 color;
      uniform float opacity;
      varying vec2 vUv;
      
      void main() {
        float angle = 1.55;
        vec2 p = (vUv - vec2(0.5, 0.5)) * (1.0 - scale) + vec2(0.5, 0.5);
        vec2 offset = shift / 4.0 * vec2(cos(angle), sin(angle));
        vec4 cr = texture(tex, p + offset);
        vec4 cga = texture(tex, p);
        vec4 cb = texture(tex, p - offset);
        if (hasTexture == 1.0) gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);
        else gl_FragColor = vec4(color, opacity);
      }`,
      uniforms: {
        tex: { value: null },
        hasTexture: { value: 0 },
        scale: { value: 0 },
        shift: { value: 0 },
        opacity: { value: 1 },
        color: { value: new THREE.Color("white") }
      }
    });
  }

  set scale(value) {
    this.uniforms.scale.value = value;
  }

  get scale() {
    return this.uniforms.scale.value;
  }

  set shift(value) {
    this.uniforms.shift.value = value;
  }

  get shift() {
    return this.uniforms.shift.value;
  }

  set map(value) {
    this.uniforms.hasTexture.value = !!value;
    this.uniforms.tex.value = value;
  }

  get map() {
    return this.uniforms.tex.value;
  }

  set color(value) {
    this.uniforms.color.value = value;
  }

  get color() {
    return this.uniforms.color.value;
  }
}
extend({ CustomMaterial });

export default CustomMaterial;
