import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import Stats from 'three/addons/libs/stats.module.js';

let stats = new Stats();
document.body.appendChild( stats.dom );
let gui = new GUI();
const sizes ={
  width: window.innerWidth,
  height: window.innerHeight,
}
document.body.appendChild( stats.dom );


const state={
  hdr:{
      exposure:0.8
  },
  model:{
      color: 0xeaa525
  }
}


export { stats, gui, sizes,state };