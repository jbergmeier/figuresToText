# Basic Frontend
## HTML
<p>Please type in a number between 1-9999 to get the proper text (currently in German language) back.</p>
<form><label for="fname">Number:</label><br /><input id="figures2text_number" name="figures2text_number" type="text" /> <button id="figure2text_button" type="button">Send</button></form>

## JS - sample easy implementation
// Vanilla JS - GET
//declaren var and get it from html doc
var button = document.getElementById('figure2text_button')
var result = document.getElementById("figures2text_result")
var input = document.getElementById("figures2text_number")


// Add Eventlistener on created Button. Type is Button, so no submit prevention needed && Call the REST API
button.addEventListener("click", function(event) {
	console.log(input)
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://figures2text.services.webcoffee.io/api/v3/de/' + input.value , true);
	xhr.onload = function () {
      console.log(xhr.responseText)
	    result.innerHTML = JSON.stringify(JSON.parse(xhr.responseText), undefined, 2);
	};
	xhr.send(null);
});