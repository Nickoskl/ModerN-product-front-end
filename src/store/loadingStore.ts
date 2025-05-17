import { defineStore } from "pinia";

export const useLoadStore = defineStore('loadStore',{
    state:()=>({

        isLoaded:false,
        currentSlide:1,
        colors:{
            prim:'#eaa525',
            sec:'#f8eded',
            backg:'#173b45',
            primTrans:''
        },
        slides:[
            {
                id:1,
                name:'Home',
                primCol:'#eaa525',
                seconCol:'#f8eded',
                backgCol:'#173b45',
            },
            {
                id:2,
                name:'How',
                primCol:'#f8eded',
                seconCol:'#eaa525',
                backgCol:'#173b45',
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

        gotoSlide(num:number){
            console.log(this.colors.prim)
            console.log(this.colors.sec)
            console.log(this.colors.backg)
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

            this.colors.prim=getComputedStyle(document.documentElement).getPropertyValue('--paletteOrange').trim();
            this.colors.sec=getComputedStyle(document.documentElement).getPropertyValue('--paletteWhite').trim();
            this.colors.backg=getComputedStyle(document.documentElement).getPropertyValue('--paletteDark').trim();

        },

        applyColVar(){

            const root = document.documentElement;
            root.style.setProperty('--paletteOrange', String(this.slides[this.currentSlide-1].primCol));
            root.style.setProperty('--paletteWhite', String(this.slides[this.currentSlide-1].seconCol));
            root.style.setProperty('--paletteDark', String(this.slides[this.currentSlide-1].backgCol));

        }
    }
})