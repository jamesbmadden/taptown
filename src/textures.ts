export default function loadTexture(gl: WebGLRenderingContext, url: string): Promise<WebGLTexture> {

  return new Promise((resolve, reject) => {

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    const image = new Image();
    image.onload = () => {

      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

      // WebGL works differently for power of 2 resolutions v not power of 2 resolutions so check that
      if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
        // generate texture mipmaps
        gl.generateMipmap(gl.TEXTURE_2D);
      } else {
        // no mipmaps and clamp to edges
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

      // return the texture
      resolve(texture);

    }
    // start the load process
    image.src = url;

  });

}

function isPowerOf2 (val) {
  return (val & (val - 1)) == 0;
}