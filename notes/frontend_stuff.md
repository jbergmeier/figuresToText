# Basic Frontend
## HTML
<p>Please type in a number between 1-9999 to get the proper text (currently in German language) back.</p>
<form><label for="fname">Number:</label><br /><input id="figures2text_number" name="figures2text_number" type="text" /> <button id="figure2text_button" type="button">Send</button></form>

## JS
// Vanilla JS - GET
var button = document.getElementById('figure2text_button')

button.addEventListener("click", function(event) {
	console.log("Hello")
});

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://figures2text.dev.webcoffee.io/api/v3/de/123', true);
xhr.onload = function () {
  console.log(xhr.responseText)
	document.getElementById('figures2text_result').textContent = xhr.responseText;
};

xhr.send(null);