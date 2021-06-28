(function() {
    class ValidarFormulario {
        constructor() {
            this.form = document.querySelector('.formulario');
            this.iniciarValidamento();
        }

        iniciarValidamento() {
            this.form.addEventListener('submit', e => {
                e.preventDefault();

                const camposSaoValidos = this.validarCampos();

                if (camposSaoValidos) {
                    this.limparErros();
                    this.limparInputs();

                    alert('Formulario enviado com sucesso!');
                }
            });
        }

        validarCampos() {
            this.limparErros();
            const campos = this.form.querySelectorAll('.validar');
            let valido = true;

            for (let campo of campos) {
                const label = campo.previousElementSibling.innerText;

                if (!campo.value) {
                    valido = false;
                    ValidarFormulario.exibirErro(campo, `Campo ${label} não pode estar vazio.`);
                }

                if (label === 'User name') {
                    if (!this.validarUsuario(campo)) valido = false;
                }

                if (label === 'CPF') {
                    if (!this.validarCpf(campo)) valido = false;
                }

                if (label === 'Password') {
                    if (!this.validarSenha()) valido = false;
                }
            }

            return valido;
        }

        validarCpf(campoCpf) {
            let valido = true;
            const cpf = campoCpf.value;
            const validador = new Validador();

            if (!validador.validarCpf(cpf)) {
                valido = false;
                ValidarFormulario.exibirErro(campoCpf, `CPF inválido.`);
            }

            return valido;
        }

        validarUsuario(campoUsuario) {
            let valido = true;
            let usuario = campoUsuario.value;

            if (usuario.length < 3 || usuario.length > 12) {
                valido = false;
                ValidarFormulario.exibirErro(campoUsuario, `Usuário deve conter de 3 a 12 caracteres.`);
            }

            if (usuario.replace(/[^a-z0-9]/gi, '') !== usuario) {
                valido = false;
                ValidarFormulario.exibirErro(campoUsuario, `Usuário deve conter apenas letras e/ou números.`);
            }

            return valido;
        }

        validarSenha() {
            let valido = true;
            const senha = this.form.querySelector('.senha');
            const confirmarSenha = this.form.querySelector('.confirmar-senha');

            if (senha.value !== confirmarSenha.value) {
                ValidarFormulario.exibirErro(senha, `Campos "Senha" e "Confirmar senha" precisam ser iguais.`);
                ValidarFormulario.exibirErro(confirmarSenha, `Campos "Senha" e "Confirmar senha" precisam ser iguais.`);
                valido = false;
            }

            return valido;
        }

        static exibirErro(campo, msg) {
            const erro = document.createElement('div');
            erro.classList.add('error-text');
            erro.innerText = msg;

            campo.insertAdjacentElement('afterend', erro);
        }

        limparInputs() {
            for (const input of this.form.querySelectorAll('.validar')) {
                input.value = '';
            }
        }

        limparErros() {
            for (const erro of this.form.querySelectorAll('.error-text')) {
                erro.innerText = '';
            }
        }
    }


    const validar = new ValidarFormulario();
})();
