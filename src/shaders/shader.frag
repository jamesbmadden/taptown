varying highp vec2 vTextureCoord;
uniform sampler2D uTexture;

varying highp vec3 vNormal;

uniform bool uHighlight;

void main(void) {

  if (uHighlight) {
    gl_FragColor = texture2D(uTexture, vTextureCoord) + vec4(0.1, 0.1, 0.1, 0.0);
  } else {
    gl_FragColor = texture2D(uTexture, vTextureCoord);
  }
  
}