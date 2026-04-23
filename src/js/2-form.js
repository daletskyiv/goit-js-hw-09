let formData = {
  email: '',
  message: '',
};

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
};

refs.feedbackForm.addEventListener('input', onFormChange);

function onFormChange(event) {
  const formName = event.target.name;
  const formValue = event.target.value;

  formData[formName] = formValue;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function fillForm() {
  try {
    const dataFromLS = JSON.parse(localStorage.getItem('feedback-form-state'));
    if (dataFromLS === null) {
      return;
    }
    formData = dataFromLS;

    const dataFromLSKeys = Object.keys(dataFromLS);

    dataFromLSKeys.forEach(key => {
      refs.feedbackForm.elements[key].value = dataFromLS[key];
    });
  } catch (error) {
    console.log(error);
  }
}

fillForm();

refs.feedbackForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const formDataValues = Object.values(formData);
  if (formDataValues.includes('')) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);

  localStorage.removeItem('feedback-form-state');
  refs.feedbackForm.reset();
  formData.email = '';
  formData.message = '';
}
