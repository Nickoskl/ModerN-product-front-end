<script setup lang="ts">
// import $ from 'jquery';
// import { ref } from 'vue';


function addClass(event: MouseEvent) {
  const target = event.target as HTMLElement;
  target.classList.add('box');
  target.addEventListener("animationend", () => {
    target.classList.remove('box');
// })
})
}
</script>
<template>

<div class="navBar">
    <a @mouseenter="addClass">Materials</a>
    <a @mouseenter="addClass">Store</a>
    <div class="navLogo">
        <img src="../assets/graphics/logo.svg" alt="">
    </div>
    <a @mouseenter="addClass">Company</a>
    <a @mouseenter="addClass">Motivation</a>
</div>

</template>

<style scoped>

@keyframes lineIn{
    0%{
        left: 0;
        width:0%;
        animation-timing-function: ease-in-out;
    }
    50%{
        animation-timing-function: none;
        right: 0;
        width: 100%;
    }
    100%{
        animation-timing-function: ease-in-out;
        right: 0;
        width:0%;
    }
}

.navBar{
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin:30px auto;
    width:85vw;
    left:50%;
    transform: translate(-50%,0);
    z-index: 2;
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
    color: var(--paletteWhite);
}

.navBar a:hover{
    /* padding-top: 3px; */
    transform: scale(1.1);
    cursor: pointer;
    transition: all 0.3s ease-in-out;

}

.box::before{
    animation: lineIn 1s;
    width:0%;
    /* height:3px; */
    height: 97%;
    margin-top: -3px;
    content: 'CLICK';
    font-weight: bold;
    color: var(--paletteOrange);
    overflow: hidden;
    text-align: center;
    /* padding-left: 50px; */
    position: absolute;
    /* content: ''; */
    top:3px;
    background-color: var(--paletteWhite);
    transition: all 0.5s ease-in-out; 
}

.navLogo{
    width:40px;

}

.navLogo img{
    vertical-align: middle;
    transition: all 0.3s ease-in-out;
    fill: var(--paletteWhite);
}

.navLogo img:hover{
    transform: scale(1.1);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}


</style>