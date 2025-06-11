<script setup lang="ts">
import { watch, nextTick } from 'vue';
import { useSlideStore } from '../store/slideStore';
import { onMounted } from 'vue';
// import {storeToRefs} from 'pinia'

var execLimit:boolean=false;
const {gotoSlide} = useSlideStore()

interface Slide {
    id: number;
    name: string;
}

const props = defineProps({
    current:{type:Number,default:1},
    slides:{type:Array as () => Slide[],required:true},
    navPrimColor:{type:String, default:'#eaa525'},
    navSecColor:{type:String, default:'#f8eded'}
})

watch(() => props.current, (newVal, oldVal) => {

    
    const slides = document.querySelectorAll('.circle');
    const active = document.querySelector('.active');
    
    // Guard clause to prevent invalid indices
    if (oldVal && newVal && !slides || slides.length === 0) return;
    
    // Use nextTick to ensure DOM is updated
    nextTick(() => {
        console.log(oldVal)
        console.log(newVal)
        switchSlide(props.current?props.current:1);

        if(!oldVal || !newVal){return}

        const index = oldVal;
        if (index >= 1 && index <= slides.length) {
            if(newVal==oldVal+1 || newVal==oldVal-1){


                if(oldVal<newVal){
                    (slides[index-1] as HTMLElement).style.position='relative';
                    (slides[index-1] as HTMLElement).style.zIndex='6';
                    (slides[index-1] as HTMLElement).style.backgroundColor='var(--paletteOrange)';
                    (slides[index-1] as HTMLElement).style.transition='all 0.5s ease-in-out';

                    setTimeout(() => {
                        slides[index].classList.add('cirDown');
                    }, 50);

                    setTimeout(() => {
                        (slides[index-1] as HTMLElement).style.backgroundColor='';
                    }, 250);

                    setTimeout(() => {
                        slides[index].classList.remove('cirDown');
                        (slides[index-1] as HTMLElement).style.transition='';
                        (slides[index-1] as HTMLElement).style.zIndex='';
                        (slides[index-1] as HTMLElement).style.position='';
                    }, 500);

                }else if (oldVal>newVal){

                        (slides[index-1] as HTMLElement).style.backgroundColor='var(--paletteOrange)';
                        (slides[index-1] as HTMLElement).style.transition='all 0.5s ease-in-out';

                    setTimeout(() => {
                        slides[index-2].classList.add('cirUp');
                    }, 50);

                    setTimeout(() => {
                        (slides[index-1] as HTMLElement).style.backgroundColor='';
                    }, 250);

                    setTimeout(() => {
                        slides[index-2].classList.remove('cirUp');
                        (slides[index-1] as HTMLElement).style.transition='';
                    }, 500);
                }else{
                    console.warn("EXEPTION")
                }

            }else{

                active?(active as HTMLElement).style.width= '10px':'';


                slides.forEach((slide)=>{
                    (slide as HTMLElement).style.opacity='0.5'
                })

                setTimeout(() => {
                    slides.forEach((slide)=>{
                        (slide as HTMLElement).style.opacity=''
                    })
                }, 250);
            }
        }
    });
});

const switchSlide = (iter: number, event?: MouseEvent) => {

    if(execLimit){
        return
    }
    execLimit=true;

    setTimeout(()=>{execLimit=false},500)
    
    var rect;
    var targetELM = (event?.target as HTMLElement);


        if (event?.target ) {

            if((event.target as HTMLElement).tagName.toLowerCase()==='div'){
                rect = (event.target as HTMLElement).getBoundingClientRect();
            }else{
                if((event.target as HTMLElement).parentElement){
                    rect =((event.target as HTMLElement).parentElement as HTMLElement).getBoundingClientRect();
                }

            }


        } else {
            const firstAc = document.querySelector('.cirActive');
            rect = firstAc ? (firstAc as HTMLElement).getBoundingClientRect() : undefined;
        }
        const active = document.querySelector('.active');

        const thisSlide = document.querySelector('.cirActive');

        const cont = document.querySelector('.pagination');

        const rectcont = (cont as HTMLElement).getBoundingClientRect();




        

        if (
            rect &&
            props.slides &&
            props.current &&
            typeof rect.top === 'number' &&
            active &&
            active instanceof HTMLElement &&
            cont &&
            cont instanceof HTMLElement &&
            thisSlide &&
            ( thisSlide !== targetELM?.parentElement && thisSlide !== event?.target)
        ) {
            active.style.top = rect.top - rectcont.top + 'px';
            // active.style.width= '10px';

            setTimeout(() => {

                // if(props.slides[props.current].id)

                active.style.width = `${(props.slides[props.current-1] as { name: string }).name.length*10+50}px`;
                // active.style.left = `-${(props.slides[props.current-1] as { name: string }).name.length*21}px`
                // active.style.transform = `translateX(-${(props.slides[props.current-1] as { name: string }).name.length-55}px)`
                console.log((props.slides[props.current-1] as { name: string }).name.length)
            }, 250);

        }
        gotoSlide(iter);

    }


