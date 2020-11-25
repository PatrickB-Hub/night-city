import * as THREE from "three";

const shardGeometry = () => {
  const geometry = new THREE.Geometry()
  geometry.vertices.push(
    new THREE.Vector3(-1, -1, 1),     // 0
    new THREE.Vector3(1, -1, 1),      // 1
    new THREE.Vector3(-1, -.95, 1),   // 2
    new THREE.Vector3(1, -.95, 1),    // 3
    new THREE.Vector3(-1, -1, -1),    // 4
    new THREE.Vector3(-1, -.95, -1),  // 5
  );

  /*
         5
       /| \  
      2----3 
      | |  | 
      | 4  |
      |/ \ |
      0----1
  */

  geometry.faces.push(
    // front
    new THREE.Face3(4, 1, 0),
    // top-right
    new THREE.Face3(0, 3, 2),
    new THREE.Face3(0, 1, 3),
    // top-left
    new THREE.Face3(4, 2, 5),
    new THREE.Face3(4, 0, 2),
    // bottom
    new THREE.Face3(1, 4, 3),
    new THREE.Face3(4, 5, 3),
    // back
    new THREE.Face3(2, 3, 5),
  );
  geometry.computeVertexNormals();
  geometry.faces.forEach((face, i) => face.materialIndex = i);

  return geometry;
}

export default shardGeometry;