import { data } from "./data";
import { getMessage } from "./utils/get-message";

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

//handler
const handleLoad = () => {
  const legend = document.createElement("legend");
  legend.innerText = "Tell me about your feeling";

  const sendBtn = document.createElement("button");
  sendBtn.innerText = "Save";
  sendBtn.addEventListener("click", handleSave);

  data.checkbox.forEach((option) => {
    const checkboxDom = createCheckbox(option);
    checkboxDom
      .querySelector("input")
      .addEventListener("change", (e) => handleChange(e));
    dom.fieldset.append(legend, checkboxDom, sendBtn);
  });
  dom.message.innerText = "Feeling good today?";
};

const handleChange = (e) => {
  const checkedMood = data.moodChecked;
  if (!checkedMood) {
    data.result = "Tell me how you feel.";
  }

  if (e.target.checked) {
    checkedMood.push(e.target.id);
  } else {
    checkedMood.splice(checkedMood.indexOf(e.target.id), 1);
  }

  if (checkedMood.length === 1) {
    data.result = getMessage(checkedMood[0]);
  } else if (checkedMood.length === 2) {
    data.result = getMessage(checkedMood.sort().join("_"));
  } else if (checkedMood.length === 3 || checkedMood.length === 4) {
    data.result = "You're experiencing a complex feeling right now.";
  }

  message.innerText = data.result;
};

const handleSave = () => {
  const stringifiedMoods = JSON.stringify(data.moodChecked);
  localStorage.setItem("myMood", stringifiedMoods);
  let moodToSave = "";
  data.moodChecked.forEach((mood) => (moodToSave += `'${mood}' `));
  message.innerText = `Your mood ${moodToSave} is saved`;
};

//events
window.addEventListener("load", handleLoad);
