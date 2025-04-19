import { defineStore } from "pinia";

export const useLoadStore = defineStore('loadStore',{
    state:()=>({

        isLoaded:false,
        currentSlide:1,
    }),
    getters:{

    },
    actions:{

        gotoSlide(num:number){
            this.currentSlide=num;
        },
    }
})