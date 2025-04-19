<script setup lang="ts">
import { watch, nextTick } from 'vue';
import { useLoadStore } from '../store/loadingStore';
import { onMounted } from 'vue';
// import {storeToRefs} from 'pinia'


const {gotoSlide} = useLoadStore()

const props = defineProps({
    current:Number,
    num:Number
})

watch(() => props.current, (newVal, oldVal) => {
    const slides = document.querySelectorAll('.circle');
    
    // Guard clause to prevent invalid indices
    if (oldVal && newVal && !slides || slides.length === 0) return;
    
    // Use nextTick to ensure DOM is updated
    nextTick(() => {

        if(!oldVal || !newVal){return}

        const index = oldVal;
        if (index >= 0 && index <= slides.length) {
            if(oldVal<newVal){
                
                setTimeout(() => {
                    slides[index].classList.add('cirDown');
                }, 50);

                setTimeout(() => {
                    slides[index].classList.remove('cirDown');
                }, 500);

            }else if (oldVal>newVal){


                setTimeout(() => {
                    slides[index-2].classList.add('cirUp');
                }, 50);

                setTimeout(() => {
                    slides[index-2].classList.remove('cirUp');
                }, 500);
        }else{

        }}
    });
});

const switchSlide = (iter: number, event?: MouseEvent) => {
    var rect;
    var targetELM = (event?.target as HTMLElement)

        if (event?.target ) {

            if((event.target as HTMLElement).tagName.toLowerCase()==='div'){
                rect = (event.target as HTMLElement).getBoundingClientRect();
            }else{
                if((event.target as HTMLElement).parentElement){
                    rect =((event.target as HTMLElement).parentElement as HTMLElement).getBoundingClientRect();
                }

            }


        } else {
            const firstCir = document.querySelector('.circle');
            rect = firstCir ? (firstCir as HTMLElement).getBoundingClientRect() : undefined;
        }
        const active = document.querySelector('.active');

        const thisSlide = document.querySelector('.cirActive');

        const cont = document.querySelector('.pagination');

        const rectcont = (cont as HTMLElement).getBoundingClientRect();

        

        if (
            rect &&
            typeof rect.top === 'number' &&
            active &&
            active instanceof HTMLElement &&
            cont &&
            cont instanceof HTMLElement &&
            thisSlide &&
            ( thisSlide !== targetELM?.parentElement && thisSlide !== event?.target)
        ) {
            active.style.top = rect.top - rectcont.top + 'px';
        }
        gotoSlide(iter);

    }


onMounted(()=>{

    const thisSlide = document.querySelector('.cirActive');
    thisSlide instanceof HTMLElement?thisSlide.style='transform:none;':'';
    switchSlide(1);

    setTimeout(() => {
            thisSlide instanceof HTMLElement?thisSlide.style='':'';
                }, 500);

})



</script>

<template>

    <div class="pagination">
        <div class="active"></div>
        <div v-for="iter in props.num" :key="iter" @click="(event) => switchSlide(iter, event)" :class="iter==current?'circle cirActive':' circle'">
            <h2>WHY</h2>
        </div>
    </div>

</template>

<style scoped>

@import url(../assets/slideGlobals.css);

@keyframes cirDown {

    0%{

        height: 20px;
        top:0;
        width: 19px;
        
    }
    50%{

        height: 60px;
        top:-40px;

        

    }
    100%{

        height: 20px;
        top:0;

    }
    
}

@keyframes cirUp {

0%{

    height: 20px;
    top:0;
    width: 19px;
    
}
50%{

    height: 60px;
    /* top:-20px; */

    

}
100%{

    height: 20px;
    top:0;

}

}



.pagination{
    position: fixed;
    top:50%;
    right:9dvw;
    z-index: 5;
    transform: translate(0,-50%);
    text-align: center;
    margin: 0 auto;
}

.circle{
    width:20px;
    height:20px;
    border-radius: 50%;
    background-color: var(--paletteDark);
    cursor: pointer;
    text-align: left;
    margin: 10px auto;
    transition: all 0.5s ease-in-out;
}
.circle h2{
    transition: all 0.5s ease-in-out;
    margin-left: -80px;
    font-size: var(--mainFontSmallSize);
    color: var(--paletteDark);
    transform: translate(0,-3px) scale(0.7);
    opacity: 0;
    padding:2px 13px;
}
.circle:hover> h2{
    opacity: 0.5;
}



.active{

    width:90px;
    height:20px;
    border-radius: 15px;
    background-color: var(--paletteWhite);
    content: '';
    position: absolute;
    top:0;
    left:-70px;
    transform: scale(1.1) translate(0,-5px);
    z-index: -1;
    padding: 15px 0;
    transition: all 0.5s ease-in-out;

}

.cirActive{
    background-color: var(--paletteDark);
    transition: all 0.5s ease-in-out;
    /* transition-delay: 0.5s; */
    transform: scale(0.6);
    
}

.cirActive h2{
    transition: all 0.5s ease-in-out;
    transform: translate(0,-3px) scale(1.7);
    color:var(--paletteDark);
    opacity: 1;
}
.cirActive h2:hover{

    opacity: 1;
    transform: translate(-10px,-3px) scale(1.7);

}


.cirDown::after{
    border-radius: 15px;
    animation: 0.5s cirDown;
    top:0;
    left:0;
    border-radius: 15px;
    content: '';
    position: absolute;
    background-color: var(--paletteDark);
    width: 20px;
}


.cirUp::after{
    border-radius: 15px;
    animation: 0.5s cirUp;
    top:0;
    left:0;
    border-radius: 15px;
    content: '';
    position: absolute;
    background-color: var(--paletteDark);
    width: 20px;
    /* height: 30px; */
}

</style>