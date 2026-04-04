function init(){
  //get all the project before they are collaped
  let projects = document.getElementsByClassName('research-project');
  if(!projects)return;
  //go over projects
  for(let i = 0; i < projects.length; i++){
    //I just learned and added the following lines late
    //the idea is to clone the node and replace it with its clone
    //which strips away eventListeners and abvoid them doubling up
    //when resizing. just trying to keep the DOM clean.
    let oldNode = projects[i];
    let newNode = oldNode.cloneNode(true);
    oldNode.parentNode.replaceChild(newNode, oldNode);
    projects[i] = projects[i].cloneNode(true);

    //get the abstract text container
    let abs = projects[i].querySelector(".abstract-text");
    //make sure the p tag is unfolded to the height that the text needs
    //(added this line when making this function
    //run on resize
    // to be honest I should removeEventListener too
    abs.style.height = 'auto';
    //save the full size it needs
    let fullHeight = abs.offsetHeight;
    //now collapse it
    abs.style.height = 0;
    //get the toggle button
    let toggle = projects[i].querySelector(".abstract-toggle");
    //set its content
    toggle.innerHTML = "show abstract";
    //and attach an eventlistener to listen for click;
    toggle.addEventListener('click', (e)=>{
      e.preventDefault();
      if(abs.offsetHeight == 0){
        abs.style.height = fullHeight +25;
        toggle.innerHTML = "hide abstract";
      }else{
        abs.style.height = 0;
        toggle.innerHTML = "show abstract";
      }
    });
  }
}

// // this used to be after load
//window.addEventListener('load', init);
// // , but the text is loading so fast anyway, only the images taking long
// // i'll just put ut with ms delay instead;
setTimeout(init, 50);
// on resize too since the height of the p container might change 
window.addEventListener('resize', init);

