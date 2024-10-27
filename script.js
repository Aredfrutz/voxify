// Select DOM elements for interaction
const voicesDropdown = document.querySelector("#voices"); // Dropdown for voice selection
const textarea = document.querySelector("#text"); // Text area for user input
const rateInput = document.querySelector("#rate"); // Input for speech rate
const pitchInput = document.querySelector("#pitch"); // Input for speech pitch
const stopButton = document.querySelector("#stop-button"); // Button to stop speech
const speakButton = document.querySelector("#speak-button"); // Button to start speech

// Create a new SpeechSynthesisUtterance object for speech synthesis
const message = new SpeechSynthesisUtterance(textarea.value);
let voices = []; // Array to hold available voices

// Function to populate the voice dropdown with available voices
function populateVoices() {
    voices = speechSynthesis.getVoices(); // Get the list of voices
  
    if (voices.length === 0) { // Check if no voices are available
      const option = document.createElement("option"); // Create a new option element
      option.textContent = "No voices available"; // Set option text
      option.disabled = true; // Disable the option
      voicesDropdown.appendChild(option); // Append the option to the dropdown
      return; // Exit the function
    }
  
    // Loop through available voices and add them to the dropdown
    for (let index = 0; index < voices.length; index++) {
      const option = document.createElement("option"); // Create a new option element
      option.setAttribute("value", voices[index].name); // Set the value to the voice name
      option.textContent = voices[index].name; // Set the display text to the voice name
      voicesDropdown.appendChild(option); // Append the option to the dropdown
    }
}

// Function to set the selected voice for the speech synthesis
function setVoices() {
  for (let index = 0; index < voices.length; index++) {
    // Check if the selected voice matches any available voice
    if (voicesDropdown.value === voices[index].name) {
      message.voice = voices[index]; // Set the voice for the message
    }
  }
}

// Function to set the speech rate based on user input
function setRate() {
  message.rate = rateInput.value; // Update the message rate
}

// Function to set the speech pitch based on user input
function setPitch() {
  message.pitch = pitchInput.value; // Update the message pitch
}

// Function to update the text of the message when the user changes the input
function setText() {
  message.text = textarea.value; // Update the message text
}

// Function to stop any ongoing speech
function stopVoice() {
  speechSynthesis.cancel(); // Cancel the speech synthesis
}

// Function to start speaking the message
function speakVoice() {
  speechSynthesis.speak(message); // Speak the message
}

// Event listener to populate voices when they change
speechSynthesis.addEventListener("voiceschanged", populateVoices);
// Event listeners for user interactions
voicesDropdown.addEventListener("change", setVoices);
rateInput.addEventListener("change", setRate);
pitchInput.addEventListener("change", setPitch);
textarea.addEventListener("change", setText);
stopButton.addEventListener("click", stopVoice);
speakButton.addEventListener("click", speakVoice);
