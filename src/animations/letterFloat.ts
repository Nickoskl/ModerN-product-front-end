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
    constructor(elmnt:HTMLElement|NodeListOf<HTMLElement>) {
        this.slideAction = elmnt;
        this.loop = this.loop.bind(this);

        if(this.slideAction && this.slideAction instanceof NodeList){


            
            const rect =  this.slideAction[this.store.currentSlide.value-1].getBoundingClientRect();
            window.addEventListener('mousemove',(event:MouseEvent)=>{
            this.mouseX = ((event.clientX - rect.left) / rect.width) * 30 - 1;
            this.mouseY = -((event.clientY - rect.top) / rect.height) * 30 + 1; 
            
            if(this.shouldAnimate){
            this.shouldAnimate=false;
            this.loop();
            }

        })


    }
}
    loop(){


        // console.log("TESTSET");

                
        if (!this.slideAction) return;



        const style = window.getComputedStyle(
            this.slideAction instanceof NodeList?this.slideAction[this.store.currentSlide.value - 1]:this.slideAction
        );

        const matrix = new WebKitCSSMatrix(style.transform);

            if(this.deltaX && this.deltaY){

            this.deltaX = (Math.ceil(this.mouseX*3) - (matrix.m41)-100);
            this.deltaY = (Math.ceil(-this.mouseY*3) - matrix.m42+200);


            }else{
            this.deltaX=1; 
            this.deltaY=1;
            }
            // console.log(Math.floor(this.deltaX*10))
            let slideActionLetter;
            if(this.slideAction instanceof NodeList && this.slideAction[this.store.currentSlide.value - 1].querySelector('h1')){
                slideActionLetter = this.slideAction[this.store.currentSlide.value - 1].querySelector('h1');
            }

            const landingBtn = document.querySelector('.slideBtn');

            if(Math.ceil(this.mouseX)>0){

            if(slideActionLetter){
                (slideActionLetter as HTMLElement).style.letterSpacing=`calc(var(--mainFontMediumLetterSpacing) + (${this.deltaX/18-3}px))`;
            }

            (landingBtn as HTMLElement).style.transform=`translate(${this.deltaX}px,0)`;
            }

            if(Math.abs(this.mouseX)>0){

            // (slideActionLetter as HTMLElement).style.lineHeight=`${110+Math.abs(mouseY)/5-4}px`;

            }

            

            if (this.slideAction instanceof NodeList) {
                (this.slideAction[this.store.currentSlide.value - 1] as HTMLElement).style.transform = `translate(
                ${(matrix.m41 + (this.deltaX * this.speed))}px, 
                calc(${Math.abs(matrix.m42 + (this.deltaY * this.speed))}px)
                )`;
            }
        
        if(Math.floor(this.deltaX*10)!=0){
            requestAnimationFrame(this.loop);
        }else{
            this.shouldAnimate=true;
        }







    }
}