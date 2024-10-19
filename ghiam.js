const languages = [
    {
      no: "56",
      name: "Vietnamese",
      native: "Tiếng Việt",
      code: "vi",
    }
  ];
const recordBtn = document.querySelector(".record"),
  result = document.querySelector(".result"),
  inputLanguage = document.querySelector("#language");


let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition,
  recognition,
  recording = false;

function populateLanguages() {
  languages.forEach((lang) => {
    const option = document.createElement("option");
    option.value = lang.code;
    option.innerHTML = lang.name;
    inputLanguage.appendChild(option);
  });
}

populateLanguages();

function speechToText() {
  try {
    recognition = new SpeechRecognition();
    recognition.lang = inputLanguage.value;
    recognition.interimResults = true;
    recordBtn.classList.add("recording");
    recordBtn.querySelector("p").innerHTML = "Listening...";
    recognition.start();
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      //detect when intrim results
      if (event.results[0].isFinal) {
        result.innerHTML += " " + speechResult;
        result.querySelector("p").remove();
      } else {
        //creative p with class interim if not already there
        if (!document.querySelector(".interim")) {
          const interim = document.createElement("p");
          interim.classList.add("interim");
          result.appendChild(interim);
        }
        //update the interim p with the speech result
        document.querySelector(".interim").innerHTML = " " + speechResult;
      }
      downloadBtn.disabled = false;
    };
    recognition.onspeechend = () => {
      speechToText();
    };
    recognition.onerror = (event) => {
      stopRecording();
      if (event.error === "no-speech") {
        alert("No speech was detected. Stopping...");
      } else if (event.error === "audio-capture") {
        alert(
          "No microphone was found. Ensure that a microphone is installed."
        );
      } else if (event.error === "not-allowed") {
        alert("Permission to use microphone is blocked.");
      } else if (event.error === "aborted") {
        alert("Listening Stopped.");
      } else {
        alert("Error occurred in recognition: " + event.error);
      }
    };
  } catch (error) {
    recording = false;

    console.log(error);
  }
}

recordBtn.addEventListener("click", () => {
  if (!recording) {
    speechToText();
    recording = true;
  } else {
    stopRecording();
  }
});

function stopRecording() {
  recognition.stop();
  recordBtn.querySelector("p").innerHTML = "Start Listening";
  recordBtn.classList.remove("recording");
  recording = false;
}
const readBtn = document.querySelector(".read");
readBtn.addEventListener("click", readText, { once: true });             
// Chức năng đọc văn bản
function readText() {
  const textToRead = result.textContent.trim();
  if (!textToRead) {
    alert("No text to read");
      return;
  }
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(textToRead);
  utterance.lang = 'vi-VN';
  utterance.rate = 0.7;          
  utterance.onend = function () {       
    synth.cancel();
  };
  synth.speak(utterance);
}
let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
}

window.onscroll = () => {
  navbar.classList.remove('active');
}