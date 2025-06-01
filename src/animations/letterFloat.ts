import {useLoadStore} from '../store/loadingStore'
import { storeToRefs } from 'pinia';

export default class letterFloat{
    private store= storeToRefs(useLoadStore());
    private slideAction: HTMLElement|NodeListOf<HTMLElement>;
    private deltaX: number = 0;
    private deltaY: number = 0;
    private mouseX: number = 0;
    private mouseY: number = 0;
    private speed:number = 0.02;
    private shouldAnimate:boolean=true;
    private spacingDeltaX: number = 0;
    constructor(elmnt:HTMLElement|NodeListOf<HTMLElement>) {
        this.slideAction = elmnt;
        this.loop = this.loop.bind(this);

        if(this.slideAction && this.slideAction instanceof NodeList){


            
            // const rect =  this.slideAction[this.store.currentSlide.value-1].getBoundingClientRect();
            window.addEventListener('mousemove',(event:MouseEvent)=>{
                if (!(this.slideAction instanceof NodeList)) return;
                // Get the bounding rectangle of the parent element
                const parentRect = this.slideAction[this.store.currentSlide.value - 1].parentElement?.getBoundingClientRect();

                if (!parentRect) return;

                // Adjust mouse position relative to the parent element
                this.mouseX = ((event.clientX - parentRect.left) / parentRect.width) * 30 - 1;
                this.mouseY = -((event.clientY - parentRect.top) / parentRect.height) * 30 + 1;
                if(this.shouldAnimate){
                this.shouldAnimate=false;
                this.loop();
                }

        })


    }
}
    loop(){


        // console.log("TESTSET");

                



        const translateStyle = window.getComputedStyle(this.slideAction instanceof NodeList?this.slideAction[this.store.currentSlide.value - 1]:this.slideAction);
        
        const translateMatrix = new WebKitCSSMatrix(translateStyle.transform);


            if(this.deltaX && this.deltaY){

            this.deltaX = (Math.ceil(this.mouseX*9) - (translateMatrix.m41)-100);
            this.deltaY = (Math.ceil(-this.mouseY*7) - translateMatrix.m42+100);

            }else{
            this.deltaX=1; 
            this.deltaY=1;
            }
            let slideActionLetter;
            if(this.slideAction instanceof NodeList && this.slideAction[this.store.currentSlide.value - 1].querySelector('h1')){
                slideActionLetter = this.slideAction[this.store.currentSlide.value - 1].querySelector('h1');
            }
            if(!slideActionLetter){return}

            const spacingVal = (parseFloat(window.getComputedStyle(slideActionLetter).letterSpacing)-5);
            this.spacingDeltaX = ((this.deltaX/15)) - (spacingVal);
            const landingBtn = document.querySelector('.slideBtn');

            if(Math.ceil(this.mouseX)>0){

            if(slideActionLetter){


                (slideActionLetter as HTMLElement).style.letterSpacing=`calc(var(--mainFontMediumLetterSpacing) + (${(spacingVal+(this.spacingDeltaX*(this.speed*20)))}px))`;
                // console.log(this.spacingDeltaX)
            }

            (landingBtn as HTMLElement).style.transform=`translate(${(spacingVal+(this.spacingDeltaX*(this.speed*10)))*10}px,0)`;
            }

            

            if (this.slideAction instanceof NodeList) {
                (this.slideAction[this.store.currentSlide.value - 1] as HTMLElement).style.transform = `translate(
                ${(translateMatrix.m41 + (this.deltaX * this.speed))}px, 
                calc(${Math.abs(translateMatrix.m42 + (this.deltaY * this.speed))}px)
                )`;
            }
        
        if(Math.floor(this.deltaX*10)!=0 && Math.floor(this.deltaX*10)!=-1 && Math.floor(this.spacingDeltaX*10)!=0 && Math.floor(this.spacingDeltaX*10)!=-1 ){
            requestAnimationFrame(this.loop);
        }else{
            this.shouldAnimate=true;
        }







    }
}