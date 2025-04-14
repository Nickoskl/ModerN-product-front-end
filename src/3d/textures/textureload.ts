import * as THREE from 'three';

////////////////CAN TEXTURES

const loader = new THREE.ImageBitmapLoader();
export var canColorMap:Promise<ImageBitmap>;
export var canSpecularMap:Promise<ImageBitmap>;
export var canMetalnessMap:Promise<ImageBitmap>;

export const loadCanMaps = ()=> {
    canColorMap = new Promise((resolve, reject) => {
        loader.load(
            '/3d/textures/can_color.png',
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
};