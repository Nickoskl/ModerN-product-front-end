import Splitting from "splitting";

import {useSlideStore} from '../store/slideStore'
import {storeToRefs} from 'pinia';

import { createTimeline, JSAnimation, Timeline } from 'animejs'
import {animate,utils,createTimer } from 'animejs';

import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

var slideiter:HTMLElement;
var lines;
var slideTracker:number=-1;

// type SlideAnimation = JSAnimation; 
// let animation: SlideAnimation[][] = [];

var animation:JSAnimation[]=[]

export const letterTransition =(timeline:Timeline,slideNum:number,htmlObj:string)=>{


const {currentSlide} = storeToRefs(useSlideStore());
const {setColInit} = useSlideStore();
    slideTracker=currentSlide.value;
    const [ $timer01 ] = utils.$('.timer');
    const slideContainer=document.querySelectorAll('.slide');
    const slideiter = slideContainer[slideNum-1].querySelector('.slideAction');
    if (!slideiter) return;    
    const textArr: Array<HTMLElement> = Array.from(slideiter.querySelectorAll(`${htmlObj}`)) as Array<HTMLElement>;
    if (!textArr) return;

    timeline = createTimeline({autoplay:false})


    textArr.forEach((element)=>{

            
        const split = Splitting({ target: element});
        // console.log(split[0].lines)
        
        var maxLineLen= 0;
        if(htmlObj=="h1"||htmlObj=="h2"||htmlObj=="h3"||htmlObj=="h4"||htmlObj=="h5"||htmlObj=="h6"){
            lines=element.querySelectorAll('.char');
        }else{
            lines = split[0].lines;
            if(!lines){return}
            lines.forEach((elm)=>maxLineLen = Math.max(elm.length,maxLineLen));
        }

        // console.log(lines)

        if(!lines){
        return
        }


        

        const marksAnim = slideiter.querySelectorAll('.slideAction mark');

        if(marksAnim){

            marksAnim.forEach((elm,i)=>{
                (elm as HTMLElement).style.transition='all 0s';
                (elm as HTMLElement).classList.remove('graphAnimLeftClass');
                
            setTimeout(()=>{
                // (elm as HTMLElement).style='clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);opacity:1;';
                // (elm as HTMLElement).style=`--delay:${i*1050}`;
                (elm as HTMLElement).style.transition='';
                (elm as HTMLElement).classList.add('graphAnimLeftClass');
                
            },550 *(lines.length-i) )

            })
            
        }

        const afterElmAnim = slideiter.querySelector('.slideAction h1 p');

        if(afterElmAnim){
            (afterElmAnim as HTMLElement).style.setProperty('--afterElmAnimDur','all 0s ease-out');
            (afterElmAnim as HTMLElement).style.removeProperty('--afterElmClipP');
            // (afterElmAnim as HTMLElement).style.transition='';
            if(Array.isArray(lines[0])){
                setTimeout(()=>{
                    (afterElmAnim as HTMLElement).style.removeProperty('--afterElmAnimDur');
                    (afterElmAnim as HTMLElement).style.setProperty('--afterElmClipP','polygon(0 0, 100% 0, 100% 100%, 0 100%)');
                },lines.length*500)
            }else{
                setTimeout(()=>{
                    (afterElmAnim as HTMLElement).style.removeProperty('--afterElmAnimDur');
                    (afterElmAnim as HTMLElement).style.setProperty('--afterElmClipP','polygon(0 0, 100% 0, 100% 100%, 0 100%)');
                },lines.length*150)
            }

        }

        const charAll=slideiter.querySelectorAll('.char');
        console.log(charAll);

        

        if(htmlObj=="h1"||htmlObj=="h2"||htmlObj=="h3"||htmlObj=="h4"||htmlObj=="h5"||htmlObj=="h6"){

            timeline.add(lines, {
                opacity: [0],
                duration: 0,
                });

            timeline.add(lines, {
                translateX: [-100,0],
                opacity: [0,1],
                duration: 1600,
                onUpdate: self => $timer01.innerHTML = self.currentTime.toString(),
                delay:(el,i) => 150 *(lines.length-i)
                });

        }else{

        lines.forEach((elm,i)=>{
            timeline.add(elm, {
                opacity: [0],
                duration: 0,
                });

            })
            

        lines.forEach((elm,i)=>{
            timeline.add(elm, {
                translateX: [-100,0],
                opacity: [0,1],
                duration: 1600,
                onUpdate: self => $timer01.innerHTML = self.currentTime.toString(),
                delay: (el, i) => 150 * (((maxLineLen-(Array.isArray(elm) ? elm.length : 1))+1)*((Array.isArray(elm) ? elm.length : 1)-(i+1)+1.5)),
                });

            })
            
        }
    })
return timeline
}