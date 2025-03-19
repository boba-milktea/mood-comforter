import { data } from "./data";

//dom
const dom = {
  container: document.getElementById("container"),
  fieldset: document.querySelector(".checkbox-field"),
};

//component function
//1. chekbox
const createCheckbox = (optionData) => {
  const checkboxContainer = document.createElement("div");
  checkboxContainer.classList.add("checkbox");

  const checkboxInput = document.createElement("input");
  checkboxInput.type = "checkbox";
  checkboxInput.name = `${optionData.label}`;
  checkboxInput.id = `${optionData.id}`;

  const checkboxLabel = document.createElement("label");
  checkboxLabel.htmlFor = `${optionData.label}`;
  checkboxLabel.innerText = `${optionData.label.charAt(0).toUpperCase() + optionData.label.slice(1)}`;

  checkboxContainer.append(checkboxInput, checkboxLabel);
  return checkboxContainer;
};

//handler
const handleLoad = () => {
  const legend = document.createElement("legend");
  legend.innerText = "Tell me about your feeling";

  const sendBtn = document.createElement("button");
  sendBtn.innerText = "Send";
  sendBtn.addEventListener("click", handleSend);

  data.checkbox.forEach((option) => {
    const checkboxDom = createCheckbox(option);
    dom.fieldset.append(legend, checkboxDom, sendBtn);
  });

  const moodMessage = document.createElement("p");
  moodMessage.innerText = "Feeling good today?";
  moodMessage.classList.add("message");
  dom.container.append(moodMessage);
};

const moodArray = [];
const handleSend = () => {
  const allMood = document.querySelectorAll("input[type=checkbox]");

  allMood.forEach((mood) => {
    if (mood.checked && !moodArray.includes(mood.id)) {
      moodArray.push(mood.id);
    } else if (!mood.checked && moodArray.includes(mood.id)) {
      const index = moodArray.indexOf(mood.id);
      moodArray.splice(index, 1);
    }
  });

  let result = null;
  if (moodArray.length === 1) {
    for (let mood in data.moodMessages) {
      result = mood === moodArray[0] ? data.moodMessages[mood][0] : result;
    }
  }

  if (moodArray.length === 2 && moodArray.includes("happy" && "sad")) {
    result = "I don't understand human";
  } else if (moodArray.length === 2 && moodArray.includes("sad" && "tired")) {
    result = "I understand that you need a rest";
  } else if (
    moodArray.length === 2 &&
    moodArray.includes("tired" && "excited")
  ) {
    result = "Everything will be good";
  } else if (
    moodArray.length === 2 &&
    moodArray.includes("happy" && "excited")
  ) {
    result = "I'm happy for you";
  } else if (moodArray.length === 2 && moodArray.includes("sad" && "excited")) {
    result = "Keep sometime for yourself";
  } else if (moodArray.length === 2 && moodArray.includes("happy" && "tired")) {
    result = "Don't forget to rest";
  } else {
    result = "That's a complex feeling you have right now.";
  }
  console.log(result);
  // console.log(moodArray);
};

//events
window.addEventListener("load", handleLoad);
