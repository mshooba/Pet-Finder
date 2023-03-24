
//create the pet data set
var data = {
  init: ["Select a Pet", "Dog", "Cat"],
  Dog: ["Dog Breed", "Labrador Retriever", "German Shepherd"],
  Cat: ["Cat Breed", "Siamese", "Persian"],
  Siamese: ["Cat Color", "Seal Point", "Chocolate Point"],
  Persian: ["Cat Color", "White", "Cream"],
  "Labrador Retriever": ["Dog Color", "Black", "Yellow"],
  "German Shepherd": ["Dog Color", "Black", "Brown"],
};

//creating and appending title to the div
var title = document.createElement("h1");
title.setAttribute("class", "title");
title.appendChild(document.createTextNode("find a pet"));
document.getElementsByTagName("div")[0].appendChild(title);

// check if name exists in localStorage
if (localStorage.getItem("name")) {
  // create a new p element
  const greeting = document.createElement("p");
  // get the stored name
  const name = localStorage.getItem("name");
  // set the text of the p element to the message including the name
  greeting.textContent = `Welcome back, ${name}!`;
  // append the p element to the body
  document.getElementsByClassName("title")[0].appendChild(greeting);
}

function build(dom) {
  //am I first?
  let hold;
  parentContainer = document.getElementById('container');
  //console.log(typeof(dom));
  if (typeof dom == "string") {
    //I know I'm first time through...
    //dom - init
    hold = data[dom];
  } else {
    hold = data[dom.value];

    //if i'm not the last child of the top level parent
    while (dom.parentNode != dom.parentNode.parentNode.lastChild) {
      //remove the last child
      dom.parentNode.parentNode.removeChild(dom.parentNode.parentNode.lastChild);
    }
  }

  //while there is data
  if (hold != undefined) {
    //create the div, and select
    var div = document.createElement("div");
    var select = document.createElement("select");

    //build it
    select.onchange = function () {
      build(this);
    };

    //loop through options
    for (let i = 0; i < hold.length; i++) {
      //create options and append
      var option = document.createElement("option");
      option.value = hold[i];
      option.append(document.createTextNode(hold[i]));
      select.appendChild(option);
    }

    //set attributes
    div.setAttribute("class", "option-menu");
    select.setAttribute("class", "select-menu");
    option.setAttribute("class", "option-menu");

    //call fade in funct, args are the div and 500ms
    fadeIn(div, 500);
    //append the select, with the options to the div
    div.appendChild(select);
    //append the div to the body
    document.getElementById("container").appendChild(div);

  } else {

    //show the form
    displayForm();

    var stringHold = "";

    //loop through whats gonna be the cookie and add a pipe "|"
    for (let i = 0; i < document.getElementById('container').getElementsByTagName('select').length; i++) {
      stringHold += document.getElementById('container').getElementsByTagName('select')[i].value + "|";
    }

    //set the selected values as a cookie that expires in 1 day
    SetCookie("selectedValues", stringHold, 86400, "/");

    // Get the selected values from the cookie
    var selectedValues = GetCookie("selectedValues");
    //im a string

    //split on pipe turn into obj / array
    var selectedArray = selectedValues.split("|");
    //im an object now

    //variable that is NOT the inital select
    var selectedPet = (selectedArray[0] !== "Select a Pet");

    //make the results...
    var results = "";
    //if we are not the initial select
    if (selectedPet) {
      //set the results
      results = "You selected: ";
      //loop through the selections
      for (let i = 0; i < selectedArray.length; i++) {
        //add to the array
        results += selectedArray[i];
        //if we are not the last option add a comma
        //doesn't really work for some reason
        if (i !== selectedArray.length - 1) {
          results += ", ";
        }
      }
    } else {
      //edge case for the inital select
      results = "Please make a selection";
    }

    //control the form display
    var form = document.getElementById('finalForm');

    if (results == "Please make a selection") { //hard coded but not data specific should be ok?? maybe.
      //don't display the form unless all selections have been made
      form.style.display = "none";
    } else {
      form.style.display = "block";
    }
  }

  var selectedValuesElement = document.getElementById("selectedValues");

  if (!selectedValuesElement) {
    //if the element doesn't exist, create it
    selectedValuesElement = document.createElement('p');
    selectedValuesElement.setAttribute("id", "selectedValues");
    document.getElementsByClassName("title")[0].appendChild(selectedValuesElement);

  }
  //update results 
  selectedValuesElement.textContent = results;
}







