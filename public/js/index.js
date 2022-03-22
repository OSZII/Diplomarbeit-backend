let accordionButtons = document.getElementsByClassName("accordionButton");
let accordionContent = document.getElementsByClassName("accordionContent");

for (let i = 0; i < accordionButtons.length; i++) {
    accordionContent[i].style.display = "none";
    setAllButtonColor();

    accordionButtons[i].addEventListener("click", function() {  

      if(accordionContent[i].style.display == "none"){
        setAllButtonColor();
        hideAllContent();
        accordionContent[i].style.display = "flex";
        accordionButtons[i].style.backgroundColor = "#8E9DCC";
        // accordionButtons[i].style.border = "5px solid lightblue";
      }else{
        accordionContent[i].style.display = "none";
        setAllButtonColor();
        hideAllContent();
      }


    });
  }

function hideAllContent(){
  for(let i = 0; i < accordionContent.length; i++){
    accordionContent[i].style.display = "none";
  }
}

function setAllButtonColor(){
  for(let i = 0; i < accordionButtons.length; i++){
    accordionButtons[i].style.backgroundColor = "#7D84B2";
    accordionButtons[i].style.border = "none";
  }
}