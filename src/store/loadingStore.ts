import { defineStore } from "pinia";

export const useLoadStore = defineStore('loadStore',{
    state:()=>({

        isLoaded:false,
        currentSlide:1,
        slides:[
            {
                id:1,
                name:'Home',
            },
            {
                id:2,
                name:'How'
            },
            {
                id:3,
                name:'Why'
            },
            {
                id:4,
                name:'Who'
            },
            {
                id:5,
                name:'Get Yours'
            },
            {
                id:6,
                name:'Contact'
            }
        ]
    }),
    getters:{

    },
    actions:{

        gotoSlide(num:number){
            if(num>0 && num<=this.slides.length){
                this.currentSlide=num;
            }else if(num>this.slides.length){
                this.currentSlide=1;
            }else{
                console.warn("Invalid Slide Number, Resseting");
                this.currentSlide=1;
            }
        },
    }
})