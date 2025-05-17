<script setup lang="ts">
// import $ from 'jquery';
// import { ref } from 'vue';


const props = defineProps({
    navPrimColor:{type:String,default:'#eaa525'},
    navSecColor:{type:String,default:'#f8eded'}
})


function addClass(event: MouseEvent) {
  const target = event.target as HTMLElement;
    target.classList.add('box');
    target.setAttribute('data-before',target.innerHTML);
    target.addEventListener("animationend", () => {
        target.classList.remove('box');

})}
</script>
<template>

<div class="navBar" :style="`--paletteSec:${props.navSecColor};--palettePrim:${props.navPrimColor};}`">
    <a @mouseenter="addClass">Materials</a>
    <a @mouseenter="addClass">Store</a>
    <div class="navLogo">
        <svg id="Layer_1" :style="{fill:props.navSecColor}" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383.27 507.72"><defs></defs><title>logo</title><polygon class="cls-1" points="330.24 70 375.27 0 383.27 507.72 330.24 487.72 330.24 70"/><polygon class="cls-1" points="362.74 18.95 373.04 97.14 191.79 394.21 191.88 243.84 362.74 18.95"/><polygon class="cls-1" points="191.88 244.82 191.63 394.19 9.5 98.93 20.99 21.91 191.88 244.82"/><polygon class="cls-1" points="300.64 124.31 319.83 98.28 319.83 485.24 300.64 469.21 300.64 124.31"/><polygon class="cls-1" points="52.5 70 7.92 0 0 507.72 52.5 487.72 52.5 70"/><polygon class="cls-1" points="81.8 124.31 62.8 98.28 62.8 485.24 81.8 469.21 81.8 124.31"/></svg>
    </div>
    <a @mouseenter="addClass">Company</a>
    <a @mouseenter="addClass">Motivation</a>
</div>

</template>

<style scoped>

@keyframes lineIn{
    0%{
        /* left: 0;
        width:0%; */
        clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
        animation-timing-function: ease-in-out;
    }
    50%{
        animation-timing-function: none;
        /* right: 0;
        width: 100%; */
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
    100%{
        animation-timing-function: ease-in-out;
        /* right: 0;
        width:0%; */
        clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);

    }
}

.navBar{
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin:10px auto;
    padding: 10px 0;
    border-radius: 3px;
    width:85vw;
    left:50%;
    transform: translate(-50%,0);
    transition: all 0.5s ease-in-out;
    z-index: 5;
}

.navBar:hover{
    backdrop-filter: blur(8px);
    transition: all 0.5s ease-in-out;
}

.navBar a{
    letter-spacing: var(--mainFontSmallLetterSpacing);
    font-family:Bebas Neue;
    font-size: var(--mainFontSmallSize);
    margin: 0;
    font-weight: var(--mainFontWeight);
    vertical-align: middle;
    position: relative;
    transition: all 0.3s ease-in-out;
    padding:0 7px;
    color: var(--paletteSec);
}

.navBar a:hover{
    /* padding-top: 3px; */
    transform: scale(1.1);
    cursor: pointer;
    transition: all 0.3s ease-in-out;

}

.box::before{
    animation: lineIn 1s;
    width:100%;
    /* height:3px; */
    height: 97%;
    margin-top: -3px;
    /* content: 'MATERIALS'; */
    content: attr(data-before);
    font-weight: bold;
    color: var(--palettePrim);
    overflow: hidden;
    text-align: center;
    /* padding-left: 50px; */
    position: absolute;
    /* content: ''; */
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
    /* clip-path: polygon(48% 54%, 100% 0, 100% 100%, 0% 100%); */
    top:3px;
    background-color: var(--paletteSec);
    transition: all 0.5s ease-in-out; 
}

.navLogo{
    width:40px;

}

.navLogo svg{
    vertical-align: middle;
    transition: all 0.3s ease-in-out;
    fill: var(--paletteSec);
}

.navLogo sgv:hover{
    transform: scale(1.1);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}


</style>