import { loginSupabase } from './auth.js';
import { signUpSupabase } from './auth.js';
// variáveis para acessar os elementos do formulário
const form = document.getElementById('login-form');
const createAccountButton = document.getElementById('toggle-signup');

let isSignupMode = false;

// Expor para o script inline do HTML poder alterar o modo
window.setSignupMode = function (value) {
    isSignupMode = value;
};

async function handleSubmit(event) { // função para lidar com o envio do formulário
    event.preventDefault() // evitar o envio padrão do formulário
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (isSignupMode) {
        const passwordConfirm = document.getElementById('password-confirm').value;

        if (password !== passwordConfirm) {
            alert('As senhas não coincidem!');
            return;
        }

        const result = await signUpSupabase(email, password);
        console.log('Resultado da criação de conta:', result);
        if (result) {
            alert('Conta criada com sucesso! Verifique seu e-mail.');
        }
    } else {
        const result = await loginSupabase(email, password);
        console.log('Resultado do login:', result);
    }
}


if(form) {
    form.addEventListener('submit', handleSubmit); // adicionar o evento de submit ao formulário
}