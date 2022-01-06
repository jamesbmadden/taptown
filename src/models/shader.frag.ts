

export default `varying highp vec2 vTextureCoord;
uniform sampler2D uTexture;

void main(void) {

  gl_FragColor = texture2D(uTexture, vTextureCoord);
  
}`