onMounted(()=>{

    const thisSlide = document.querySelector('.cirActive');
    thisSlide instanceof HTMLElement?thisSlide.style='transform: scale(0.6);':'';

    

    switchSlide(props.current?props.current:1);

    setTimeout(() => {
            thisSlide instanceof HTMLElement?thisSlide.style.transform='':'';
                }, 500);

})



</script>

<template>

    <div :style="`--paletteSec:${props.navSecColor};--palettePrim:${props.navPrimColor}`" class="pagination">
        <div class="active"></div>
        <div v-for="iter in props.slides" :key="iter.id" @click="(event) => switchSlide(iter.id, event)" :class="iter.id==current?'circle cirActive':' circle'">
            <h2>{{iter.name}}</h2>
        </div>
    </div>

</template>

<style scoped>

@import url(../assets/slideGlobals.css);

@keyframes cirDown {

    0%{

        height: 20px;
        top:0;
        
        
    }
    50%{

        height: 60px;
        top:-40px;
        background-color: var(--paletteSec);

    }
    100%{
        height: 20px;
        top:0;
        width: 19px;    
        background-color: var(--palettePrim);
    }
    
}

@keyframes cirUp {

0%{

    height: 20px;
    top:0;
    
}
50%{

    height: 60px;
    background-color: var(--paletteSec);

}
100%{

    height: 20px;
    top:0;
    width: 19px;
    background-color: var(--palettePrim);
}

}

@keyframes cirAc {

0%{

    height: 20px;
    top:0;
    background-color: var(--paletteSec);

}
100%{

    height: 20px;
    top:0;
    width: 19px;
    /* background-color: var(--palettePrim); */
}
    
}



.pagination{
    position: fixed;
    top:50%;
    right:9dvw;
    z-index: 5;
    transform: translate(-300%,-50%);
    text-align: center;
    margin: 0 auto;
}

.pagination:hover>.circle:not(.cirActive) h2{
    opacity: 0.5;
}


.circle{
    width:20px;
    height:20px;
    border-radius: 50%;
    background-color: var(--paletteSec);
    cursor: pointer;
    text-align: left;
    margin: 10px auto;
    transition: all 0.5s ease-in-out !important;
    transform: scale(0.6);
    transition-delay: 0.25s, 0.25s !important;
    transition-property: transform, backgroud-color !important;
}
.circle h2{
    transition: all 0.5s ease-in-out;
    /* margin-left: -75px; */
    font-size: var(--mainFontSmallSize);
    color: var(--paletteSec);
    width:200px;
    transform: translate(30px,-5px) scale(1.1);
    opacity: 0;
    padding:2px 13px;
}


.circle:hover:not(.cirActive)>h2{
    transform: translate(40px,-5px) scale(1.1);
}



.active{

    width:90px;
    height:20px;
    border-radius: 4px;
    background-color: var(--paletteSec);
    content: '';
    position: absolute;
    top:0;
    /* left:-70px; */
    transform: scale(1.1) translate(0,-8px);
    z-index: -1;
    padding: 15px 0;
    transition: all 0.5s ease-in-out;
}

.cirActive{
    background-color: var(--palettePrim);
    transform: scale(0.9);
    animation: 0.5s cirAc;
}

.cirActive h2{
    transition: all 0.5s ease-in-out;
    transform: translate(10px,-5px) scale(0.9);
    color:var(--palettePrim);
    opacity: 1;
}
.cirActive h2:hover{
    transform: translate(26px,-5px) scale(1);
}

.cirActive:hover> h2{

    transform: translate(26px,-5px) scale(1);

}


.cirDown::before{
    border-radius: 15px;
    animation: 0.5s cirDown;
    top:0;
    left:0.5px;
    border-radius: 15px;
    content: '';
    position: absolute;
    background-color: var(--paletteSec);
    width: 20px;
}


.cirUp::before{
    border-radius: 15px;
    animation: 0.5s cirUp;
    top:0;
    left:0.5px;
    border-radius: 15px;
    content: '';
    position: absolute;
    /* mix-blend-mode:multiply; */
    background-color: var(--paletteSec);
    width: 20px;
    /* height: 30px; */
}

</style>