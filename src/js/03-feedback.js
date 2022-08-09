import debounce from 'lodash.debounce';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form  input'),
  textarea: document.querySelector('.feedback-form  textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', debounce(onFormInput, 500));

populateTextarea();

function onFormSubmit(e) {
  e.preventDefault();
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    console.log(JSON.parse(savedData));
  }
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(e) {
  const savedData = localStorage.getItem(STORAGE_KEY);
  let data = {};
  if (savedData) {
    data = JSON.parse(savedData);
  }
  data[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function populateTextarea() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const data = JSON.parse(savedData);
    refs.email.value = data.email;
    refs.textarea.value = data.message;
  }
}
