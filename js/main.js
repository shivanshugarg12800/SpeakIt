// init speech synth api
const synth = window.speechSynthesis;

// DOM
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

// init voices array
let voices = [];
const getVoices = () => {
  voices = synth.getVoices();
  // console.log(voices);

  // loop through voices and creat an option in select
  voices.forEach((voice) => {
    // create option element
    const option = document.createElement("option");
    //fill option element with the voices
    option.textContent = voice.name + "(" + voice.lang + ")";

    // set needed option attributes
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};
getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// speak
const speak = () => {
  // check if already speaking
  if (synth.speaking) {
    console.log("Already Speaking...");
    return;
  }

  // check if there is something to speak
  if (textInput.value !== "") {
    // change the background animation
    body.style.background = "#141414 url(img/wave.gif)";
    body.style.backgroundRepeat = "repeat-x";
    body.style.backgroundSize = "100% 100%";
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    // on end
    speakText.onend = (e) => {
      console.log("Done speaking...");
    };

    // on error
    speakText.onend = (e) => {
      console.error("something went wrong");
      body.style.background = "#141414";
    };

    // selectd voice
    const selectedVoice =
      voiceSelect.selectedOptions[0].getAttribute("data-name");

    // loop through the voices
    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    // speak
    synth.speak(speakText);
  }
};

// EVENT LISTENERS
// form submut

textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// rate value change
rate.addEventListener("change", (e) => (rateValue.textContent = rate.value));
pitch.addEventListener("change", (e) => (pitchValue.textContent = pitch.value));

voiceSelect.addEventListener("change", (e) => speak());
