import { resolveConfig } from 'vite';
import loadTexture from './textures';

export interface Model {
  buffers: {
    vertex: WebGLBuffer, //WebGLBuffer,
    index: WebGLBuffer,
    texCoords?: WebGLBuffer
  },
  textures?: WebGLTexture[],
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

    console.log(nodeQueue);

    // list of indices for each mesh to write to
    let indexList = [];
    // list of vertices for each mesh to write to
    let vertexList = [];

    while (nodeIndex < nodeQueue.length) {

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
        indexList.push(...indexArray);

        // grab the vertex data
        const vertexId = primitive.attributes.POSITION;
        const vertexAccessor = modelJson.accessors[vertexId];
        const vertexBufferView = modelJson.bufferViews[vertexAccessor.bufferView];

        // slice the blob to just this set of vertices
        const vertexBlobSlice = blob.slice(vertexBufferView.byteOffset, vertexBufferView.byteOffset + vertexBufferView.byteLength);
        // convert to Float32Array then add to vertex list
        const vertexArray = new Float32Array(await vertexBlobSlice.arrayBuffer());
        vertexList.push(...vertexArray);

      }

      nodeIndex++;

    }

    // create vertex buffer
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexList), gl.STATIC_DRAW);
    // create index buffer
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexList), gl.STATIC_DRAW);

    console.log(indexList, vertexList);

    resolve({

      buffers: {
        index: indexBuffer,
        vertex: vertexBuffer
      },
      indexCount: indexList.length

    });

    // operate on every node in scene
    /*scene.nodes.forEach(nodeId => {

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

    });*/

  });

}