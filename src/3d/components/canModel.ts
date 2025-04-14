import { FBXLoader } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';

import { loadCanMaps,canColorMap,canSpecularMap,canMetalnessMap } from '../textures/textureload';

const fbxLoader = new FBXLoader();
const canObjects = new THREE.Group();

(async () => {
    // Load the texture
    await loadCanMaps();

    fbxLoader.load('/3d/models/singlecan.fbx', (model) => {
        model.traverse(async(obj) => {
            if (obj instanceof THREE.Mesh) {
                if (!obj.geometry || !obj.material) {
                    console.warn('Mesh is missing geometry or material:', obj);
                    return;
                }

                
                const importedObj = obj.clone();

                importedObj.material = new THREE.MeshPhysicalMaterial();

                if (importedObj.name === 'polySurface1') {
                    importedObj.material = new THREE.MeshPhysicalMaterial({
                        map: new THREE.CanvasTexture(await canColorMap),
                        clearcoat:1,
                        clearcoatRoughness:1,
                        // specularColorMap:new THREE.CanvasTexture(await canSpecularMap),
                        // specularIntensityMap:new THREE.CanvasTexture(await canSpecularMap),
                        // metalnessMap:new THREE.CanvasTexture(await canMetalnessMap),
                        metalness:0.85,
                        ior:0.9,
                        roughness:0.1,
                    });

                    importedObj.material.map.repeat.set(0.7, -0.8);
                    
                    importedObj.material.map.wrapS = importedObj.material.map.wrapT = THREE.RepeatWrapping;
                    
                    importedObj.material.map.offset.set(0.36, 0.65); 
                    importedObj.material.map.colorSpace = THREE.SRGBColorSpace;
                }

                canObjects.add(importedObj); 
            }
        });
    });
})();

export default canObjects;