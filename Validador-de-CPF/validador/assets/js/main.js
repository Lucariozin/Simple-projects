const validateButton = document.querySelector('.validate-button');
const generateButton = document.querySelector('.generate-button');

validateButton.addEventListener('click', () => {
  const inputCpf = document.querySelector('.input-cpf');
  const validateDisplay = document.querySelector('.validate-display');

  let userCpf = inputCpf.value;
  
  if (Validador.validarCpf(userCpf)) {
    validateDisplay.classList.remove('invalid');
    
    validateDisplay.classList.add('valid');
    validateDisplay.value = "CPF válido.";
  } else {
    validateDisplay.classList.remove('valid');

    validateDisplay.classList.add('invalid');
    validateDisplay.value = "CPF inválido.";
  }
});

generateButton.addEventListener('click', () => {
  const generateDisplay = document.querySelector('.generate-display');

  const cpf = Validador.gerarCpf();

  generateDisplay.classList.add('valid');
  generateDisplay.value = cpf;
});
