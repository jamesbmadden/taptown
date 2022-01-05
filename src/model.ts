import loadTexture from './textures';

interface Model {
  buffers: {
    vertex: Float32Array, //WebGLBuffer,
    index?: WebGLBuffer,
    texCoords?: WebGLBuffer
  },
  textures?: WebGLTexture[]
}

/**
 * Load glTF model from URL
 */
export default function loadModel (gl: WebGLRenderingContext, url: string): Promise<Model> {

  return new Promise(async (resolve, reject) => {

    // start by loading the glTF file
    const modelFile = await fetch(url);
    const modelJson = await modelFile.json();

    // get default scene
    const scene = modelJson.scenes[modelJson.scene];

    // operate on every node in scene
    scene.nodes.forEach(nodeId => {

      // get node
      const node = modelJson.nodes[nodeId];
      // get mesh for this node
      const mesh = modelJson.meshes[node.mesh];

      // for each mesh primitive (almost there!!)
      mesh.primitives.forEach(async (meshPrimitive) => {

        const indexId = meshPrimitive.indices;
        const attributesId = meshPrimitive.attributes.POSITION;

        const indexAccessor = modelJson.accessors[indexId];
        const vertexAccessor = modelJson.accessors[attributesId];

        const indexBufferView = modelJson.bufferViews[indexAccessor.bufferView];
        const vertexBufferView = modelJson.bufferViews[vertexAccessor.bufferView];

        // let's get the indices loaded
        const indexBuffer = await fetch(modelJson.buffers[indexBufferView.buffer].uri);
        const indexBlob = await indexBuffer.blob();
        // get the appropriate slice of the blob
        const indexBlobSlice = indexBlob.slice(indexBufferView.byteOffset, indexBufferView.byteOffset + indexBufferView.byteLength);

        const indices = new Int16Array(await indexBlobSlice.arrayBuffer());
        // we have successfully created the index buffer!!! WOO!!
        console.log(indices);

        // if the vertex buffer is the same as the index buffer, reuse it. Otherwise, don't lol
        let vertexBlob;
        if (indexBufferView.buffer === vertexBufferView.buffer) vertexBlob = indexBlob;
        else {
          const vertexBuffer = await fetch(modelJson.buffers[vertexBufferView.buffer].uri);
          vertexBlob = await vertexBuffer.blob();
        }

        const vertexBlobSlice = vertexBlob.slice(vertexBufferView.byteOffset, vertexBufferView.byteOffset + vertexBufferView.byteLength);
        const vertices = new Float32Array(await vertexBlobSlice.arrayBuffer());
        // this should be the vertex buffer! nice!

        resolve({ buffers: { vertex: vertices }})

      });

    });

  });

}