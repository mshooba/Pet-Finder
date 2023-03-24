//function to create fadeIn animation
window.fadeIn = function (ele, duration) {
  let startTime = null;
  let startOpacity = 0;
  const endOpacity = 1;

  //recursive function for the fade in animation
  function animate(currentTime) {
    //if start time is null, start it
    if (startTime == null) {
      startTime = currentTime;
    }
    //calculate the elapsed time / animation progress
    const elapsedTime = currentTime - startTime;
    const progress = elapsedTime / duration;
    //set variable for current opacity value
    const opacity = startOpacity + (endOpacity - startOpacity) * progress;
    //set opacity value to the element
    ele.style.opacity = opacity;
    //if the animation isn't done yet get another frame
    if (progress < 1) {
      window.requestAnimationFrame(animate);
    }
  }
  //set start opacity to 0 and start the animation
  ele.style.opacity = startOpacity;
  window.requestAnimationFrame(animate);
};


//maybe try and reverse the logic here to do fade out for when the items delete?
