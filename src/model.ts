import { mat4, vec3 } from 'gl-matrix';

import loadTexture from './textures';

export interface Model {
  buffers: {
    vertex: WebGLBuffer, //WebGLBuffer,
    index: WebGLBuffer,
    normal?: WebGLBuffer,
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
    // list of normals for each vertex
    let normalList = [];
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

        // create a transformation matrix for this node
        let transformationMatrix: mat4 = mat4.create();

        // if there's a scale, apply it
        if (node.scale) mat4.scale(transformationMatrix, transformationMatrix, node.scale);
        // if there's a rotation, apply it
        if (node.rotation) {
          // create a rotation matrix from rotation quaternion
          const rotationMatrix: mat4 = mat4.create();
          mat4.fromQuat(rotationMatrix, node.rotation);
          mat4.multiply(transformationMatrix, transformationMatrix, rotationMatrix);
        }
        // if there's a translation, apply it
        if (node.translation) mat4.translate(transformationMatrix, transformationMatrix, node.translation);

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

        // apply transformations
        for (let i = 0; i < vertexArray.length; i += 3) {

          // get the set of three vertices to operate on
          let vertex: vec3 = [vertexArray[i], vertexArray[i + 1], vertexArray[i + 2]];

          // apply the matrix transformation
          vec3.transformMat4(vertex, vertex, transformationMatrix);

          // now push to vertex list
          vertexList.push(...vertex);

        }

        // grab the normal data
        const normalId = primitive.attributes.NORMAL;
        const normalAccessor = modelJson.accessors[normalId];
        const normalBufferView = modelJson.bufferViews[normalAccessor.bufferView];

        // slice the blob to just this set of normals
        const normalBlobSlice = blob.slice(normalBufferView.byteOffset, normalBufferView.byteOffset + normalBufferView.byteLength);
        // convert to Flaot32Array then add to vector list
        const normalArray = new Float32Array(await normalBlobSlice.arrayBuffer());
        // push to list
        normalList.push(...normalArray);

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
    // create normal buffer
    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalList), gl.STATIC_DRAW);

    resolve({

      buffers: {
        index: indexBuffer,
        vertex: vertexBuffer,
        texCoords: texCoordsBuffer,
        normal: normalBuffer
      },
      indexCount: indexList.length,
      texture

    });

  });

}