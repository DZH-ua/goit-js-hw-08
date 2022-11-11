import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

onFormLabelCheck();

function onFormInput(event) {
  event.preventDefault();

  const feedback = {};

  const formData = new FormData(form);
  formData.forEach((value, name) => {
    feedback[name] = value;
  });
  console.log(feedback);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(feedback));
}

function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  if (email.value && message.value !== '') {
    console.log('очистили хранилище');
    console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));

    event.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
  } else {
    alert('Все поля должны быть заполнены!');
  }
}

function onFormLabelCheck() {
  const savedFormInfo = localStorage.getItem(LOCALSTORAGE_KEY);
  const parsedFormInfo = JSON.parse(savedFormInfo);

  if (localStorage.getItem(LOCALSTORAGE_KEY)) {
    console.log('не пусто');
    form.elements.message.value = parsedFormInfo.message;
    form.elements.email.value = parsedFormInfo.email;
  } else {
    console.log('пусто');
  }
}
