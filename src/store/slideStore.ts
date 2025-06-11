import { defineStore } from "pinia";
import { letterTransition } from '../animations/letterTransition';
import { createTimeline, JSAnimation, Timeline } from 'animejs'
type SlideAnimation = JSAnimation; 
let animation: SlideAnimation[][] = [];
let slideTimelines:Timeline[] = [];

export const useSlideStore = defineStore('slideStore',{
    state:()=>({
        currentSlide:1,
        colors:{
            prim:'#eaa525',
            sec:'#f8eded',
            backg:'#173b45',
        },
        slides:[
            {
                id:1,
                name:'Home',
                primCol:'var(--paletteOrange)',
                seconCol:'var(--paletteWhite)',
                backgCol:'var(--paletteDark)',
                animations:{
                    elements:['h1','h2'],
                    elementDelay:[0,1000]
                }
                // anim:async(elmnts:Array<string>,slideNum:number)=>{
                //     console.warn("-----------------------------------------------------");
                //     console.warn("-----------------------------------------------------");
                //     console.log(slideNum);
                //     elmnts.forEach((elm) => {
                //         if(elm=='h2'){
                //             setTimeout(()=>{
                //                 const test= letterTransition(slideTimelines[slideNum-1],slideNum, elm);
                //                 test?.reset()
                //                 test?.play();
                //             },1500)
                //         }else{
                //            const test= letterTransition(slideTimelines[slideNum-1],slideNum, elm);
                //            test?.reset()
                //            test?.play();
                //         }
                //     });
                // }
            },
            {
                id:2,
                name:'How',
                primCol:'var(--paletteWhite)',
                seconCol:'var(--paletteOrange)',
                backgCol:'var(--paletteDark)',
                // anim:async(elmnts:Array<string>,slideNum:number)=>{
                //     console.warn("-----------------------------------------------------");
                //     console.warn("-----------------------------------------------------");
                //     console.log(slideNum);
                //     elmnts.forEach((elm) => {
                //         const test = letterTransition(slideTimelines[slideNum-1],slideNum, elm);
                //         test?.reset()
                //         test?.play();
                //     });
                // }
            },
            {
                id:3,
                name:'Why',
                primCol:0,
                seconCol:0,
                backgCol:0
            },
            {
                id:4,
                name:'Who',
                primCol:0,
                seconCol:0,
                backgCol:0
            },
            {
                id:5,
                name:'Get Yours',
                primCol:0,
                seconCol:0,
                backgCol:0
            },
            {
                id:6,
                name:'Contact',
                primCol:0,
                seconCol:0,
                backgCol:0
            }
        ]
    }),
    getters:{

    },
    actions:{

        setAnimationHooks(){



        },

        // animateSlide(elmnts:Array<string>){
        //     const slide = this.slides[this.currentSlide-1];
        //     if (slide && slide.anim) {
        //         slide.anim(elmnts,this.currentSlide);
        //     }
        // },

        gotoSlide(num:number){
            // console.log(this.colors.prim)
            // console.log(this.colors.sec)
            // console.log(this.colors.backg)
            if(num>0 && num<=this.slides.length){
                this.currentSlide=num;
            }else if(num>this.slides.length){
                this.currentSlide=1;
            }else{
                console.warn("Invalid Slide Number, Resseting");
                this.currentSlide=1;
            }
        },

        setColInit(){

            document.documentElement.style.setProperty('--paletteOrange',this.colors.prim);
            document.documentElement.style.setProperty('--paletteWhite',this.colors.sec);
            document.documentElement.style.setProperty('--paletteDark',this.colors.backg);

        },

    }
})
