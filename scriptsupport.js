let body = document.body;

let profile=document.querySelector('.header .flex .profile');
document.querySelector('#user-btn').onclick = () =>{
    profile.classList.toggle('active');
    searchFrom.classList.remove('active');
}

let searchFrom=document.querySelector('.header .flex .search-form');
document.querySelector('#search-btn').onclick = () =>{
    searchFrom.classList.toggle('active');
    profile.classList.remove('active');
}

let sideBar=document.querySelector('.side-bar');
document.querySelector('#menu-btn').onclick = () =>{
    sideBar.classList.toggle('active');
    body.classList.toggle('active');
}

document.querySelector('.side-bar .close-side-bar').onclick = () =>{
    sideBar.classList.remove('active');
    body.classList.remove('active');
}

window.onscroll = () =>{
    profile.classList.remove('active');
    searchFrom.classList.remove('active');

    if(window.innerHeight <1200){
        sideBar.classList.remove('active');
        body.classList.remove('active');
    }
}

const languages = [
    {
      no: "56",
      name: "English",
      native: "English",
      code: "en",
    }
  ];
const recordBtn = document.querySelector(".record"),
  result = document.querySelector(".result"),
  clearBtn = document.querySelector(".clear");
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
  utterance.lang = 'en-US';
  utterance.rate = 0.7;          
  utterance.onend = function () {       
    synth.cancel();
  };
  synth.speak(utterance);
}
clearBtn.addEventListener("click", () => {
  result.innerHTML = "";
  downloadBtn.disabled = true;
});
let toggleBtn =document.querySelector('#toggle-btn');
let darkMode = localStorage.getItem('dark-mode');

const enabeDarkMode = () =>{
    toggleBtn.classList.replace('fa-sun', 'fa-moon');
    body.classList.add('dark');
    localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () =>{
    toggleBtn.classList.replace('fa-moon', 'fa-sun');
    body.classList.remove('dark');
    localStorage.setItem('dark-mode', 'disabled');
}

if(darkMode === 'enabled'){
    enabeDarkMode();
}

toggleBtn.onclick=(e)=>{
    let darkMode = localStorage.getItem('dark-mode');
    if(darkMode==='disabled'){
        enabeDarkMode();
    }else{
        disableDarkMode();
    }
}