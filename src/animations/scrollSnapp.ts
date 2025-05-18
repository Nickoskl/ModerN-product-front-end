import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useLoadStore } from "../store/loadingStore";

var active=ref(true);
export const snap=()=>{
  // active.value=false;
  const speed = 0.09;
  const {currentSlide} = storeToRefs(useLoadStore());
  const {gotoSlide} = useLoadStore();
  // var tempCurrentSlide = currentSlide.value;

  if(!active.value){return}

  if(window.scrollY>(window.innerHeight*(currentSlide.value-1)) && active.value){
  active.value=false;
  var tempCurrentSlide = currentSlide.value;
  gotoSlide(currentSlide.value+1);
    
    const animDown=()=>{
      active.value=false;
      
          let target = (window.innerHeight * tempCurrentSlide);
          let current = window.scrollY;
          let distance = target - current;
          let step = distance * speed / 2; 

          // console.log(target)
          // console.log(current+"+"+step)
          // console.log(active.value)
          // console.log(distance)

              if (Math.abs(distance) < 5) {
                window.scrollTo({ top: target, left: 0 });
                active.value=true;
                return;
              }

          window.scrollTo({
            top:current+step+1
          })
          
          requestAnimationFrame(animDown)
        }
    animDown();
    


  // console.log("DOWNNNNNNNNNNNNNNNNNNNNNNNNN   "+currentSlide.value)
  }else if(window.scrollY<(window.innerHeight*(currentSlide.value-1)) && active.value){
    active.value=false;
    var tempCurrentSlide = currentSlide.value;
    gotoSlide(currentSlide.value-1);
    
    const animUp=()=>{
      active.value=false;
      
          let target = (window.innerHeight * (tempCurrentSlide-2));
          let current = window.scrollY;
          let distance = current - target;
          let step = distance * speed / 2; 

          // console.log(target)
          // console.log(current+"+"+step)
          // console.log(active.value)
          // console.log(distance)

              if (Math.abs(distance) < 5) {
                window.scrollTo({ top: target, left: 0 });
                active.value=true;
                return;
              }

          window.scrollTo({
            top:current-step-1
          })
          
          requestAnimationFrame(animUp)
        }
    animUp();
    

    // console.log("UPPPPPPPPPPPPPPPPPPPPPPPPPPP   "+currentSlide.value)
  }else if(window.scrollY%window.innerHeight==0){
        active.value=true;
    // console.info("STOPPED   "+currentSlide.value)
    // console.log(active.value)
  }else{
    active.value=true;
    // console.warn("EXEPTIONN   "+currentSlide.value)
    // console.log(active.value)
  }

}
