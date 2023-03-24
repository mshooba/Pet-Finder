/**
 * Function to display form after there is no more data
 *
 * also uses local storage to get and display the name
 * that was entered in the form and greets them 
 * the next time they use the site
 * 
 */

function displayForm() {

  //create the form elements
  const form = document.createElement("form");
  const nameInput = document.createElement("input");
  const emailInput = document.createElement("input");
  const submitBtn = document.createElement("button");

  // Set attributes for name input
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("name", "name");
  nameInput.setAttribute("placeholder", "Enter your name");
  nameInput.setAttribute("required", "");

  // Set attributes for email input
  form.setAttribute("id", "finalForm")
  emailInput.setAttribute("type", "email");
  emailInput.setAttribute("name", "email");
  emailInput.setAttribute("placeholder", "Enter your email");
  emailInput.setAttribute("required", "");

  // Set attributes for submit button
  submitBtn.setAttribute("type", "submit");
  submitBtn.appendChild(document.createTextNode("Submit"));

  // Append inputs and button to form
  form.appendChild(nameInput);
  form.appendChild(emailInput);
  form.appendChild(submitBtn);

  // check if name exists in localStorage
  if (localStorage.getItem("name")) {
    // if it does set the value of the name input to the stored name
    nameInput.value = localStorage.getItem("name");
  }

  // add event listener to the name, to update the stored name when it changes
  nameInput.addEventListener("input", function () {
    localStorage.setItem("name", this.value);
  });

  // Append form to body
  document.getElementById("container").appendChild(form);


  // Add form validation
  form.addEventListener("submit", function (event) {
    //is preventDefault ok to use?
    event.preventDefault(); // prevent form from being submitted

    //set name and email variables
    const name = nameInput.value;
    const email = emailInput.value;

    // Check if name and email are not empty
    if (name === "" || email === "") {
      alert("Please enter your name and email");
    } else {
      // Submit the form
      form.submit();
    }
  });
}
