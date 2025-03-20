import { data } from "./data";

//data
const feedbackData = {
  moodChecked: [],
  result: null,
};

//dom
const dom = {
  container: document.getElementById("container"),
  fieldset: document.querySelector(".checkbox-field"),
  message: document.getElementById("message"),
};

//component function
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

//util function
const getMessage = (mood) => {
  data.moodMessages[mood][
    Math.floor(Math.random() * data.moodMessages[mood].length)
  ];
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
  dom.message.innerText = "Feeling good today?";
};

const handleSend = () => {
  const allMood = document.querySelectorAll("input[type=checkbox]");

  feedbackData.moodChecked = [...allMood]
    .filter((mood) => mood.checked)
    .map((mood) => mood.id);

  if (feedbackData.moodChecked.length === 1) {
    const mood = feedbackData.moodChecked[0];
    feedbackData.result = getMessage(mood);
  }

  if (feedbackData.moodChecked.length === 2) {
    const mixedMood = feedbackData.moodChecked.sort().join("_");
    feedbackData.result =
      data.moodMessages[mixedMood][
        Math.floor(Math.random() * data.moodMessages[mixedMood].length)
      ];
  }

  if (
    feedbackData.moodChecked.length === 3 ||
    feedbackData.moodChecked.length === 4
  ) {
    feedbackData.result = "You're experiencing a complex feeling right now.";
  }

  message.innerText = feedbackData.result;
};

//events
window.addEventListener("load", handleLoad);
