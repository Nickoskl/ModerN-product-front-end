import Splitting from "splitting";

import {useLoadStore} from '../store/loadingStore'
import {storeToRefs} from 'pinia';

import { createTimeline } from 'animejs'
import {animate,utils,createTimer } from 'animejs';

import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

var slideiter:HTMLElement;
var lines;
export const letterTransition =(slideNum:Number,htmlObj:string)=>{
    // const {isLoaded,currentSlide,slides} = storeToRefs(useLoadStore());
    const {setColInit} = useLoadStore();
    //   animate('.slideAction p',{
    //     scale: [
    //     { to: 1.25, ease: 'inOut(3)', duration: 200 },
    //     { to: 1, ease: createSpring({ stiffness: 300 }) }
    //   ],
    //   loop: true,
    //   loopDelay: 250,
    // });
    const [ $timer01,$timer02,$timer03 ] = utils.$('.timer');

    const timer1 = createTimer({
    duration: 500,
    // onUpdate: self => $timer01.innerHTML = self.currentTime.toString(),
    });

    const timeline = createTimeline()
    .sync(timer1)

    // .add({
    //   onUpdate: self => $timer03.innerHTML = self.currentTime.toString(),
    //   duration: 1000
    // });
    
    const slideContainer:Array<HTMLElement>=Array.from(document.querySelectorAll('.slide')) as HTMLElement[];
    slideContainer.forEach((slide)=>{
        if(parseFloat(slide.id)==slideNum){slideiter=slide}
    })
    
    if(!slideiter){return}
    const textArr:Array<HTMLElement>= Array.from(slideiter.querySelectorAll(`${htmlObj}`)) as Array<HTMLElement>;
    console.log(textArr)
    // const text:

    if(!textArr){return}


    Array.from(textArr).forEach((element)=>{

            
        const split = Splitting({ target: element});
        console.log(split[0].lines)
        
        var maxLineLen= 0;
        if(htmlObj=="h1"||htmlObj=="h2"||htmlObj=="h3"||htmlObj=="h4"||htmlObj=="h5"||htmlObj=="h6"){
            lines=element.querySelectorAll('.char');
        }else{
            lines = split[0].lines;
            if(!lines){return}
            lines.forEach((elm)=>maxLineLen = Math.max(elm.length,maxLineLen));
        }

        console.log(lines)

        if(!lines){
        return
        }


        

        const marksAnim = document.querySelectorAll('.slideAction mark');

        if(!marksAnim){return}

        marksAnim.forEach((elm,i)=>{
        
        setTimeout(()=>{
            (elm as HTMLElement).style='clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);opacity:1;';
        },1550 )

        })


        if(htmlObj=="h1"||htmlObj=="h2"||htmlObj=="h3"||htmlObj=="h4"||htmlObj=="h5"||htmlObj=="h6"){
            animate(lines, {
                translateX: [-100,0],
                opacity: [0,1],
                duration: 1600,
                onUpdate: self => $timer01.innerHTML = self.currentTime.toString(),
                delay:(el,i) => 150 *(lines.length-i)
                });


        }else{

        lines.forEach((elm,i)=>{
            animate(elm, {
                translateX: [-100,0],
                opacity: [0,1],
                duration: 1600,
                onUpdate: self => $timer01.innerHTML = self.currentTime.toString(),
                delay: (el, i) => 150 * (((maxLineLen-(Array.isArray(elm) ? elm.length : 1))+1)*((Array.isArray(elm) ? elm.length : 1)-(i+1)+1.5))
                });

            })

        }



        // timeline.sync(circleAnimation)





    })

}