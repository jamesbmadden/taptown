

export default `varying highp vec2 vTextureCoord;
uniform sampler2D uTexture;

uniform bool uHighlight;

void main(void) {

  if (uHighlight) {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  } else {
    gl_FragColor = texture2D(uTexture, vTextureCoord);
  }
  
}`