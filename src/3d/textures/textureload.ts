import * as THREE from 'three';

////////////////CAN TEXTURES

const loader = new THREE.ImageBitmapLoader();
export var canColorMap:Promise<ImageBitmap>;
export var canSpecularMap:Promise<ImageBitmap>;
export var canMetalnessMap:Promise<ImageBitmap>;
export var canAlphaMap:Promise<ImageBitmap>;

export var metalColorMap:Promise<ImageBitmap>;
export var metalAOMap:Promise<ImageBitmap>;
export var metalNormalMap:Promise<ImageBitmap>;

export const loadCanMaps = async()=> {
    canColorMap = new Promise((resolve, reject) => {
        loader.load(
            '/3d/textures/can_color_trans.png',
            (imageBitmap) => {
                resolve(imageBitmap);
            },
            undefined,
            (err) => {
                console.error('An error occurred while loading the texture:', err);
                reject(err);
            }
        );
    });
    canSpecularMap= new Promise((resolve,reject)=>{
        loader.load('/3d/textures/can_specular.jpg',
            (ImageBitmap)=>{
                resolve(ImageBitmap)
            },
            undefined,
            (err)=>{
                console.error('An error occurred while loading the texture:', err);
                reject(err);
            }
        )
    })

    canMetalnessMap=new Promise ((resolve,reject)=>{
        loader.load('/3d/textures/can_metalness.jpg',
            (ImageBitmap)=>{
                resolve(ImageBitmap)
            },undefined,
            (err)=>{
                console.error('An error occurred while loading the texture:', err);
                reject(err);
            }
        )
    })

    metalColorMap=new Promise ((resolve,reject)=>{
        loader.load('/3d/textures/metal_color_ph_tiny.jpg',
            (ImageBitmap)=>{
                resolve(ImageBitmap)
            },undefined,
            (err)=>{
                console.error('An error occurred while loading the texture:', err);
                reject(err);
            }
        )
    })

    metalAOMap=new Promise ((resolve,reject)=>{
        loader.load('/3d/textures/metal_ao.jpg',
            (ImageBitmap)=>{
                resolve(ImageBitmap)
            },undefined,
            (err)=>{
                console.error('An error occurred while loading the texture:', err);
                reject(err);
            }
        )
    })

    metalNormalMap=new Promise ((resolve,reject)=>{
        loader.load('/3d/textures/metal_normal_ph_tiny.jpg',
            (ImageBitmap)=>{
                resolve(ImageBitmap)
            },undefined,
            (err)=>{
                console.error('An error occurred while loading the texture:', err);
                reject(err);
            }
        )
    })
};