let accordions = document.getElementsByClassName("accordion");
let panels = document.getElementsByClassName("panel");

for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener("click", function() {
      
      if(i == accordions.length-1){
        if(accordions[i].classList.contains("lastAccordion")){
          accordions[i].classList.remove("lastAccordion");
        }else{
          setTimeout(() => {
            accordions[i].classList.add("lastAccordion");
          }, 100)
        }

        if(panels[i].classList.contains("lastAccordion")){
          panels[i].classList.remove("lastAccordion");
        }else{
          setTimeout(() => {
            panels[i].classList.add("lastAccordion");
          }, 100)
        }

      }

      // console.log(panels[i].style)
      if(panels[i].style.maxHeight){
        panels[i].style.maxHeight = null;
      }else {
        panels[i].style.maxHeight = panels[i].scrollHeight + "px";
      }

    });
  }