import loadTexture from './textures';

export interface Model {
  buffers: {
    vertex: WebGLBuffer, //WebGLBuffer,
    index: WebGLBuffer,
    texCoords?: WebGLBuffer
  },
  texture: WebGLTexture,
  indexCount: number
}

/**
 * Load glTF model from URL
 * WARNING: This function is designed for models from
 * Blockbench. Others may fail if they use multiple
 * buffers or primitives per mesh.
 */
export default function loadModel (gl: WebGLRenderingContext, url: string): Promise<Model> {

  return new Promise(async (resolve, reject) => {

    // start by loading the glTF file
    const modelFile = await fetch(url);
    const modelJson = await modelFile.json();

    // get default scene
    const scene = modelJson.scenes[modelJson.scene];

    // load the buffer and make it into a blob for each node to read
    const buffer = await fetch(modelJson.buffers[0].uri);
    const blob = await buffer.blob();

    // make a queue of nodes to process (this allows expansion for children)
    // start off with the nodes mentioned in the scene
    let nodeQueue = [ ...scene.nodes ];
    let nodeIndex = 0; // the node to process

    // list of indices for each mesh to write to
    let indexList = [];
    // list of vertices for each mesh to write to
    let vertexList = [];
    // list of texture coordinates for each mesh to write to
    let texCoordsList = [];

    while (nodeIndex < nodeQueue.length) {

      // what to base index 0 for the node to
      let index0 = vertexList.length / 3;

      // get a reference to the node
      const node = modelJson.nodes[nodeQueue[nodeIndex]];
      // if the node has children, add them to the queue
      if (node.children) nodeQueue.push(...node.children);

      // not all nodes have meshes, so skip this part if there isn't one
      if (node.mesh !== undefined) {

        // there's only one primitive per node, so read that directly
        const primitive = modelJson.meshes[node.mesh].primitives[0];

        // grab the index data
        const indexId = primitive.indices;
        const indexAccessor = modelJson.accessors[indexId];
        const indexBufferView = modelJson.bufferViews[indexAccessor.bufferView];

        // slice the blob to just this set of indices
        const indexBlobSlice = blob.slice(indexBufferView.byteOffset, indexBufferView.byteOffset + indexBufferView.byteLength);
        // convert to Int16Array then add to index list
        const indexArray = new Int16Array(await indexBlobSlice.arrayBuffer());
        // adjust the indices so that multiple objects don't clash
        indexList.push(...indexArray.map(index => index + index0));

        // grab the vertex data
        const vertexId = primitive.attributes.POSITION;
        const vertexAccessor = modelJson.accessors[vertexId];
        const vertexBufferView = modelJson.bufferViews[vertexAccessor.bufferView];

        // slice the blob to just this set of vertices
        const vertexBlobSlice = blob.slice(vertexBufferView.byteOffset, vertexBufferView.byteOffset + vertexBufferView.byteLength);
        // convert to Float32Array then add to vertex list
        const vertexArray = new Float32Array(await vertexBlobSlice.arrayBuffer());
        vertexList.push(...vertexArray);

        // grab the texture coords data
        const texCoordsId = primitive.attributes.TEXCOORD_0;
        const texCoordsAccessor = modelJson.accessors[texCoordsId];
        const texCoordsBufferView = modelJson.bufferViews[texCoordsAccessor.bufferView];

        // slice the blob to just this set of coords
        const texCoordsBlobSlice = blob.slice(texCoordsBufferView.byteOffset, texCoordsBufferView.byteOffset + texCoordsBufferView.byteLength);
        // convert to Float32Array then add to tex coords list
        const texCoordsArray = new Float32Array(await texCoordsBlobSlice.arrayBuffer());
        texCoordsList.push(...texCoordsArray);

      }

      nodeIndex++;

    }

    // create list of textures
    const texture = await loadTexture(gl, modelJson.images[0].uri);

    // create vertex buffer
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexList), gl.STATIC_DRAW);
    // create index buffer
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexList), gl.STATIC_DRAW);
    // create tex coords buffer
    const texCoordsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoordsList), gl.STATIC_DRAW);

    resolve({

      buffers: {
        index: indexBuffer,
        vertex: vertexBuffer,
        texCoords: texCoordsBuffer
      },
      indexCount: indexList.length,
      texture

    });

  });

}