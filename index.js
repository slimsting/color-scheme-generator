const colorSelectionForm = document.getElementById("form"); // grab the input form
let colorsArr = []; // global variable to hold the colors retreived from the API for easy access anywhere in the program

colorSelectionForm.addEventListener("submit", async (e) => {
  // listen for submit
  e.preventDefault(); // prevent default for behaviour

  document.querySelector(".colors-container").style.display = "flex";
  const formData = new FormData(colorSelectionForm); //capture form data
  const inputColor = formData.get("input-color").substring(1); // subtring(1) used to begin the string from index 1 (to remove the initial '#' from the hex value captured)
  const colorMode = formData.get("color-mode");
  const link = `https://www.thecolorapi.com/scheme?hex=${inputColor}&mode=${colorMode}`; //create a link with a query string to retreive the desired color scheme

  const response = await fetch(link);
  const colorScheme = await response.json();

  console.log(colorScheme);

  let colors = []; // initialize an array that will hold the five colors of the scheme

  for (let color of colorScheme.colors) {
    colors.push(color.hex.value); //populate the colors array by iterating through the array of colors returned from the API based on the seed color
  }

  renderScheme(colors); // render the color scheme to the DOM
  renderNames(colors); // render the names of the colors to the DOM
  colorsArr = colors;
});

//listen for clicks on the DOM to identify which color was clicked
document.addEventListener("click", function (e) {
  document.execCommand("copy");

  const clickedElementID = e.target.id; // retreive the ID of the clicked element

  if (
    clickedElementID === "color-1" ||
    clickedElementID === "color-2" ||
    clickedElementID === "color-3" ||
    clickedElementID === "color-4" ||
    clickedElementID === "color-5" // if it is one of the colors
  ) {
    const colorClicked = document.getElementById(clickedElementID).innerText; // store the value of the clicked color for later

    document.getElementById(
      clickedElementID
    ).innerHTML = `<p id="copy-alert" style="color: red; font-weight: bold;">Copied!<p>`; // display the word copied to show the user they have copied the color value

    const myTimeout = setTimeout(restoreColorValue, 2000);
    function restoreColorValue() {
      document.getElementById(
        clickedElementID
      ).innerHTML = `<p id="copy-alert">${colorClicked}<p>`; // restore the color value from before to the DOM after 2 seconds
    }
  }
});

//function to render the colors retreived from the API based on the seed color
function renderScheme(colors) {
  let index = 0;
  let count = 1;

  for (let color of colors) {
    document.getElementById(
      `color-${count}`
    ).style.background = `linear-gradient( ${color} 93%, white 7%)`;
    count++;
    index++;
  }
}

function renderNames(colors) {
  let index = 0;
  let count = 1;

  for (let color of colors) {
    document.getElementById(`color-${count}`).innerText = colors[index];
    count++;
    index++;
  }
}
