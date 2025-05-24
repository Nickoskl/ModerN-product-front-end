import { FBXLoader } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';
import {gui,state} from './debugTools'

import { loadCanMaps,canColorMap,canSpecularMap,canMetalnessMap,metalColorMap,metalAOMap,metalNormalMap } from '../textures/textureload';
// import { modelNormalMatrix } from 'three/tsl';

const fbxLoader = new FBXLoader();
const canObjects = new THREE.Group();



(async () => {

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

                // console.log(importedObj.name)
                importedObj.castShadow=true;
                importedObj.material.shadowSide = THREE.FrontSide;
                // importedObj.receiveShadow=true;
            
                if (importedObj.name === 'polySurface1') {
                    const colorTexture = new THREE.CanvasTexture(await canColorMap);
                    colorTexture.colorSpace = THREE.SRGBColorSpace;

                    const AOTexture = new THREE.CanvasTexture(await metalAOMap);
                    AOTexture.colorSpace = THREE.SRGBColorSpace;
                
                    importedObj.material = new THREE.MeshPhysicalMaterial({
                        map: colorTexture,
                        aoMap:AOTexture,
                        aoMapIntensity:1.7,
                        // transparent: true,
                        // clearcoat: 1,
                        // clearcoatRoughness: 1,
                        // specularColorMap:new THREE.CanvasTexture(await canSpecularMap),
                        // specularIntensityMap:new THREE.CanvasTexture(await canSpecularMap),
                        // metalnessMap:new THREE.CanvasTexture(await canMetalnessMap),
                        metalness: 0.85,
                        color: state.model.color,
                        ior: 0.9,
                        roughness: 0.1,
                    });
                
                    importedObj.material.map.repeat.set(0.7, -0.8);
                    importedObj.material.map.wrapS = importedObj.material.map.wrapT = THREE.RepeatWrapping;
                    importedObj.material.map.offset.set(0.36, 0.64);

                    importedObj.material.map.generateMipmaps = false;
                    importedObj.material.map.minFilter = THREE.NearestFilter;
                    importedObj.material.map.magFilter = THREE.NearestFilter;
                    
                    importedObj.material.aoMap.repeat.set(0.7, -0.8);
                    importedObj.material.aoMap.rotation=Math.PI/2
                    importedObj.material.aoMap.wrapS = importedObj.material.aoMap.wrapT = THREE.RepeatWrapping;
                    importedObj.material.aoMap.offset.set(0.36, 0.64);

                    importedObj.material.aoMap.generateMipmaps = false;
                    importedObj.material.aoMap.minFilter = THREE.NearestFilter;
                    importedObj.material.aoMap.magFilter = THREE.NearestFilter;

                    importedObj.material.onBeforeCompile = function ( shader ) {

                        const custom_map_fragment = THREE.ShaderChunk.map_fragment.replace(
                    
                            `diffuseColor *= sampledDiffuseColor;`,
                    
                            `diffuseColor = vec4( mix( diffuse, sampledDiffuseColor.rgb, sampledDiffuseColor.a ), opacity );`
                    
                        );
                    
                        shader.fragmentShader = shader.fragmentShader.replace( '#include <map_fragment>', custom_map_fragment );
                    
                    };
                    
                
                    gui.addColor(state.model,'color').onChange((value)=>{
                        importedObj.material.color.setHex(value);
                    });
                }

                if (importedObj.name === 'polySurface2' || importedObj.name === 'pCylinder2' || importedObj.name === 'pCube4') {
                    const colorTexture = new THREE.CanvasTexture(await metalColorMap);
                    colorTexture.colorSpace = THREE.SRGBColorSpace;

                    const AOTexture = new THREE.CanvasTexture(await metalAOMap);
                    AOTexture.colorSpace = THREE.SRGBColorSpace;

                    const NormalTexture = new THREE.CanvasTexture(await metalNormalMap);
                
                    importedObj.material = new THREE.MeshPhysicalMaterial({
                        map: colorTexture,
                        aoMap:AOTexture,
                        aoMapIntensity:2,
                        // normalMap:NormalTexture,
                        // normalScale:new THREE.Vector2(1,1),
                        // transparent: true,
                        // clearcoat: 1,
                        // clearcoatRoughness: 1,
                        // specularColorMap:new THREE.CanvasTexture(await canSpecularMap),
                        // specularIntensityMap:new THREE.CanvasTexture(await canSpecularMap),
                        // metalnessMap:new THREE.CanvasTexture(await canMetalnessMap),
                        metalness: 0.85,
                        ior: 1.52,
                        roughness: 0.15,
                    });
                
                    importedObj.material.map.repeat.set(0.7, -0.8);
                    importedObj.material.map.wrapS = importedObj.material.map.wrapT = THREE.RepeatWrapping;
                    importedObj.material.map.offset.set(0.36, 0.64);

                    importedObj.material.map.generateMipmaps = false;
                    importedObj.material.map.minFilter = THREE.NearestFilter;
                    importedObj.material.map.magFilter = THREE.NearestFilter;

                    importedObj.material.aoMap.repeat.set(0.7, -0.8);
                    importedObj.material.aoMap.wrapS = importedObj.material.aoMap.wrapT = THREE.RepeatWrapping;
                    importedObj.material.aoMap.offset.set(0.36, 0.64);

                    importedObj.material.aoMap.generateMipmaps = false;
                    importedObj.material.aoMap.minFilter = THREE.NearestFilter;
                    importedObj.material.aoMap.magFilter = THREE.NearestFilter;
                    
                    
                    // importedObj.material.normalMap.repeat.set(0.7, -0.8);
                    // importedObj.material.normalMap.wrapS = importedObj.material.normalMap.wrapT = THREE.RepeatWrapping;
                    // importedObj.material.normalMap.offset.set(0.36, 0.64);

                    // importedObj.material.normalMap.generateMipmaps = false;
                    // importedObj.material.normalMap.minFilter = THREE.NearestFilter;
                    // importedObj.material.normalMap.magFilter = THREE.NearestFilter;


                    importedObj.material.onBeforeCompile = function ( shader ) {

                        const custom_map_fragment = THREE.ShaderChunk.map_fragment.replace(
                    
                            `diffuseColor *= sampledDiffuseColor;`,
                    
                            `diffuseColor = vec4( mix( diffuse, sampledDiffuseColor.rgb, sampledDiffuseColor.a ), opacity );`
                    
                        );
                    
                        shader.fragmentShader = shader.fragmentShader.replace( '#include <map_fragment>', custom_map_fragment );
                    
                    };
                    
                
                }


                canObjects.add(importedObj); 
            }
        });
    });
})();

export default canObjects;