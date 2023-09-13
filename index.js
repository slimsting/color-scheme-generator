document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const colorValue = document
    .getElementById("color-selector")
    .value.substring(1); // subtring(1) used to begin the string from index 1
  const colorScheme = document.getElementById("color-scheme").value;
  const link = `https://www.thecolorapi.com/scheme?hex=${colorValue}&mode=${colorScheme}`; //create a link with a query string to retreive the desired color scheme

  fetch(link)
    .then((response) => response.json()) //convert the results of the GET request into json format
    .then((colorScheme) => {
      let colors = []; // initialize an array that will hold the five colors of the scheme

      for (let color of colorScheme.colors) {
        colors.push(color.hex.value); //populate the colors array by iterating through the array of colors returned from the API based on the seed color
      }

      renderScheme(colors); // render the color scheme to the DOM
      renderNames(colors); // render the names of the colors to the DOM
    });
});

//listen for clicks on the DOM the details of the color clicked on
document.addEventListener("click", function (e) {
  document.execCommand("copy");
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
